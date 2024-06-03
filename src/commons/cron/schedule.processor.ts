import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron } from '@nestjs/schedule'
import { Op } from 'sequelize'
import { Bookings } from 'src/commons/entities/bookings.entity'
import { Unverified_Bank_Account } from 'src/commons/entities/unverified_bank_accounts'
//import { Users } from 'src/entities/users.entity'
import { BookingStatus } from 'src/commons/interfaces/payments.interface'
import { EmailTemplatesService } from 'src/commons/providers/email-templates/email-templates.service'
//import { UserAttributes } from 'src/modules/user-attributes/entities/userAttributes.entity'

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name)

  constructor(
    private _cs: ConfigService,

  ) {}
}
