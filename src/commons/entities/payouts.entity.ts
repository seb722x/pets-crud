import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript'

@Table({
  indexes: [
    {
      fields: ['transaction_id'],
      unique: true,
      name: 'payout_transaction_id',
    },
  ],
  deletedAt: false,
})
export class Payouts extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @AllowNull(false)
  @Column
  transaction_id: number

  @AllowNull(false)
  @Column
  status: string
}
