import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator'
import { bookingDays } from 'src/commons/interfaces/bookingDays.interface'
//import { periodType } from 'src/commons/interfaces/periodType.interface'

export class UserAdvancedBookingPeriodDto {
  user_id: string

  @IsNotEmpty()
  period: number

  @IsNotEmpty()
  //@IsEnum(periodType)
  period_type: string
}

export class UserDaysOffDto {
  @IsNotEmpty()
  @IsISO8601()
  date: string
}

export class UpsertUserDaysOffDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDaysOffDto)
  new_dates: UserDaysOffDto[]

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDaysOffDto)
  delete_dates: UserDaysOffDto[]
}

export class UpsertUserBookingDaysDto {
  @IsNotEmpty()
  @IsArray()
  @IsEnum(bookingDays, { each: true })
  new_days: bookingDays[]

  @IsNotEmpty()
  @IsArray()
  @IsEnum(bookingDays, { each: true })
  delete_days: bookingDays[]
}

export class UserCalendarDataDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UserAdvancedBookingPeriodDto)
  advanced_booking_period: UserAdvancedBookingPeriodDto

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => UpsertUserDaysOffDto)
  days_off: UpsertUserDaysOffDto

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => UpsertUserBookingDaysDto)
  booking_days: UpsertUserBookingDaysDto
}

export class UserCalendarAvailabilityDto {
  @IsNotEmpty()
  start_date: string

  @IsNotEmpty()
  end_date: string
}
