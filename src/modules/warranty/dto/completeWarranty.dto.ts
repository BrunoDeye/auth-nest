import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsEnum,
  IsPhoneNumber,
  IsOptional,
  IsNumber,
  IsDateString,
  IsArray,
  IsNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { IsCNPJ } from './warrantyRegistration.dto';
import { IsCPF } from 'class-validator-cpf';

class AddressesList {
  @IsNumber()
  addressId: number;

  @IsEnum($Enums.AddressType)
  type: $Enums.AddressType;
}

class ProductsList {
  @IsString()
  model: string;

  @IsString()
  serialNumber: string;

  @IsEnum($Enums.Faults, { each: true })
  @IsNotEmpty()
  @IsArray()
  fault: $Enums.Faults[];

  @IsString()
  faultDescription: string;
}

export class CreateCompleteWarrantyDto {
  @IsNumber()
  authorId: number;

  @IsOptional()
  @IsNumber()
  responsibleEngineerId?: number;

  @IsOptional()
  @IsNumber()
  distributorId?: number;

  @IsOptional()
  @IsNumber()
  integratorId?: number;

  @IsOptional()
  @IsString()
  caseOrigin?: string;

  // @IsOptional()
  // @IsDateString()
  // approvalDate?: string;

  @IsOptional()
  @IsString()
  comments?: string;

  // @IsOptional()
  // @IsNumber()
  // priority?: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsCPF()
  @IsOptional()
  cpf?: string;

  @IsCNPJ()
  @IsOptional()
  cnpj?: string;

  @IsString()
  @IsOptional()
  onSiteContact?: string;

  @IsString()
  @IsOptional()
  onSiteContactNumber?: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => AddressesList)
  addresses: AddressesList[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductsList)
  products: ProductsList[];

  @IsPhoneNumber('BR')
  @IsOptional()
  distributorPhoneNumber?: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  integratorPhoneNumber?: string;

  @IsString()
  @IsOptional()
  integratorName?: string;

  @IsString()
  @IsOptional()
  distributorName?:  string;

  @IsString()
  @IsOptional()
  finalClientName?: string;

  @IsString()
  @IsOptional()
  finalClientNumber?: string;
}
