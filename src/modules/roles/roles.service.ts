import { Inject, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { RoleDto } from './dtos/role.dto'
import { CreateRoleDto } from './dtos/create-role.dto'
import { ROLE_REPOSITORY } from 'src/commons/constants/entities.constants'
import { Role } from './entities/roles.entity'
import { PaginationDto } from 'src/commons/dto/pagination-dto/pagination.dto'
import { UpdateRoleDto } from './dtos/update-role.dto'
import { User } from '../users/entities/users.entity'

@Injectable()
export class RoleService {
  private readonly logger: Logger

  constructor(
    @Inject(ROLE_REPOSITORY)
    private roleRepository: typeof Role,
  ) {
    this.logger = new Logger(RoleService.name)
  }

  async create(data: CreateRoleDto): Promise<RoleDto> {
    try {
      const role = await this.roleRepository.create(data)

      return plainToInstance(RoleDto, role.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)

      throw new UnprocessableEntityException(error)
    }
  }

  async findAll(queryParams: PaginationDto): Promise<RoleDto[]> {
    try {
      const { limit, offset, order } = queryParams

      const roles = await this.roleRepository.findAll({
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
        RoleDto,
        roles.map((role) => role.get({ plain: true })),
      )
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async findByUUID(uuid: string): Promise<RoleDto> {
    try {
      const role = await this.roleRepository.findOne({
        where: {
          uuid,
          deletedAt: null,
        },
        include: [
          {
            model: User,
            attributes: ['email', 'uuid'],
          },
        ],
      })

      return plainToInstance(RoleDto, role.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async update(updateData: UpdateRoleDto): Promise<RoleDto> {
    try {
      const { uuid, ...updateRole } = updateData
      let role = await this.roleRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!role) {
        throw new UnprocessableEntityException('User not found')
      }

      role = await role.update(updateRole)
      return plainToInstance(RoleDto, role.get({ plain: true }))
    } catch {
      this.logger.error('Error updating user')
      throw new UnprocessableEntityException('Error updating user')
    }
  }

  async delete(uuid: string): Promise<RoleDto> {
    try {
      const role = await this.roleRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!role) {
        throw new UnprocessableEntityException('Role not found')
      }

      role.deletedAt = new Date()

      const roleResponse = await role.save()

      return plainToInstance(RoleDto, roleResponse.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async hardDelete(uuid: string): Promise<RoleDto> {
    try {
      const role = await this.roleRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!role) {
        throw new UnprocessableEntityException('Role not found')
      }

      role.destroy()

      const roleResponse = await role.save()

      return plainToInstance(RoleDto, roleResponse.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async status(uuid: string, disable: boolean): Promise<RoleDto> {
    try {
      let role = await this.roleRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!role) {
        throw new UnprocessableEntityException('Role not found')
      }

      role = await role.update({ status: disable })

      return plainToInstance(RoleDto, role.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async setDefaultRole(roleUuid: string): Promise<boolean> {
    try {
      await this.roleRepository.update(
        { default: false },
        {
          where: { default: true },
        },
      )

      await this.roleRepository.update(
        { default: true },
        {
          where: { uuid: roleUuid },
        },
      )

      return true
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }
}
