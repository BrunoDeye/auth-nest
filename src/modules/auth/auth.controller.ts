import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/user.dto';
import { UserService } from 'src/modules/user/user.service';
import { CreateTempAuthDto, LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { JwtGuard } from './guards/jwt.guard';
import { Departments } from './guards/decorator/departments.decorator';
import { $Enums } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @HttpCode(200)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }

  @UseGuards(JwtGuard)
  @HttpCode(201)
  @Departments($Enums.Departments.support)
  @Post('create-temp-auth')
  async createTempAuth(
    @Headers('Authorization') auth,
    @Body() dto: CreateTempAuthDto,
  ) {
    const { utilizations, groupName, department } = dto;


    return await this.authService.createTempAuth(
      auth,
      utilizations,
      groupName,
      department,
    );
  }

  @UseGuards(JwtGuard)
  @Post('verify-temp-auth/:uuid')
  async verifyTempAuth(@Param('uuid') uuid: string) {
    return await this.userService.validateTempAuth(uuid);
  }


  //TODO: excluir essa rota
  @Post('utilize-temp-auth/:uuid')
  async utilizeTempAuth(@Param('uuid') uuid: string) {
    return await this.userService.subtractTempAuth(uuid);
  }
}
