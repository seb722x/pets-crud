import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Unique,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { User } from 'src/modules/users/entities/users.entity'

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @Column({ type: DataType.STRING, field: 'name' })
  name: string

  @Column({ type: DataType.STRING, field: 'name_2' })
  name2: string

  @Column({ type: DataType.STRING, field: 'last_name' })
  lastName: string

  @Column({ type: DataType.STRING, field: ' last_name_2' })
  lastName2: string

  @Column({ type: DataType.STRING, field: 'address' })
  address: string

  @Column({ type: DataType.STRING(50), field: 'business_phone_number' })
  phone: string

  @Column({ type: DataType.STRING(50), field: 'website_url' })
  email: string

  @Column({ type: DataType.BOOLEAN, field: 'status' })
  status: boolean

  @Column({ type: DataType.INTEGER, field: 'user_id', allowNull: true })
  @ForeignKey(() => User)
  userId?: number

  @BelongsTo(() => User)
  user: User

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt?: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt?: Date

  @Column({ type: DataType.DATE, allowNull: true, field: 'deleted_at' })
  deletedAt?: Date
}
