import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  Patch,
  Inject,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiCreatedResponse, ApiResponse, ApiOperation, ApiBody, ApiParam, ApiConsumes } from '@nestjs/swagger'
import { ProfileService } from './profile.service'
import { CreateProfileDto } from './dtos/create-profile.dto'
import { UpdateProfileDto } from './dtos/update-profile.dto'
import { ProfileDto } from './dtos/profile.dto'
import { PaginationDto } from 'src/commons/dto/pagination-dto/pagination.dto'
import { Roles } from '../auth0/decorators/roles.decorator'
import { RoleCodeEnum } from '../auth0/interfaces/enums/role.enum'
import { CommonErrorResponses } from 'src/commons/decorators/errors-swagger.decorator'
import { IStorageProvider } from 'src/commons/providers/file-storage/interfaces/storage.interface'

@ApiTags('profiles')
@CommonErrorResponses()
@Roles(RoleCodeEnum.ADMIN, RoleCodeEnum.USER)
@Controller('profiles')
export class ProfileController {
  constructor(
    @Inject('IStorageProvider') private readonly storageService: IStorageProvider,
    private readonly profileService: ProfileService,
  ) {}

  @ApiOperation({ summary: 'Create a new profile' })
  @ApiCreatedResponse({ description: 'The profile has been successfully created.', type: ProfileDto })
  @Post('/create')
  async createProfile(@Body() createProfileDto: CreateProfileDto): Promise<ProfileDto> {
    return this.profileService.create(createProfileDto)
  }

  @ApiOperation({ summary: 'Get all profiles' })
  @ApiResponse({ status: 200, description: 'Profiles have been retrieved successfully.', type: [ProfileDto] })
  @Get()
  async getAllProfiles(@Query() queryParams: PaginationDto): Promise<ProfileDto[]> {
    return this.profileService.findAll(queryParams)
  }

  @ApiOperation({ summary: 'Get a profile by UUID' })
  @ApiResponse({ status: 200, description: 'Profile has been found', type: ProfileDto })
  @ApiParam({ name: 'uuid', type: 'string', description: 'UUID of the profile to retrieve' })
  @Get(':uuid')
  async getProfileByUUID(@Param('uuid') uuid: string): Promise<ProfileDto> {
    return this.profileService.findByUUID(uuid)
  }

  @ApiOperation({ summary: 'Update a profile by UUID' })
  @ApiResponse({ status: 200, description: 'Profile has been updated successfully.', type: ProfileDto })
  @ApiParam({ name: 'uuid', type: 'string', description: 'UUID of the profile to update' })
  @Patch(':uuid')
  async updateProfile(@Param('uuid') uuid: string, @Body() updateProfileDto: UpdateProfileDto): Promise<ProfileDto> {
    return this.profileService.update(uuid, updateProfileDto)
  }

  @ApiOperation({ summary: 'Delete a profile by UUID' })
  @ApiResponse({ status: 200, description: 'Profile has been deleted successfully.', type: ProfileDto })
  @ApiParam({ name: 'uuid', type: 'string', description: 'UUID of the profile to delete' })
  @Delete(':uuid')
  async deleteProfile(@Param('uuid') uuid: string): Promise<ProfileDto> {
    return await this.profileService.delete(uuid)
  }

  @Patch('status/:uuid/:boolean')
  async status(@Param('uuid') uuid: string, @Param('boolean') status: boolean) {
    return await this.profileService.status(uuid, status)
  }
  
}
