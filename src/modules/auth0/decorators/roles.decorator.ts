import { SetMetadata } from '@nestjs/common'
import { RoleCodeEnum } from '../interfaces/enums/role.enum'
import { RolesKey } from '../interfaces/constants/role.constant'

export const Roles = (...roles: RoleCodeEnum[]) => SetMetadata(RolesKey, roles)
