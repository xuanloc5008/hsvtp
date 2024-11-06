import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthPayload, Role } from '../user.entity';
import { ROLES_KEY } from '../../common/decorator/role';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: AuthPayload = request.user;
        console.log(user.role);
        if (!user || !user.role) {
            return false;
        }
        const hasRole = () =>
            user.role.some((role) => requiredRoles.includes(role));
        if (!hasRole()) {
            throw new ForbiddenException('You do not have permission (Roles)');
        }
        return true;
    }
}
