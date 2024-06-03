import { Body, Controller, Post, Get, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserDto } from './dtos/user.dto'
import { UserService } from './user.service'
import { UpdateUserDto } from './dtos/update-user.dto'
import { PaginationDto } from 'src/commons/dto/pagination-dto/pagination.dto'
import { UserRoleDto } from './dtos/user-role.dto'
import { Roles } from '../auth0/decorators/roles.decorator'
import { RoleCodeEnum } from '../auth0/interfaces/enums/role.enum'
import { CommonErrorResponses } from 'src/commons/decorators/errors-swagger.decorator'

@ApiTags('users')
@CommonErrorResponses()
@Roles(RoleCodeEnum.ADMIN, RoleCodeEnum.USER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: UserDto })
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto)
  }

  @ApiResponse({ status: 200, description: 'The user has been Found', type: UserDto })
  @Get(':uuid')
  async findByUUID(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.userService.findById(uuid)
  }

  @ApiResponse({ status: 200, description: 'The user has been Found', type: [UserDto] })
  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<UserDto[]> {
    return this.userService.findAll(paginationDto)
  }

  @ApiResponse({ status: 200, description: 'The user has been updated', type: UserDto })
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateData: UpdateUserDto): Promise<UserDto> {
    return this.userService.update(uuid, updateData)
  }

  @ApiResponse({ status: 200, description: 'The user has been delted', type: UserDto })
  @Patch(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.userService.delete(uuid)
  }

  @ApiResponse({ status: 200, description: 'The user has been delted', type: UserDto })
  @Patch(':uuid')
  async hardDelete(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.userService.hardDelete(uuid)
  }

  @Patch('status/:uuid/:boolean')
  async status(@Param('uuid') uuid: string, @Param('boolean') status: boolean): Promise<UserDto> {
    return await this.userService.status(uuid, status)
  }

  @ApiResponse({ status: 200, description: 'The role has been assigned to the user', type: UserDto })
  @Post('assign-role')
  async assignRole(@Body() data: UserRoleDto): Promise<UserDto> {
    return this.userService.assignRole(data)
  }
}
