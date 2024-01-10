import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { $Enums, User, UserUpdate } from '@prisma/client';
import { CreateUserDto, UpdateRoleDto, UserUpdateDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { Role } from '../auth/guards/enum/roles.enum';
// import { AuthService } from '../auth/auth.service';

type UserEntity = Omit<User, 'password'>;

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateTempAuth(uuidToken: any) {
    try {
      const tempAuth = await this.prisma.tempAuth.findUnique({
        where: {
          uuid: uuidToken,
        },
      });

      if (!tempAuth) throw new NotFoundException('Autorização não encontrada!');

      const expirationTime = new Date(
        tempAuth.createdAt.getTime() + tempAuth.expirationDuration * 60000,
      ); // Convert minutes to milliseconds

      if (new Date() > expirationTime || tempAuth.utilizations <= 0) {
        throw new UnauthorizedException(
          'Parece que este link não é mais válido',
        );
      } else {
        const { uuid, responsibleEngineerId, groupId } = tempAuth;
        return {
          uuid,
          responsibleEngineerId,
          groupId,
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: error.status || HttpStatus.UNAUTHORIZED,
          error: error.message || 'Algo deu errado',
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: error,
        },
      );
    }
  }

  async subtractTempAuth(uuidToken: any) {
    try {
      await this.validateTempAuth(uuidToken);

      const { responsibleEngineerId } = await this.prisma.tempAuth.update({
        where: {
          uuid: uuidToken,
        },
        data: {
          utilizations: {
            decrement: 1,
          },
        },
      });

      return responsibleEngineerId;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: error.message || 'Algo deu errado',
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: error,
        },
      );
    }
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('Email já cadastrado.');

    const { uuid, ...newUserInfo } = dto;

    try {
      const tempAuth = await this.validateTempAuth(uuid);

      if (!tempAuth.groupId)
        throw new BadRequestException(
          'Código do link não é válido para criação de contas novas',
        );

      const newUser = await this.prisma.user.create({
        data: {
          ...newUserInfo,
          password: await hash(dto.password, 10),
          role: $Enums.Roles.USER,
          group: {
            connect: {
              id: tempAuth.groupId,
            },
          },
        },
      });

      await this.subtractTempAuth(uuid);

      const { password, ...result } = newUser;

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: error.message || 'Algo deu errado',
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: error,
        },
      );
    }
  }

  async updateRole(dto: UpdateRoleDto): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    const updatedUser = await this.prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        role: dto.role,
      },
    });

    const { password, ...result } = updatedUser;

    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        group: true,
      },
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        group: true,
        address: {
          where: {
            isPrimary: true,
          },
        },
      },
    });
    const { password, ...result } = user;
    return result;
  }

  async triggerUpdate(token: any, dto: UserUpdateDto, warrantyType?: $Enums.WarrantyType) {
    // console.log('OLA' + token);
    const user = this.jwtService.decode(this.extractTokenFromBearer(token));

    const lastUpdate = await this.prisma.userUpdate.findFirst({
      where: {
        warrantyId: dto.warrantyId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 1,
    });
    await this.verifyApproval(dto, lastUpdate, warrantyType);
    if (!lastUpdate) {
      return await this.prisma.userUpdate.create({
        data: {
          userId: user.sub.id,
          ...dto,
        },
      });
    }

    const approveStatus = 
     lastUpdate.status === "WAITING_FOR_APPROVAL" ?
        (warrantyType === 'FIX'
          ? $Enums.Status.INVERTER_TO_REPAIR
          : warrantyType === 'REPLACE'
          ? $Enums.Status.INVERTER_TO_REPLACE : $Enums.Status.MI_TO_REPAIR) : null;


    return await this.prisma.userUpdate.create({
      data: {
        userId: user.sub.id,
        status: approveStatus || dto.status || lastUpdate.status,
        visibleStatus: dto.visibleStatus || lastUpdate.visibleStatus,
        description: dto.description,
        type: dto.type,
        warrantyId: dto.warrantyId,
      },
    });
  }

  async verifyApproval(userUpdate: UserUpdateDto, lastUpdate: UserUpdate, warrantyType?: $Enums.WarrantyType) {
    if (
      lastUpdate?.status &&
      lastUpdate.status === 'WAITING_FOR_APPROVAL'
    ) {

      if(!warrantyType) throw new BadRequestException("Warranty type is required for approval")
      
      await this.prisma.warranty.update({
        where: {
          id: userUpdate.warrantyId,
        },
        data: {
          approvalDate: new Date(),
        },
      });
    }
    return;
  }

  private extractTokenFromBearer(bearerToken: string) {
    const [type, token] = bearerToken.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
