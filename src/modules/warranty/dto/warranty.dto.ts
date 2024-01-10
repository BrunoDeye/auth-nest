import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateWarrantyDto {
  @IsNumber()
  authorId: number;

  @IsOptional()
  @IsNumber()
  responsibleEngineerId?: number;

  @IsOptional()
  @IsString()
  caseOrigin?: string;

  @IsOptional()
  @IsDateString()
  approvalDate?: string;

  @IsOptional()
  @IsString()
  comments?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;
}
