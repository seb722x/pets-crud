import { ConfigService } from '@nestjs/config'
import { Sequelize } from 'sequelize-typescript'

import { Bookings } from 'src/commons/entities/bookings.entity'
import { Bookings_Rejection } from 'src/commons/entities/booking_rejections.entity'
import { Bookings_Transactions } from 'src/commons/entities/booking_transactions.entity'
import { Clients } from 'src/commons/entities/clients.entity'
import { Payouts } from 'src/commons/entities/payouts.entity'
import { Unverified_Bank_Account } from 'src/commons/entities/unverified_bank_accounts'
import { UserDaysOff } from 'src/commons/entities/userDaysOff.entity'

//TODO migrations
import * as createFullYearUpdateFunction from 'src/database/migrations/20240405-create-full-year-update-function'
//NewEntities

import { User } from 'src/modules/users/entities/users.entity'
import { SEQUELIZE } from 'src/commons/constants/db.constants'
import { IDatabaseConfigAttributes } from './interfaces/db-config.interface'
import { Dialect } from 'sequelize'
import { Role } from 'src/modules/roles/entities/roles.entity'
import { Profile } from 'src/modules/profile/entities/profile.entity'
import { Log } from 'src/modules/log/entities/log.entity'


export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const config: IDatabaseConfigAttributes = {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
        logging: false,
      }

      const sequelize = new Sequelize(config)

      sequelize.addModels([
        User,
        Profile,
        Role,
        Log,
      
      ])

      //await sequelize.sync()
      return sequelize
    },
  },
]
