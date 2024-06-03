import { PartialType, ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsUUID } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false, example: 'b0b4b3b4-4b4b-4b4b-4b4b-b4b4b4b4b4b4', description: 'The user uuid' })
  @IsOptional()
  @IsUUID()
  uuid: string
}
