import { Inject, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { User } from './entities/users.entity'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserDto } from './dtos/user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { PaginationDto } from 'src/commons/dto/pagination-dto/pagination.dto'
import { ROLE_REPOSITORY, USER_REPOSITORY } from 'src/commons/constants/entities.constants'
import { Role } from '../roles/entities/roles.entity'
import { UserRoleDto } from './dtos/user-role.dto'
import { Profile } from '../profile/entities/profile.entity'
import { Auth0Service } from '../auth0/auth.service'
import { Op } from 'sequelize'
import * as getUuid from 'uuid-by-string'

@Injectable()
export class UserService {
  private readonly logger: Logger

  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User,

    @Inject(ROLE_REPOSITORY)
    private roleRepository: typeof Role,

    private readonly auth0Service: Auth0Service,
  ) {
    this.logger = new Logger(UserService.name)
  }

  async create(data: CreateUserDto): Promise<UserDto> {
    try {
      const defaultRole = await this.roleRepository.findOne({
        where: { default: true },
        raw: true,
        attributes: ['id', 'name'],
      })

      const user = await this.userRepository.create({
        ...data,
        roleId: defaultRole.id,
      })

      return plainToInstance(UserDto, user.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async findAll(queryParams: PaginationDto): Promise<UserDto[]> {
    try {
      const { limit, offset, order } = queryParams

      const users = await this.userRepository.findAll({
        limit,
        offset,
        order,
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['name', 'uuid'],
          },
          {
            model: Profile,
            as: 'profiles',
            attributes: ['uuid'],
          },
        ],
      })

      return plainToInstance(
        UserDto,
        users.map((user) => user.get({ plain: true })),
      )
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async findById(identifier: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          [Op.or]: [{ uuid: identifier }, { userId: identifier }],
          deletedAt: null,
        },
        include: [
          {
            model: Role,
            attributes: ['name', 'uuid'],
          },
          {
            model: Profile,
            attributes: ['uuid'],
          },
        ],
      })

      if (!user) {
        return null
      }

      const userDto = plainToInstance(UserDto, user.get({ plain: true }))

      return userDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error.message)
    }
  }

  async findOrCreate(userId: string): Promise<UserDto> {
    try {
      const user = await this.findById(userId)

      if (!user) {
        const userAuth0 = await this.auth0Service.getUserByAuth(userId)
        const userUuid = getUuid(userId)

        const input = {
          email: userAuth0.email,
          userId,
          uuid: userUuid,
          emailVerified: userAuth0.email_verified,
          provider: userAuth0.identities[0].provider,
          isSocial: userAuth0.identities[0].isSocial,
        }

        await this.create(input)
        return await this.findById(userId)
      }

      return plainToInstance(UserDto, user)
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async update(uuid: string, updateData: UpdateUserDto): Promise<UserDto> {
    try {
      let user = await this.userRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!user) {
        throw new UnprocessableEntityException('User not found')
      }

      const userAuth0 = await this.auth0Service.getUserByAuth(user.userId)

      const input = {
        ...updateData,
        emailVerified: userAuth0.email_verified,
        provider: userAuth0.identities[0].provider,
        isSocial: userAuth0.identities[0].isSocial,
      }

      user = await user.update(input)

      return plainToInstance(UserDto, user.get({ plain: true }))
    } catch {
      this.logger.error('Error updating user')
      throw new UnprocessableEntityException('Error updating user')
    }
  }

  async delete(uuid: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!user) {
        throw new UnprocessableEntityException('User not found')
      }

      user.deletedAt = new Date()
      const deletedUser = await user.save()

      return plainToInstance(UserDto, deletedUser.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async hardDelete(uuid: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!user) {
        throw new UnprocessableEntityException('User not found')
      }

      user.destroy()
      const deletedUser = await user.save()

      return plainToInstance(UserDto, deletedUser.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async status(uuid: string, disable: boolean): Promise<UserDto> {
    try {
      let user = await this.userRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!user) {
        throw new UnprocessableEntityException('User not found')
      }

      user = await user.update({ status: disable })

      return plainToInstance(UserDto, user.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async assignRole(data: UserRoleDto): Promise<UserDto> {
    try {
      const { roleUuid, userUuid } = data

      const role = await this.roleRepository.findOne({
        where: { uuid: roleUuid, deletedAt: null },
        raw: true,
      })

      if (!role) {
        throw new NotFoundException(`Role not found for UUID: ${data.roleUuid}`)
      }

      let user = await this.userRepository.findOne({
        where: { uuid: userUuid, deletedAt: null },
      })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      user.roleId = role.id
      user = await user.save()

      return plainToInstance(UserDto, user.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }
}
