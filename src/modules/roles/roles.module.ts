import { Module } from '@nestjs/common'
import { roleProvider } from './entities/providers/roles.provider'
import { RoleController } from './roles.controller'
import { RoleService } from './roles.service'

@Module({
  controllers: [RoleController],
  providers: [RoleService, ...roleProvider],
  exports: [],
})
export class RolesModule {}
