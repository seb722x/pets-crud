import { Table, Column, Model, DataType, IsUUID, PrimaryKey, Unique, CreatedAt, UpdatedAt } from 'sequelize-typescript'

@Table({ tableName: 'logs', paranoid: true })
export class Log extends Model<Log> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @Column({ type: DataType.STRING, allowNull: true })
  context: string

  @Column({ type: DataType.STRING, allowNull: true })
  message: string

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  resolved: boolean

  @Column({ type: DataType.STRING, allowNull: true })
  type: string

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt?: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt?: Date

  @Column({ type: DataType.DATE, allowNull: true, field: 'deleted_at' })
  deletedAt?: Date
}
