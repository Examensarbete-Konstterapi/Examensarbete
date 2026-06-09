import "./bookingCard.css";
import { type Booking } from "../BookingTab";
import RegularButton from "../../../../../components/buttons/regularButton/RegularButton";

type BookingCardProps = {
  booking: Booking;
  isHistory: boolean;
  onCancel: (booking: Booking) => void;
};

export function BookingCard({
  booking,
  isHistory,
  onCancel,
}: BookingCardProps) {
  const formattedDate = new Date(booking.sessionId.date).toLocaleDateString(
    "sv-SE",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <article className="booking-card">
      <h3>{booking.sessionId.courseId.title}</h3>
      <div className="booking-card-content">
        <div className="booking-time-info">
          <p>Datum: {formattedDate}</p>
          <p>Tid: {booking.sessionId.startTime}</p>
          {booking.message && <p>Meddelande: {booking.message}</p>}
        </div>
        <div className="booking-card-options">
          <p>{booking.sessionId.courseId.price}</p>
          {!isHistory && (
            <RegularButton
              label="Avboka"
              color="red"
              size="xs"
              onClick={() => onCancel(booking)}
            />
          )}
        </div>
      </div>
    </article>
  );
}
