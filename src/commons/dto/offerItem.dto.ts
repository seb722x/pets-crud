import { IsNotEmpty } from 'class-validator'

export class OfferItemDto {
  @IsNotEmpty()
  value: string
}
