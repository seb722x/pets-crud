import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProfileDto {
  @ApiProperty({
    description: 'First name of the profile owner',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({
    description: 'First name of the profile owner',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly name2: string

  @ApiProperty({
    description: 'First name of the profile owner',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @ApiProperty({
    description: 'First name of the profile owner',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName2: string

  @ApiProperty({
    description: 'Business phone number of the profile owner',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly phone: string

  @ApiProperty({
    description: 'Name of the business associated with the profile',
    example: 'Doe Enterprises',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly email: string

  @ApiProperty({
    description: 'Name of the business associated with the profile',
    example: 'Doe Enterprises',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly address: string

  @ApiProperty({
    description: 'UUID of the user to which this profile is linked',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly userUuid: string
}
