export interface iReminderObject {
  client_id: number
  booking_id: number
  stripe_id: any
  trip_duration: string
  booked_date: string
  trip_type: string
  passengers: number
  other: string | null
  client: Array<string> //['email', 'fistname', 'lastname', '+phone'],
  email: string
  offer_services: Array<Array<string | null>> //['OFFER_ITEMS', 'Tackle & Gear', null], ['CLIENT_ITEMS', 'Waterproof Containers', null],
}
