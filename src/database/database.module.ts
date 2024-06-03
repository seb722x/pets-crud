import { Module } from '@nestjs/common'
import { databaseProviders } from './providers/db.provider'
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
