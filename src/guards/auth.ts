
import { Injectable, CanActivate, ExecutionContext, NotImplementedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // ToDO: Implement JWT validation
    throw new NotImplementedException();
  }
}