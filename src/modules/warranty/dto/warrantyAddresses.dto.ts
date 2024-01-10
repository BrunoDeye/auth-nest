import { $Enums } from '@prisma/client';
import { IsEnum, IsInt } from 'class-validator';

export class CreateAddressesWarrantyDto {
  @IsInt()
  addressId: number;

  @IsInt()
  warrantyId: number;

  @IsEnum($Enums.AddressType)
  type: $Enums.AddressType;
}
