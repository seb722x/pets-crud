import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RoleCodeEnum } from '../interfaces/enums/role.enum'
import { RolesKey } from '../interfaces/constants/role.constant'

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name)

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const requiredRoles = this.reflector.getAllAndOverride<RoleCodeEnum[]>(RolesKey, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const userRole = request.user?.role?.name || []

    const hasRole = requiredRoles.some((role) => userRole.includes(role))

    if (!hasRole) {
      this.logger.error('Unauthorized roles')
      throw new UnauthorizedException('Not permissions.')
    }

    return true
  }
}
