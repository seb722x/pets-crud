import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app'
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api'
import { EmailTemplatesService } from '../email-templates/email-templates.service'
import { BookingBodyNotification, NotificationTypes } from 'src/commons/interfaces/notificationTypes.enum'

@Injectable()
export class FirebaseAdminService {
  firebase = admin

  constructor() {
    if (!this.firebase.apps.length)
      this.firebase.initializeApp({
        credential: applicationDefault(),
      })

    //console.log(this.firebase)
  }

  private async _sendMessage(to: Array<string>, body: MessagingPayload) {
    return this.firebase
      .messaging()
      .sendToDevice(to, body, { timeToLive: 3 * 24 * 60 * 60 })
      .catch((error) => {
        console.log(error)
        return false
      })
      .then((result) => {
        return result
      })
  }

  async sendBookingNotification(user_data, data: BookingBodyNotification) {
    const to = user_data?.map((item) => item.dataValues.attr_value)
    const body: MessagingPayload = {
      notification: {
        title: 'Booking Request',
        body: `${data.client.first_name} would like to book a ${
          data.trip_type
        } trip on ${EmailTemplatesService._dateToUS(data.booked_date.split('T')[0])}`,
      },
      data: {
        booking_id: data.booking_id.toString(),
        client: JSON.stringify(data.client),
        trip_type_duration: data.type.toString(),
        trip_type: data.trip_type.toString(),
        trip_type_id: data.tripTypeId.toString(),
        type: NotificationTypes.NEW_BOOKING,
        version: 'v1',
        message: 'Payment completed. Pending on your decision',
      },
    }

    return this._sendMessage(to, body)
  }
}
