import { Controller, Post, Get, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, Patch } from '@nestjs/common'
import { RoleService } from './roles.service'
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dtos'
import { PaginationDto } from 'src/commons/dto/pagination-dto/pagination.dto'
import { Roles } from '../auth0/decorators/roles.decorator'
import { RoleCodeEnum } from '../auth0/interfaces/enums/role.enum'
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger'
import { CommonErrorResponses } from 'src/commons/decorators/errors-swagger.decorator'
import { SetDefaultDto } from './dtos/set-default.dto'

@ApiTags('roles')
@CommonErrorResponses()
@Roles(RoleCodeEnum.ADMIN, RoleCodeEnum.USER)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: RoleDto })
  @Post('/create')
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.create(createRoleDto)
  }

  @ApiResponse({ status: 200, description: 'The record has been Found', type: [RoleDto] })
  @Get()
  async getAllRoles(@Query() queryParams: PaginationDto): Promise<RoleDto[]> {
    return this.roleService.findAll(queryParams)
  }

  @ApiResponse({ status: 200, description: 'The record has been Found', type: RoleDto })
  @Get(':uuid')
  async getRoleByUUID(@Param('uuid') uuid: string): Promise<RoleDto> {
    return this.roleService.findByUUID(uuid)
  }

  @ApiResponse({ status: 200, description: 'The record has been Found', type: RoleDto })
  @Patch(':uuid')
  async updateRole(@Body() updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    return this.roleService.update(updateRoleDto)
  }

  @ApiResponse({ status: 200, description: 'The record has been Found', type: RoleDto })
  @Delete(':uuid')
  async deleteRole(@Param('uuid') uuid: string): Promise<RoleDto> {
    return await this.roleService.delete(uuid)
  }

  @ApiResponse({ status: 200, description: 'The record has been Found', type: RoleDto })
  @Delete(':uuid')
  async hardDelete(@Param('uuid') uuid: string): Promise<RoleDto> {
    return await this.roleService.hardDelete(uuid)
  }

  @Patch('status/:uuid/:boolean')
  async status(@Param('uuid') uuid: string, @Param('boolean') status: boolean) {
    return await this.roleService.status(uuid, status)
  }

  @ApiResponse({ status: 200, description: 'Set role as default to assign it in new users', type: Boolean })
  @Post('/default')
  async setDefault(@Body() body: SetDefaultDto): Promise<boolean> {
    return await this.roleService.setDefaultRole(body.uuid)
  }
}
