import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';
import { Roles } from '../auth/guards/decorator/roles.decorator';
import { UpdateRoleDto } from './dto/user.dto';
import { Groups } from '../auth/guards/decorator/groups.decorator';
import { $Enums } from '@prisma/client';
import { Departments } from '../auth/guards/decorator/departments.decorator';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get(':id')
  async getUserProfile(
    @Param('id') id: number,
    @Headers('Authorization') auth,
  ) {
    this.authService.validateUserAuthorship(auth, id);

    return await this.userService.findById(id);
  }

  @Roles($Enums.Roles.MANAGER)
  // @Groups($Enums.Groups.colaborator)
  @Departments($Enums.Departments.support)
  @HttpCode(200)
  @Patch('role')
  async updateRole(@Body() updateRoleDto: UpdateRoleDto) {
    await this.userService.updateRole(updateRoleDto);
  }
}
