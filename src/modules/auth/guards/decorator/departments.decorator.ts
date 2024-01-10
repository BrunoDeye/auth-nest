import { SetMetadata } from '@nestjs/common';
import { $Enums } from '@prisma/client';

export const DEPARTMENTS_KEY = 'departments';
export const Departments = (...departments: $Enums.Departments[]) =>
  SetMetadata(DEPARTMENTS_KEY, departments);
