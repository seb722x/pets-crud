import { Exclude, Type } from 'class-transformer'
import { UserDto } from 'src/modules/users/dtos/user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class RoleDto {
  @Exclude()
  readonly id: number

  @ApiProperty()
  readonly uuid: string

  @ApiProperty()
  readonly createdAt?: Date

  @ApiProperty()
  readonly updatedAt?: Date

  readonly deletedAt?: Date

  @ApiProperty()
  readonly name: string

  @ApiProperty()
  readonly description: string

  @ApiProperty({ type: () => UserDto })
  @Type(() => UserDto)
  readonly users?: UserDto[]
}
