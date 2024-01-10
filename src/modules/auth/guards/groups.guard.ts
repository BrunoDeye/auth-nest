import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { $Enums } from '@prisma/client';
import { GROUPS_KEY } from './decorator/groups.decorator';

@Injectable()
export class GroupsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const groups = this.reflector.getAllAndOverride<$Enums.Groups[]>(
      GROUPS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!groups) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.jwtSecretKey,
      });
      request['user'] = payload;
      if (payload.sub.role === $Enums.Roles.ADMIN) return true;

      if (!groups.some((group) => payload.sub.group === group))
        throw new ForbiddenException(
          'O grupo que você pertence não tem autorização para essa requisição.',
        );
    } catch (err) {
      throw new HttpException(err.message, err.status || 401, {
        description: 'Groups Guard',
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
