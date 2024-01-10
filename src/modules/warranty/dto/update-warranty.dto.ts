import { PartialType } from '@nestjs/mapped-types';
import { CreateCompleteWarrantyDto } from './completeWarranty.dto';
import { IsDateString, IsEnum, IsInt, IsString } from 'class-validator';
import { $Enums } from '@prisma/client';

export class WarrantyDto {
  @IsInt()
  responsibleEngineerId: number;

  @IsString()
  caseOrigin: string;

  @IsString()
  reasonToDisapprove: string;

  @IsEnum($Enums.WarrantyType)
  warrantyType: $Enums.WarrantyType;

  @IsString()
  comments: string;

  @IsInt()
  priority: number;

  @IsEnum($Enums.Status)
  status: $Enums.Status;

  @IsEnum($Enums.VisibleStatus)
  visibleStatus: $Enums.VisibleStatus;
}

export class UpdateWarrantyDto extends PartialType(WarrantyDto) {}
