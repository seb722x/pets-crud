import { Auth0Service } from './auth.service'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategies/auth.strategy'
import { AuthController } from './auth.controller'
import { RestJwtAuthGuard } from './guards/rest-jwt-auth.guard'

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [PassportModule, Auth0Service],
  providers: [JwtStrategy, Auth0Service, RestJwtAuthGuard],
  controllers: [AuthController],
})
export class Auth0Module {}
