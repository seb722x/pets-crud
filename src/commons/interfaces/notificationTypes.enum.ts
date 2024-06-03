export enum NotificationTypes {
  NEW_BOOKING = 'new_booking',
  UPCOMING_BOOKING = 'upcoming_booking',
}

export interface BookingBodyNotification {
  booking_id: string
  type: string
  offer_id: number
  tripTypeId: string | number
  trip_type: string
  client: any
  booked_date: string
}
