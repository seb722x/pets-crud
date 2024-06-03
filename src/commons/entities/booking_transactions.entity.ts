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
  indexes: [
    {
      fields: ['booking_id', 'stripe_payment_intent_id'],
      unique: true,
      name: 'booking_stripe_intent',
    },
  ],
  deletedAt: false,
})
export class Bookings_Transactions extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @AllowNull(false)
  @Column
  booking_id: number

  @AllowNull(false)
  @Column
  amount: number

  @AllowNull(false)
  @Column(DataType.ENUM({ values: ['DEPOSIT', 'FULL', 'NONE'] }))
  type: string

  @AllowNull(true)
  @Column
  stripe_payment_intent_id: string

  @AllowNull(true)
  @Column
  stripe_client_customer_id: string

  @AllowNull(false)
  @Column
  client_id: number

  @AllowNull(true)
  @Column(DataType.ENUM({ values: ['bank', 'us_bank_account', 'card', 'none'] }))
  method: string
}
