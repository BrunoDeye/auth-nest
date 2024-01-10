import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAddressDto {
  @IsInt({ message: 'User ID must be an integer' })
  @IsOptional()
  userId: number;

  @IsInt({ message: 'Company ID must be an integer' })
  @IsOptional()
  companyId: number;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  city: string;

  @IsNotEmpty({ message: 'State is required' })
  @IsString({ message: 'State must be a string' })
  state: string;

  @IsNotEmpty({ message: 'Street is required' })
  @IsString({ message: 'Street must be a string' })
  street: string;

  @IsString({ message: 'Number must be a string' })
  number: string;

  @IsNotEmpty({ message: 'Postal code is required' })
  @IsString({ message: 'Postal code must be a string' })
  @Length(5, 10, { message: 'Postal code must be between 5 and 10 characters' })
  postalCode: string;

  @IsOptional()
  @IsString({ message: 'Complement must be a string' })
  complement?: string;

  @IsNotEmpty({ message: 'Nighborhood is required' })
  @IsString({ message: 'Neighborhood must be a string' })
  neighborhood: string;

  @IsOptional()
  @IsBoolean({ message: 'isPrimary must be a boolean' })
  isPrimary: boolean;

  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;
}


export class UserIdDto {
  @IsInt({ message: 'User ID must be an integer' })
  userId: number;
}