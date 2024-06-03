import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class CreateLogDto {
  @ApiProperty({ example: '( catch(error))  error.message ', description: 'Message retrieve by the catch function' })
  @IsString()
  message: string

  @ApiProperty({ example: 'auth0, users, profile...', description: 'Where the error happend?' })
  @IsString()
  context: string
}
