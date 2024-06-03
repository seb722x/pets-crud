import { Table, Column, Model, DataType, IsUUID, PrimaryKey, AllowNull, AutoIncrement } from 'sequelize-typescript'
import { offerTripDurations } from 'src/commons/interfaces/offerServices.interface'
import { BookingStatus } from 'src/commons/interfaces/payments.interface'

@Table({
  indexes: [],
  deletedAt: false,
})
export class Bookings extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @AllowNull(false)
  @Column
  offer_id: number

  @AllowNull(false)
  @Column
  user_id: string

  @AllowNull(false)
  @Column(DataType.ENUM({ values: Object.values(offerTripDurations) }))
  type: string

  @AllowNull(false)
  @Column(DataType.ENUM({ values: Object.values(BookingStatus) }))
  status: string

  @AllowNull(false)
  @Column
  booked_date: string

  @AllowNull(false)
  @Column
  passengers: number

  @AllowNull(false)
  @Column
  accepted_cancelation_policy: boolean
}
