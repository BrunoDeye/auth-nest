import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { $Enums } from '@prisma/client';

export class StatusDto {
  @IsEnum($Enums.Status)
  status: $Enums.Status;

  @IsEnum($Enums.VisibleStatus)
  @IsOptional()
  visibleStatus?: $Enums.VisibleStatus;

  @IsString()
  description: string;
}

export class UpdateStatusDto extends PartialType(StatusDto) {}
