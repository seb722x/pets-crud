import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsEmail, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  uuid?: string

  @ApiProperty({ required: true, example: 'jhon@gmail.com', description: 'The email' })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  userId: string

}
