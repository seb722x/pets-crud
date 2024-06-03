import { Table, Column, Model, AllowNull, PrimaryKey, DataType, IsUUID } from 'sequelize-typescript'

@Table({
  createdAt: false,
  indexes: [
    {
      fields: ['user_id', 'date'],
      unique: true,
      name: 'user_date',
    },
  ],
  deletedAt: false,
})
export class UserDaysOff extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  user_id: string

  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.DATEONLY)
  date: string
}
