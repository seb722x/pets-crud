import { Exclude, Transform, Type } from 'class-transformer'
import { ProfileDto } from 'src/modules/profile/dtos'
import { RoleDto } from 'src/modules/roles/dtos'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @Exclude()
  readonly id: number

  @ApiProperty({ example: '293adbe0-dca5-55d9-9cd8-fe3c4deb2d22', description: 'The uuid' })
  readonly uuid: string

  @ApiProperty({ example: 'John@gmail.com', description: 'The email' })
  readonly email: string

  @ApiProperty()
  readonly createdAt?: Date

  @ApiProperty()
  readonly updatedAt?: Date

  @ApiProperty()
  @Transform(({ value }) => (value === null ? undefined : value), { toClassOnly: true })
  readonly deletedAt?: Date

  @ApiProperty({ type: () => RoleDto })
  @Type(() => RoleDto)
  readonly role?: RoleDto

  @ApiProperty({ type: () => ProfileDto })
  @Type(() => ProfileDto)
  readonly profiles?: ProfileDto[]
}
