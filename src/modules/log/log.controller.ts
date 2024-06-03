import { Controller, BadRequestException, Post, Body, Get, Param, Query, Patch } from '@nestjs/common'

import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger'
import { LogDto } from './dtos/log.dto'
import { LogService } from 'src/modules/log/log.service'
import { PaginationDto } from 'src/commons/dto/pagination-dto/pagination.dto'
import { UpdateLogDto } from './dtos/update-log.dto'
import { CreateLogDto } from './dtos/create-log.dto'

@Controller('logger')
export class LogController {
  constructor(private logService: LogService) {}

  @ApiCreatedResponse({ description: 'The log has been successfully created.' })
  @Post('/create-error')
  async create(@Body() createLog: CreateLogDto): Promise<LogDto> {
    return this.logService.create(createLog)
  }

  @ApiResponse({ status: 200, description: 'The user has been Found', type: LogDto })
  @Get(':uuid')
  async findByUUID(@Param('uuid') uuid: string): Promise<LogDto> {
    return this.logService.findByUUID(uuid)
  }

  @ApiResponse({ status: 200, description: 'The user has been Found', type: [LogDto] })
  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<LogDto[]> {
    return this.logService.findAll(paginationDto)
  }

  @ApiResponse({ status: 200, description: 'The user has been updated', type: LogDto })
  @Patch()
  async update(@Body() updateData: UpdateLogDto): Promise<LogDto> {
    return this.logService.update(updateData)
  }

  @ApiResponse({ status: 200, description: 'The user has been delted', type: LogDto })
  @Patch(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<LogDto> {
    return this.logService.delete(uuid)
  }
}
