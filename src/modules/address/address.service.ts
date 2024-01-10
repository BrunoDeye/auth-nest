import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateAddressDto, UserIdDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma.service';
import { $Enums, Address } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(dto: CreateAddressDto): Promise<Address> {
    // this.verifyAddressType(dto);

    const isPrimary = await this.verifyIsPrimary(dto);

    const newAddress = await this.prisma.address.create({
      data: {
        ...dto,
        isPrimary: isPrimary,
      },
    });

    return newAddress;
  }

  verifyAddressType(dto: CreateAddressDto): void {
    if (dto.userId && dto.companyId)
      throw new ConflictException('O endereço só pode ser de um tipo.');

    if (!dto.userId && !dto.companyId)
      throw new BadRequestException(
        'O id do usuário ou da companhia é obrigatório.',
      );

    return;
  }

  async verifyIsPrimary(dto: CreateAddressDto): Promise<boolean> {
    // if (!dto.userId) return true;

    const addressList = await this.prisma.address.findMany({
      where: {
        userId: dto.userId,
      },
    });

    if (addressList.length === 0) return true;

    return false;
  }

  async findAll(token: any) {

    const user = this.jwtService.decode(this.extractTokenFromBearer(token));
    const addressList = await this.prisma.address.findMany({
      where: {
        userId: user.sub.id,
      },
    });
    return addressList;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
  private extractTokenFromBearer(bearerToken: string) {
    const [type, token] = bearerToken.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
