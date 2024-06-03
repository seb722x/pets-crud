import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Unique,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript'
import { Profile } from 'src/modules/profile/entities/profile.entity'
import { Role } from 'src/modules/roles/entities/roles.entity'

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @Unique
  @Column({ type: DataType.STRING, field: 'user_id' })
  userId: string

  @Column({ type: DataType.STRING, allowNull: false })
  email: string

  @Column({ type: DataType.INTEGER, field: 'role_id', allowNull: true })
  @ForeignKey(() => Role)
  roleId?: number

  @Column({ type: DataType.BOOLEAN, field: 'status', allowNull: true, defaultValue: true})
  status?: boolean

  @BelongsTo(() => Role)
  role?: Role

  @HasMany(() => Profile)
  profiles: Profile[]

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt?: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt?: Date

  @Column({ type: DataType.DATE, allowNull: true, field: 'deleted_at' })
  deletedAt?: Date
}
