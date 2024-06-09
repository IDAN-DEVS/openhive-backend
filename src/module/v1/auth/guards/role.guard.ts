import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../../../../common/decorators/role.decorator';
import { UserRoleEnum } from '../../../../common/enums/user.enum';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRoleEnum[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const userType = request.user.role;
    return roles.some(r => r === userType);
  }
}
