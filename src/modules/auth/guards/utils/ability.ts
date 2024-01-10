import { mongoQueryMatcher } from '@casl/ability';
import { Warranty, User } from '@prisma/client';

export const canUpdateWarranty = (user: User, warranty: Warranty) => {
  const matchConditions = mongoQueryMatcher({
    authorId: warranty.authorId,
    isManager: 'MANAGER',
  });

  if (matchConditions({ authorId: user.id })) {
    return true;
  } else if (matchConditions({ isManager: user.role })) {
    return true;
  }
  return false;
};
