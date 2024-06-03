import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserRoleDto {
  @ApiProperty({ required: true, example: 'b0b4b3b4-4b4b-4b4b-4b4b-b4b4b4b4b4b4', description: 'The role uuid' })
  @IsNotEmpty()
  @IsUUID()
  roleUuid: string

  @ApiProperty({ required: true, example: 'b0b4b3b4-4b4b-4b4b-4b4b-b4b4b4b4b4b4', description: 'The user' })
  @IsNotEmpty()
  @IsUUID()
  userUuid: string
}
