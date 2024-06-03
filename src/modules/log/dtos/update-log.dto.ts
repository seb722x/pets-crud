import { Exclude, Transform, Type } from 'class-transformer'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsBoolean, IsUUID } from 'class-validator'
import { CreateLogDto } from './create-log.dto'

export class UpdateLogDto extends PartialType(CreateLogDto) {
  @ApiProperty({ example: '293adbe0-dca5-55d9-9cd8-fe3c4deb2d22', description: 'The uuid' })
  @IsUUID()
  readonly uuid: string

  @ApiProperty({ example: 'true', description: 'Found a solution?' })
  @IsBoolean()
  resolved: boolean
}
