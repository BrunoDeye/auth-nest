import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsOptional,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IsNumber,
} from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

// Importa o isCPF do validation-br
import { isCNPJ } from 'validation-br';

@ValidatorConstraint({ async: false })
export class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(cnpj: any, args: ValidationArguments) {
    return isCNPJ(cnpj);
  }
  defaultMessage() {
    return 'CNPJ inválido';
  }
}

// Registra o decorator
export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCnpjConstraint,
    });
  };
}

export class CreateWarrantyRegistrationDto {
  @IsNumber()
  warrantyId: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
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

  @IsString()
  @IsOptional()
  finalClientName?: string;

  @IsString()
  @IsOptional()
  finalClientNumber?: string;
}
