
import { Injectable, CanActivate, ExecutionContext, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly permission: string) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.user.permissions !== this.permission) {
      throw new UnauthorizedException();
    }

    return true;
  }
}