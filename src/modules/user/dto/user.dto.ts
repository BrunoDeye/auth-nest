import { $Enums } from '@prisma/client';
import { IsEmail, IsString, IsEnum, IsInt, IsOptional, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsUUID(4)
  uuid: string;

}

export class UpdateRoleDto {
  @IsEmail()
  email: string;

  @IsEnum($Enums.Roles)
  role: $Enums.Roles;
}

export class UserUpdateDto {
  @IsInt()
  warrantyId: number;

  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsEnum($Enums.Status)
  @IsOptional()
  status?: $Enums.Status;

  @IsEnum($Enums.VisibleStatus)
  visibleStatus: $Enums.VisibleStatus;
}
