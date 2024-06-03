import {
  Table,
  Column,
  Model,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  Default,
} from 'sequelize-typescript'

@Table({
  indexes: [],
  deletedAt: false,
})
export class Bookings_Rejection extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @AllowNull(false)
  @Column
  booking_id: number

  @AllowNull(false)
  @Column
  reason: string
}
