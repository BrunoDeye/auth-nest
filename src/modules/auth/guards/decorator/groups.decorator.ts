import { SetMetadata } from '@nestjs/common';
import { $Enums } from '@prisma/client';

export const GROUPS_KEY = 'groups';
export const Groups = (...groups: $Enums.Groups[]) =>
  SetMetadata(GROUPS_KEY, groups);
