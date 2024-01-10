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
import { DEPARTMENTS_KEY } from './decorator/departments.decorator';

@Injectable()
export class DepartmentsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const departments = this.reflector.getAllAndOverride<$Enums.Departments[]>(
      DEPARTMENTS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!departments) {
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

      if (
        !departments.some((department) => payload.sub.department === department)
      )
        throw new ForbiddenException('Você não pertence a esse departamento.');
    } catch (err) {
      throw new HttpException(err.message, err.status || 401, {
        description: 'Departments Guard',
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
