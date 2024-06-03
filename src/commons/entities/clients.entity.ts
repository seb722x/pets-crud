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
      fields: ['user_id', 'email'],
      unique: true,
      name: 'user_client',
    },
  ],
  deletedAt: false,
})
export class Clients extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @AllowNull(false)
  @Column
  user_id: string

  @AllowNull(false)
  @Column
  email: string

  @AllowNull(false)
  @Column
  first_name: string

  @AllowNull(false)
  @Column
  last_name: string

  @Default(false)
  @Column
  deleted: boolean

  @AllowNull(false)
  @Column
  phone_number: string
}
