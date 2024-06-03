import { Inject, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common'
import { LOG_REPOSITORY } from 'src/commons/constants/entities.constants'
import { Log } from './entities/log.entity'
import { PaginationDto } from 'src/commons/dto/pagination-dto/pagination.dto'
import { LogDto } from './dtos/log.dto'
import { plainToInstance } from 'class-transformer'
import { UpdateLogDto } from './dtos/update-log.dto'
import { CreateLogDto } from './dtos/create-log.dto'

@Injectable()
export class LogService extends Logger {
  private readonly logger: Logger

  constructor(
    private entityName: string,

    @Inject(LOG_REPOSITORY)
    private logRepository?: typeof Log,
  ) {
    super(entityName)
    this.entityName = entityName
    this.logger = new Logger(LogService.name)
  }

  async create(data: CreateLogDto): Promise<LogDto> {
    try {
      const log = await this.logRepository.create(data)

      return plainToInstance(LogDto, log.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async update(data: UpdateLogDto): Promise<LogDto> {
    try {
      const { uuid, ...updateData } = data

      let log = await this.logRepository.findOne({
        where: { uuid: data.uuid, deletedAt: null },
      })

      if (!log) {
        throw new UnprocessableEntityException('Log not found')
      }

      log = await log.update(updateData)

      return plainToInstance(LogDto, log.get({ plain: true }))
    } catch {
      this.logger.error('Error updating user')
      throw new UnprocessableEntityException('Error updating user')
    }
  }

  async findAll(queryParams: PaginationDto): Promise<LogDto[]> {
    try {
      const { limit, offset, order } = queryParams

      const logs = await this.logRepository.findAll({
        limit,
        offset,
        order,
        where: { deletedAt: null },
      })

      return plainToInstance(
        LogDto,
        logs.map((log) => log.get({ plain: true })),
      )
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async findByUUID(uuid: string): Promise<LogDto> {
    try {
      const log = await this.logRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!log) {
        throw new UnprocessableEntityException('Log not found')
      }

      return plainToInstance(LogDto, log.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async delete(uuid: string): Promise<LogDto> {
    try {
      const log = await this.logRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!log) {
        throw new UnprocessableEntityException('Log not found')
      }

      await log.destroy()

      return plainToInstance(LogDto, log.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }
}
