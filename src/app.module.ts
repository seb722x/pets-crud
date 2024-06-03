import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { DatabaseModule } from './database/database.module'
import { JwtModule } from '@nestjs/jwt'

// modules
import { LogModule } from './modules/log/log.module'
import { RolesModule } from './modules/roles/roles.module'
import { UserModule } from './modules/users/user.module'
import { ProfileModule } from './modules/profile/profile.module'
import { Auth0Module } from './modules/auth0/auth.module'

//services



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: process.env.PUBLIC_PATH || join(__dirname, '.', 'dist/public'),
    }),
    DatabaseModule,

    JwtModule.register({
      secret: process.env.JWT_SALT,
      signOptions: { expiresIn: '60d' },
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 60 * 7, // Time to cache in mseconds -- 30 minutes
    }),

    //Modules
   
    LogModule,
    RolesModule,
    Auth0Module,
    UserModule,
    ProfileModule,
   
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AppModule {}
