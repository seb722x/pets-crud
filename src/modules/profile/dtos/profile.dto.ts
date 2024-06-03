import { Exclude, Type } from 'class-transformer'
import { UserDto } from 'src/modules/users/dtos/user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class ProfileDto {
  @Exclude()
  readonly id: number

  @ApiProperty({
    description: 'Unique identifier of the profile',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  readonly uuid: string
  
  @ApiProperty({
    description: 'First name of the individual associated with the profile',
    example: 'John',
  })
  readonly name: string

  @ApiProperty({
    description: 'First name of the individual associated with the profile',
    example: 'John',
  })
  readonly name2: string

  @ApiProperty({
    description: 'First name of the individual associated with the profile',
    example: 'John',
  })
  readonly lastName: string

  @ApiProperty({
    description: 'First name of the individual associated with the profile',
    example: 'John',
  })
  readonly lastName2: string

  @ApiProperty({
    description: 'First name of the individual associated with the profile',
    example: 'John',
  })
  readonly address: string

  @ApiProperty({
    description: 'Business phone number associated with the profile',
    example: '+1234567890',
  })
  readonly phone: string

  @ApiProperty({
    description: 'Name of the business associated with the profile',
    example: 'Doe Electronics',
  })
  readonly email: string

  @ApiProperty({
    description: 'Website URL of the business',
    example: 'https://doeselectronics.com',
  })
  readonly status: boolean

  @ApiProperty({
    description: 'User associated with the profile, showing only email and uuid',
    type: 'object',
    properties: {
      uuid: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier of the user',
        example: '123e4567-e89b-12d3-a456-426614174000',
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Email address of the user',
        example: 'example@domain.com',
      },
    },
  })
  @Type(() => UserDto)
  readonly user: UserDto

  @Exclude()
  readonly userId: number

  @ApiProperty({
    description: 'Timestamp of when the profile was created',
    example: '2024-05-01T00:00:00Z',
    type: Date,
  })
  readonly createdAt?: Date

  @ApiProperty({
    description: 'Timestamp of when the profile was last updated',
    example: '2024-05-10T00:00:00Z',
    type: Date,
  })
  readonly updatedAt?: Date

  @Exclude()
  readonly deletedAt?: Date

}
