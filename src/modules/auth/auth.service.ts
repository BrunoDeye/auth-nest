import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { $Enums } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';

const EXPIRE_TIME = 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      username: user.email,
      sub: {
        id: user.id,
        name: user.name,
        lastname: user.lastName,
        role: user.role,
        group: user.group.title,
        department: user.group.department,
      },
    };

    return {
      user: payload,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.username);

    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Login ou Senha inválidos.');
  }

  validateUserAuthorship(token: any, id: number) {
    // console.log('OLA' + token);
    const user = this.jwtService.decode(this.extractTokenFromBearer(token));

    if (user.sub.role === $Enums.Roles.ADMIN) {
      return;
    }

    if (user.sub.id !== id) {
      throw new ForbiddenException('Usuário diferente do logado');
    }
    return;
  }

  async findExpiredTempAuths() {
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();

    const expiredTempAuths = await this.prisma.tempAuth.findMany({
      where: {
        OR: [
          {
            createdAt: {
              lte: sixHoursAgo, // Subtracting expirationDuration seconds from the current date
            },
          },
          {
            utilizations: {
              lte: 0,
            },
          },
        ],
      },
      include: {
        responsibleEngineer: true,
        groupToRegister: true,
      },
    });

    // console.log(expiredTempAuths);

    return expiredTempAuths;
  }

  async deleteExpiredTempAuths() {
    const expiredTempAuths = await this.findExpiredTempAuths();

    if (expiredTempAuths.length > 0) {
      const deletePromises = expiredTempAuths.map((tempAuth) => {
        return this.prisma.tempAuth.delete({
          where: {
            uuid: tempAuth.uuid,
          },
        });
      });

      await Promise.all(deletePromises);
      console.log('Expired TempAuths deleted successfully.');
    } else {
      console.log('No expired TempAuths to delete.');
    }
  }

  async createTempAuth(
    token: any,
    utilizations?: number,
    groupName?: Omit<$Enums.Groups, 'colaborator'>,
    department?: $Enums.Departments,
  ) {
    const user = this.jwtService.decode(this.extractTokenFromBearer(token));
    let groupId: number = null;
    if (department) {
      const group = await this.prisma.group.findFirst({
        where: {
          department,
        },
      });

      groupId = group.id;
    } else if (groupName) {
      const group = await this.prisma.group.findFirst({
        where: {
          title: groupName as $Enums.Groups,
        },
      });

      groupId = group.id;
    }

    const newTempAuth = await this.prisma.tempAuth.create({
      data: {
        responsibleEngineerId: user.sub.id,
        utilizations,
        groupId,
      },
    });

    await this.deleteExpiredTempAuths();

    return { code: newTempAuth.uuid };
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.jwtSecretKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  private extractTokenFromBearer(bearerToken: string) {
    const [type, token] = bearerToken.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
