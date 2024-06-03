import { ConsoleLogger, Inject, UnprocessableEntityException } from '@nestjs/common'
import { Log } from '../entities/log.entity'
import { CreateLogDto } from '../dtos/create-log.dto'
import { LoggerLevel } from '../interfaces/logger-type.interface'

export class ExtendedLogger extends ConsoleLogger {
  constructor(context?: string) {
    super(context)
  }

  error(message: any, trace?: string, context?: string) {
    const logContext = context || this.context
    const logMessage = typeof message === 'object' ? message.message : message

    const log = {
      message: logMessage,
      type: LoggerLevel.ERROR,
      context: logContext,
    }

    try {
      super.error(message, trace, logContext)
      this.create(log)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  async create(data: CreateLogDto): Promise<void> {
    try {
      await Log.create(data)
    } catch (error) {
      console.error('Error creating log in db:', error.message)
    }
  }
}
