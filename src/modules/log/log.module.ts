import { Module } from '@nestjs/common'
import { LogService } from './log.service'
import { logProvider } from './entities/provider/log.provider'
import { LogController } from './log.controller'

@Module({
  providers: [LogService, ...logProvider],
  exports: [LogService],
  controllers: [LogController],
  imports: [],
})
export class LogModule {}
