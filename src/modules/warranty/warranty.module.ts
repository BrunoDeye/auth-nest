import { Module } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { WarrantyController } from './warranty.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [WarrantyController],
  providers: [WarrantyService, PrismaService, UserService, JwtService],
})
export class WarrantyModule {}
