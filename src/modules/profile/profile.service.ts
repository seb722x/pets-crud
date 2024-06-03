import { Inject, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PaginationDto } from 'src/commons/dto/pagination-dto/pagination.dto'
import { Profile } from './entities/profile.entity'
import { CreateProfileDto, ProfileDto, UpdateProfileDto } from './dtos'
import { PROFILE_REPOSITORY, USER_REPOSITORY } from 'src/commons/constants/entities.constants'
import { User } from '../users/entities/users.entity'

@Injectable()
export class ProfileService {
  private readonly logger: Logger

  constructor(
    @Inject(PROFILE_REPOSITORY)
    private profileRepository: typeof Profile,

    @Inject(USER_REPOSITORY)
    private userRepository: typeof User,
  ) {
    this.logger = new Logger(ProfileService.name)
  }

  async create(data: CreateProfileDto): Promise<ProfileDto> {
    try {
      const { userUuid, ...dataProfile } = data

      const user = await this.userRepository.findOne({
        where: { uuid: data.userUuid },
        attributes: ['id'],
      })

      if (user === null) {
        throw new UnprocessableEntityException('User not found')
      }

      const existingProfile = await this.profileRepository.findOne({
        where: { userId: user.id },
      })

      if (existingProfile) {
        throw new UnprocessableEntityException('User already has a profile')
      }

      const profile = await this.profileRepository.create({
        ...dataProfile,
        userId: user.id,
      })

      return plainToInstance(ProfileDto, profile.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)

      throw new UnprocessableEntityException(error)
    }
  }

  async findAll(queryParams: PaginationDto): Promise<ProfileDto[]> {
    try {
      const { limit, offset, order } = queryParams

      const profiles = await this.profileRepository.findAll({
        limit,
        offset,
        order,
        include: [
          {
            model: User,
            attributes: ['email', 'uuid'],
          },
        ],
      })

      return plainToInstance(
        ProfileDto,
        profiles.map((profile) => profile.get({ plain: true })),
      )
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async findByUUID(uuid: string, includeUser: boolean = true): Promise<ProfileDto> {
    try {
      const includeOptions = includeUser ? [
        {
          model: User,
          attributes: ['email', 'uuid'],
        }
      ] : [];
  
      const profile = await this.profileRepository.findOne({
        where: {
          uuid,
          deletedAt: null,
        },
        include: includeOptions,
      });
  
      if (!profile) {
        throw new UnprocessableEntityException('Profile not found');
      }
  
      return plainToInstance(ProfileDto, profile.get({ plain: true }));
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityException(error);
    }
  }

  async update(uuid: string, updateData: UpdateProfileDto): Promise<ProfileDto> {
    try {
      let profile = await this.profileRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!profile) {
        throw new UnprocessableEntityException('Profile not found')
      }

      const updateprofile = await profile.update(updateData)

      return plainToInstance(ProfileDto, updateprofile.get({ plain: true }))
    } catch {
      this.logger.error('Error updating user')
      throw new UnprocessableEntityException('Error updating profile')
    }
  }

  async delete(uuid: string): Promise<ProfileDto> {
    try {
      const profile = await this.profileRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!profile) {
        throw new UnprocessableEntityException('Profile not found')
      }

      profile.deletedAt = new Date()

      const deletedProfile = await profile.save()

      return plainToInstance(ProfileDto, deletedProfile.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async hardDelete(uuid: string): Promise<ProfileDto> {
    try {
      const profile = await this.profileRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!profile) {
        throw new UnprocessableEntityException('Profile not found')
      }

      profile.destroy()

      const deletedProfile = await profile.save()

      return plainToInstance(ProfileDto, deletedProfile.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async status(uuid: string, disable: boolean): Promise<ProfileDto> {
    try {
      let profile = await this.profileRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!profile) {
        throw new UnprocessableEntityException('Profile not found')
      }

      profile = await profile.update({ status: disable })

      return plainToInstance(ProfileDto, profile.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }
}
