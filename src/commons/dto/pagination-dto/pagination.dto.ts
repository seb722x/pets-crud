import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsPositive, IsString, Min, Validate } from 'class-validator'
import { IsValidSortConstraint } from './validator'
import { ApiProperty } from '@nestjs/swagger'

export class PaginationDto {
  @ApiProperty({
    description: 'The sorting parameter',
    example: 'deletedAt_asc',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Validate(IsValidSortConstraint)
  sort?: string

  @ApiProperty({
    description: 'The limit of the records',
    example: 10,
    required: false,
    default: 20,
  })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit: number = 20

  @ApiProperty({
    description: 'The offset of the records',
    example: 10,
    required: false,
    default: 0,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  offset: number = 0

  get order(): [string, string][] | undefined {
    if (!this.sort) {
      return undefined
    }
    const [field, orderType] = this.sort.split('_')
    if (orderType && (orderType.toLowerCase() === 'asc' || orderType.toLowerCase() === 'desc')) {
      return [[field, orderType.toUpperCase()]]
    }
    return undefined
  }
}
