import { readFileSync } from 'fs'
import { Injectable } from '@nestjs/common'
import { iReminderObject } from './interfaces/reminder-object.interface'

@Injectable()
export class EmailTemplatesService {
  static _dateToUS(date: string) {
    const d = date.split('-')
    return `${d[1]}/${d[2]}/${d[0]}`
  }

  static mainSender() {
    return `${process.env.MAIL_SENDER_NAME} <${process.env.MAIL_USER}>`
    // return {
    //     "name": process.env.MAIL_SENDER_NAME || "Bloodknot",
    //     "email": process.env.MAIL_SENDER_EMAIL || "john.rohan@bloodknotapp.com"
    // }
  }

  static welcomeTemplate(result, code) {
    let mainTemplate: string = EmailTemplatesService.test()
    mainTemplate = mainTemplate.replace('%emailTitle%', 'Welcome to Bloodknot')
    mainTemplate = mainTemplate.replace(
      '%emailBody%',
      `<p>Welcome to Bloodknot</p>
                    <p>Plese use the following code to verify your account: ${code.activation_code}</p>`,
    )

    return {
      html: `<p>Welcome to Bloodknot</p>
                    <p>Plese use the following code to verify your account: ${code.activation_code}</p>`,
      text: `Welcome to Bloodknot
                    Plese use the following code to verify your account: ${code.activation_code}`,
      subject: 'Welcome to Bloodknot',
      from: EmailTemplatesService.mainSender(),
      to: result.dataValues.email,
    }
  }

  static forgotPasswordTemplate(result, code) {
    let mainTemplate: string = EmailTemplatesService.test()
    mainTemplate = mainTemplate.replace('%emailTitle%', 'Forgot Password')
    mainTemplate = mainTemplate.replace(
      '%emailBody%',
      `<p>Dear user</p>
                    <p>Please use following link to do a password reset: <a href="${process.env.APP_DOMAIN}/password/reset/${result.dataValues.email}/${code.reset_password_code}">${code.reset_password_code}</a></p>`,
    )

    return {
      html: mainTemplate,
      text: `Dear user
                    lease use following link to do a password reset: ${process.env.APP_DOMAIN}/password/reset/${result.dataValues.email}/${code.reset_password_code}`,
      subject: 'BloodKnot password request',
      from: EmailTemplatesService.mainSender(),
      to: result.dataValues.email,
    }
  }

  static boatOwnerConfirmedBooking(result) {
    if (!result.length) {
      console.log('Confiration email not sent')
      return false
    }

    const gmaps = result[0].offer_attributes.filter((n) => n[0] === 'gmaps')[0]

    let map
    if (gmaps?.length > 1) {
      try {
        map = JSON.parse(gmaps[1])
      } catch (error) {
        console.log(error)
      }
    }

    let mainTemplate: string = EmailTemplatesService.test()
    mainTemplate = mainTemplate.replace('%emailTitle%', 'Trip confirmed')
    mainTemplate = mainTemplate.replace(
      '%emailBody%',
      `<p>Get ready for your trip with ${result[0].user_attributes.filter((n) => n[0] == 'business_name')[0][1]}!</p>
                    <p>All the information needed is listed below along with the needed contact information.</p>
                    <h3>Trip details</h3>
                    <p>${EmailTemplatesService._dateToUS(result[0].booked_date.split('T')[0])} ${result[0].booked_date
        .split('T')[1]
        .replace('.000Z')}</p>
                    <p>${result[0].trip_type === 'Other' ? result[0].other : result[0].trip_type}</p>
                    <p>${result[0].trip_duration === 'FULL_DAY' ? 'Full Day' : 'Half Day'}</p>
                    <p>${result[0].passengers} passengers</p>
                    <p>${result[0].user_attributes.filter((n) => n[0] == 'business_name')[0][1]} ${
        result[0].user_attributes.filter((n) => n[0] == 'phone')[0][1]
      }</p>
                    <p>
                        <div class="half-size">
                            ${
                              map
                                ? `<a href="https://www.google.com/maps/@${map.geometry.location.lat},${map.geometry.location.lng},20z" target="_blank">
                                <img src="${process.env.APP_DOMAIN}/api/maps/places/static/public/?center=${map.formatted_address}&size=200x200&zoom=13&latlng=${map.geometry.location.lat},${map.geometry.location.lng}&API_KEY=${process.env.API_KEY}" />
                                </a>`
                                : undefined
                            }
                        </div>
                        <div class="half-size">
                            <h4>${result[0].offer_attributes.filter((n) => n[0] === 'meetingLocation')[0][1]}</h4>
                            <p>
                                <div class="half-size">
                                    <h5>List of what's included</h5>
                                    <ul style="margin:0;padding:0; list-style:none">
                                        ${result[0].offer_services
                                          .filter((n) => n[0] == 'OFFER_ITEMS')
                                          .map((item) => `<li>${item[1]}</li>`)
                                          .join(' ')}
                                    </ul>
                                </div>
                                <div class="half-size">
                                    <h5>List of what you need to bring</h5>
                                    <ul  style="margin:0;padding:0; list-style:none">
                                        ${result[0].offer_services
                                          .filter((n) => n[0] == 'CLIENT_ITEMS')
                                          .map((item) => `<li>${item[1]}</li>`)
                                          .join(' ')}
                                    </ul>
                                </div>
                            </p>
                        </div>
                    </p>`,
    )

    return {
      html: mainTemplate,
      subject: 'Bloodknot Trip Confirmed',
      from: EmailTemplatesService.mainSender(),
      to: result[0].client[0],
    }
  }

  static boatOwnerRejectedBooking(result: iReminderObject, reason, reasonText) {
    if (!result) {
      console.log('Confiration email not sent')
      return false
    }

    let mainTemplate: string = EmailTemplatesService.test()
    mainTemplate = mainTemplate.replace('%emailTitle%', 'Trip cancelled')
    mainTemplate = mainTemplate.replace(
      '%emailBody%',
      `<p>Dear ${result[0].client[1]}</p>
                    <p>You trip was cancelled!</p>
                    <h3>Trip details:</h3>
                    <p>Booked date: ${EmailTemplatesService._dateToUS(result[0].booked_date.split('T')[0])}</p>
                    <p>Trip Type: ${result[0].trip_type !== 'Others' ? result[0].trip_type : result[0].other}</p>
                    <p>Trip Length: ${result[0].trip_duration === 'FULL_DAY' ? 'Full Day' : 'Half Day'}</p>
                    <p>Number of passengers: ${result[0].passengers} </p>
                    <br />
                    <p>Reason: ${reasonText || reason} </p>
                    `,
    )

    return {
      html: mainTemplate,
      subject: 'Bloodknot Trip Cancellation',
      from: EmailTemplatesService.mainSender(),
      to: result[0].client[0],
    }
  }

  static ownerNewBookingInfo(user, offer) {
    let mainTemplate: string = EmailTemplatesService.test()
    mainTemplate = mainTemplate.replace('%emailTitle%', 'New Booking Request')
    mainTemplate = mainTemplate.replace(
      '%emailBody%',
      `
                    <h3>Trip details:</h3>
                    <p>Booked date: ${EmailTemplatesService._dateToUS(offer.date.split('T')[0])}</p>
                    <p>Trip Type: ${offer.trip_type}</p>
                    <p>Trip Length: ${offer.trip_duration === 'FULL_DAY' ? 'Full Day' : 'Half Day'}</p>
                    <p>Number of passengers: ${offer.passenger} </p>

                    <p>Passenger: ${offer.first_name} ${offer.last_name}</p>
                    <p>Phone: ${offer.phone_number}</p>
                    <p>Congratulations on receiving a new booking request! You will have 48 hours to confirm the trip.</p>
                    <p><a href="${
                      process.env.APP_DOMAIN
                    }/api/url-redirect?deeplink=new_booking" target="_blank">Open the app to see the request</a></p>`,
    )

    return {
      html: mainTemplate,
      subject: 'Bloodknow New Booking Request',
      from: EmailTemplatesService.mainSender(),
      to: user.email,
    }
  }

  static shareCalendar(client: any, user: any) {
    let mainTemplate: string = EmailTemplatesService.test()
    mainTemplate = mainTemplate.replace('%emailTitle%', 'Calendar share')
    mainTemplate = mainTemplate.replace(
      '%emailBody%',
      `
                    <p>Calendar link has been shared with you.</p>
                    <p>To see the latest offers, please open following link: <a href="${process.env.APP_DOMAIN}/user/${user.id}">Calendar</a></p>
                    <br />
                    <p>We hope, you will find trips that match your wish</p>`,
    )

    return {
      html: mainTemplate,
      subject: 'Bloodknot calendar share',
      from: EmailTemplatesService.mainSender(),
      to: client.email,
    }
  }

  static reminder24Hours(booking: iReminderObject) {
    let mainTemplate: string = EmailTemplatesService.test()
    mainTemplate = mainTemplate.replace('%emailTitle%', 'Booking reminder')
    mainTemplate = mainTemplate.replace(
      '%emailBody%',
      `
                    <p>This is a friendly nudge that you have an amazing booking request waiting for you. Don't keep the excitment waiting, make it official by taking the last step to accept it!</p>
                    <h3>Trip details</h3>
                    <p>${EmailTemplatesService._dateToUS(booking.booked_date.split('T')[0])}</p>
                    <p>${booking.trip_type !== 'Other' ? booking.trip_type : booking.other}</p>
                    <p>${booking.trip_duration === 'FULL_DAY' ? 'Full Day' : 'Half Day'}</p>
                    <p>Passengers: ${booking.passengers} </p>

                    <p>Booked by: ${booking.client[1]} ${booking.client[2]}</p>
                    <p>Phone: ${booking.client[3]}</p>

                    <p><a href="${
                      process.env.APP_DOMAIN
                    }/api/url-redirect?deeplink=reminder" target="_blank">Open the app to see the request</a></p>
                    `,
    )
    return {
      html: mainTemplate,
      subject: 'Bloodknot Booking Reminder',
      from: EmailTemplatesService.mainSender(),
      to: booking.email,
    }
  }

  static notifyBoatOwnerForRefund(booking: iReminderObject) {
    let mainTemplate: string = EmailTemplatesService.test()
    mainTemplate = mainTemplate.replace('%emailTitle%', 'Booking succesfully cancelled')
    mainTemplate = mainTemplate.replace(
      '%emailBody%',
      `
                    <p>The booking was successfully cancelled. <b>Please don't forget to process the refund to the client if applicable!</b></p>
                    <h3>Trip details</h3>
                    <p>${EmailTemplatesService._dateToUS(booking.booked_date.split('T')[0])}</p>
                    <p>${booking.trip_type !== 'Other' ? booking.trip_type : booking.other}</p>
                    <p>${booking.trip_duration === 'FULL_DAY' ? 'Full Day' : 'Half Day'}</p>
                    <p>Passengers: ${booking.passengers} </p>

                    <p>Booked by: ${booking.client[1]} ${booking.client[2]}</p>
                    <p>Phone: ${booking.client[3]}</p>

                    <p><b>Refunds are made manually through Stripe</b></p>
                    <p>In transactions search for: <b>${booking.stripe_id}</b> to refund this transaction. </p>
                    `,
    )
    return {
      html: mainTemplate,
      subject: 'Bloodknot Booking Cancellation',
      from: EmailTemplatesService.mainSender(),
      to: booking.email,
    }
  }

  static errorTemplate(isFatal: any, name: any, message: any) {
    return {
      html: `<p>New error</p>
                    <p>Fatal: ${isFatal}</p>
                    <p>Name: ${name}</p>
                    <br />
                    <p>${message}</p>`,
      text: ``,
      subject: 'BloodKnot error',
      from: EmailTemplatesService.mainSender(),
      to: 'gigo.j44@gmail.com',
    }
  }

  static test() {
    try {
      const path = `templates/emails/test.html`

      const template = readFileSync(`${path}`, {
        encoding: 'utf-8',
      }).toString()
      if (template.length) return template

      throw new Error('Template not found')
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
