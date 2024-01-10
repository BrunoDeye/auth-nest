import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isDefined,
  registerDecorator,
} from 'class-validator';
import { $Enums } from '@prisma/client';

export class LoginDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}

@ValidatorConstraint({ async: false })
class IsNotSiblingOfConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (isDefined(value)) {
      return this.getFailedConstraints(args).length === 0;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${
      args.property
    } cannot exist alongside the following defined properties: ${this.getFailedConstraints(
      args,
    ).join(', ')}`;
  }

  getFailedConstraints(args: ValidationArguments) {
    return args.constraints.filter((prop) => isDefined(args.object[prop]));
  }
}

// Create Decorator for the constraint that was just created
function IsNotSiblingOf(
  props: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: props,
      validator: IsNotSiblingOfConstraint,
    });
  };
}

// Helper function for determining if a prop should be validated
function incompatibleSiblingsNotPresent(incompatibleSiblings: string[]) {
  return function (o, v) {
    return Boolean(
      isDefined(v) || // Validate if prop has value
        incompatibleSiblings.every((prop) => isDefined(o[prop])), // Validate if all incompatible siblings are not defined
    );
  };
}

export function IncompatibleWith(
  incompatibleSiblings: ('department' | 'groupName')[],
) {
  const notSibling = IsNotSiblingOf(incompatibleSiblings);
  const validateIf = ValidateIf(
    incompatibleSiblingsNotPresent(incompatibleSiblings),
  );
  return function (target: any, key: string) {
    notSibling(target, key);
    validateIf(target, key);
  };
}

const { colaborator, ...Groups } = $Enums.Groups;


export class CreateTempAuthDto {
  @IncompatibleWith(['department'])
  @IsEnum(Groups)
  @IsOptional()
  groupName: Omit<$Enums.Groups, 'colaborator'>;

  @IncompatibleWith(['groupName'])
  @IsEnum($Enums.Departments)
  @IsOptional()
  department: $Enums.Departments;

  @IsNumber()
  @IsOptional()
  utilizations: number;
}
