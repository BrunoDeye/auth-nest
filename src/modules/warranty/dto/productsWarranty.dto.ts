import { $Enums } from '@prisma/client';
import { IsString, IsInt, IsEnum, IsNotEmpty, IsArray } from 'class-validator';

export class CreateProductsWarrantyDto {
  @IsString()
  model: string;

  @IsString()
  serialNumber: string;

  @IsInt()
  warrantyId: number;

  @IsEnum($Enums.Faults, { each: true })
  @IsNotEmpty()
  @IsArray()
  fault: $Enums.Faults[];

  @IsString()
  faultDescription: string;
}
