import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { userProvider } from './entities/providers/user.provider'
import { roleProvider } from '../roles/entities/providers/roles.provider'
import { Auth0Module } from '../auth0/auth.module'

@Module({
  imports: [Auth0Module],
  controllers: [UserController],
  providers: [UserService, ...userProvider, ...roleProvider],
  exports: [UserService],
})
export class UserModule {}
