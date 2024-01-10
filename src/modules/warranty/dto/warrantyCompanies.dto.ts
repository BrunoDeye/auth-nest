import { IsInt, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateWarrantyCompaniesDto {
  @IsInt()
  warrantyId: number;

  @IsInt()
  @IsOptional()
  distributorId?: number;

  @IsInt()
  @IsOptional()
  integratorId?: number;

  @IsPhoneNumber('BR')
  @IsOptional()
  distributorPhoneNumber?: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  integratorPhoneNumber?: string;

  @IsString()
  @IsOptional()
  integratorName?: string;
}
