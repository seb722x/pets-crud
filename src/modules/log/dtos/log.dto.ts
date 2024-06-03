import { Exclude, Transform, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class LogDto {
  @Exclude()
  readonly id: number

  @ApiProperty({ example: '293adbe0-dca5-55d9-9cd8-fe3c4deb2d22', description: 'The uuid' })
  readonly uuid: string

  @ApiProperty({ example: 'user', description: 'Entity in db where problem appears' })
  readonly entityName: string

  @ApiProperty({ example: 'user faile exception', description: 'Message explaining the exception' })
  readonly message: string

  @ApiProperty({ example: 'true', description: 'Found a solution?' })
  resolved: boolean

  @ApiProperty({ example: 'error', description: 'Type of exception' })
  type: string

  @ApiProperty()
  readonly createdAt?: Date

  @ApiProperty()
  readonly updatedAt?: Date

  @ApiProperty()
  @Transform(({ value }) => (value === null ? undefined : value), { toClassOnly: true })
  readonly deletedAt?: Date
}
