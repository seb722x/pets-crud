import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Unique,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  HasMany,
} from 'sequelize-typescript'
import { User } from 'src/modules/users/entities/users.entity'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @ApiProperty()
  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @ApiProperty()
  @AllowNull(false)
  @Column
  name: string

  @ApiProperty()
  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  default: boolean

  @ApiProperty()
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  status: boolean

  @HasMany(() => User)
  users: User[]

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt?: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt?: Date

  @Column({ type: DataType.DATE, allowNull: true, field: 'deleted_at' })
  deletedAt?: Date
}
