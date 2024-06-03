import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement } from 'sequelize-typescript'

@Table({
  createdAt: false,
  indexes: [{ fields: ['stripe_customer_id'], unique: true, name: 'stripe_id' }],
  deletedAt: false,
})
export class Unverified_Bank_Account extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @AllowNull(false)
  @Column
  stripe_bank_id: string

  @AllowNull(false)
  @Column
  stripe_bank_token: string

  @AllowNull(false)
  @Column
  stripe_customer_id: string

  @AllowNull(false)
  @Column
  status: string
}
