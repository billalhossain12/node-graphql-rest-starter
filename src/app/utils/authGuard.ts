import { AppError } from '../errors';
interface AuthUser {
  userId: string;
  role: string;
  iat: number;
  permissions?: string[];
}

export function authGuard(user: AuthUser, requiredRoles: string[]) {
  if (!user || (requiredRoles && !requiredRoles.includes(user.role))) {
    throw new AppError('You are not authorized', 'Forbidden');
  }
}
