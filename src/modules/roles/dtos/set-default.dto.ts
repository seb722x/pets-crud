import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class SetDefaultDto {
  @ApiProperty()
  @IsUUID()
  uuid: string
}
