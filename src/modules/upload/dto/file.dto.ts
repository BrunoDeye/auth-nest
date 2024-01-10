import { IsString, IsMimeType, IsNumber } from 'class-validator';
import {
  IsNotEmpty,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBuffer', async: false })
export class IsBufferConstraint implements ValidatorConstraintInterface {
  validate(buffer: any, args: ValidationArguments) {
    if (!(buffer instanceof Buffer)) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a Buffer.`;
  }
}

export class FileDto {
  @IsString()
  fieldname: string;

  @IsString()
  originalname: string;

  @IsMimeType()
  mimetype: string;

  @IsNotEmpty()
  @Validate(IsBufferConstraint)
  buffer: Buffer;

  @IsNumber()
  size: number;
}
