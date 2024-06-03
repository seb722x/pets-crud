import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { CreateProfileDto } from './create-profile.dto'
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

export class UpdateProfileDto extends PartialType(OmitType(CreateProfileDto, ['userUuid'] as const)) {
  @Exclude()
  @IsOptional()
  userUuid?: string
}
