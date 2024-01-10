import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from '../address/address.service';
import { WarrantyService } from './warranty.service';
import { CreateCompleteWarrantyDto } from './dto/completeWarranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { UserService } from '../user/user.service';
import { UserUpdateDto } from '../user/dto/user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Departments } from '../auth/guards/decorator/departments.decorator';
import { $Enums } from '@prisma/client';

@Controller('warranty')
export class WarrantyController {
  constructor(
    private readonly warrantyService: WarrantyService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateCompleteWarrantyDto) {
    return await this.warrantyService.create(dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Departments($Enums.Departments.support)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWarrantyDto: UpdateWarrantyDto,
    @Headers('Authorization') auth,
  ) {
    const updateData: Partial<UserUpdateDto> = {
      warrantyId: +id,
      type: 'updateWarranty',
      description: `updating ${Object.keys(updateWarrantyDto).join(', ')}`,
      status: updateWarrantyDto.status,
      visibleStatus: updateWarrantyDto.visibleStatus,
    };

    await this.userService.triggerUpdate(auth, updateData as UserUpdateDto, updateWarrantyDto.warrantyType);

    return await this.warrantyService.updateWarranty(+id, updateWarrantyDto);
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.warrantyService.findAll();
  }

  @Get('not-approved')
  async findNotApproved() {
    return await this.warrantyService.findNotApproved();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.warrantyService.findOne(+id);
  }
  // @UseGuards(JwtGuard)
  // @HttpCode(200)
  // @Patch('status/:id')
  // async updateStatus(
  //   @Param('id') id: string,
  //   @Body() updateStatusDto: UpdateStatusDto,
  //   @Headers('Authorization') auth,
  // ) {
  //   const updateData: Partial<UserUpdateDto> = {
  //     warrantyId: +id,
  //     type: 'updateStatus',
  //     ...updateStatusDto,
  //   };

  //   return await this.userService.triggerUpdate(
  //     auth,
  //     updateData as UserUpdateDto,
  //   );
  // }
}
