import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, ValidateIf, ValidateNested } from 'class-validator'
import { offerServices } from 'src/commons/interfaces/offerServices.interface'

export class OfferAttributesDto {
  @IsNotEmpty()
  tripType: string

  tripSeasonStartDate?: string

  tripSeasonEndDate?: string

  @IsNotEmpty()
  numberOfPassengers: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TripLengthTypeDto)
  tripLength: TripLengthTypeDto[]

  extraFeePerPassenger?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfferServicesDto)
  clientItems: OfferServicesDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfferServicesDto)
  availableServices: OfferServicesDto[]

  @IsNotEmpty()
  meetingLocation: string
}

export class OfferDto {
  @IsNotEmpty()
  start_date: string

  @IsNotEmpty()
  end_date: string

  @IsNotEmpty()
  description: string

  @IsOptional()
  title: string

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OfferAttributesDto)
  attributes: OfferAttributesDto
}

export class OfferServicesDto {
  @IsNotEmpty()
  service_id: number

  @IsNotEmpty()
  selected: boolean

  @IsNotEmpty()
  value: string

  service_type: offerServices

  @ValidateIf((o) => o.selected && o.value === 'Other')
  @IsNotEmpty()
  additional_info: string
}

export class TripLengthTypeDto {
  @IsNotEmpty()
  selected: boolean

  @IsNotEmpty()
  type: string

  @ValidateIf((o) => o.selected)
  @IsNotEmpty()
  start_time: string

  @ValidateIf((o) => o.selected)
  @IsNotEmpty()
  end_time: string

  @ValidateIf((o) => o.selected)
  @IsNotEmpty()
  deposit_required: boolean

  deposit?: number

  @ValidateIf((o) => o.selected)
  @IsNotEmpty()
  fee: number
}
