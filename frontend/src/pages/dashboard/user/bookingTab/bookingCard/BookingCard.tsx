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
    <article className="user-booking-card">
      <div className="user-booking-card-content">
        <div className="user-booking-time-info">
          <h3>
            {booking.sessionId.courseId.title.charAt(0).toUpperCase() +
              booking.sessionId.courseId.title.slice(1).toLowerCase()}
          </h3>
          <p>
            <svg
              fill="#597059"
              width="18px"
              height="18px"
              viewBox="0 0 35 35"
              data-name="Layer 2"
              id="a866a81f-2948-4418-8bd5-1a5193c5f74e"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M29.545,34.75H5.455a5.211,5.211,0,0,1-5.2-5.2V8.56a5.21,5.21,0,0,1,5.205-5.2h24.09a5.21,5.21,0,0,1,5.2,5.205V29.545A5.211,5.211,0,0,1,29.545,34.75ZM5.455,5.855A2.708,2.708,0,0,0,2.75,8.56V29.545a2.709,2.709,0,0,0,2.705,2.7h24.09a2.708,2.708,0,0,0,2.7-2.7V8.56a2.707,2.707,0,0,0-2.7-2.7Z"></path>
                <path d="M33.5,17.331H1.541a1.25,1.25,0,0,1,0-2.5H33.5a1.25,1.25,0,0,1,0,2.5Z"></path>
                <path d="M9.459,9.155a1.249,1.249,0,0,1-1.25-1.25V1.5a1.25,1.25,0,0,1,2.5,0V7.905A1.25,1.25,0,0,1,9.459,9.155Z"></path>
                <path d="M25.542,9.155a1.249,1.249,0,0,1-1.25-1.25V1.5a1.25,1.25,0,0,1,2.5,0V7.905A1.25,1.25,0,0,1,25.542,9.155Z"></path>
              </g>
            </svg>{" "}
            {formattedDate.charAt(0).toUpperCase() +
              formattedDate.slice(1).toLowerCase()}
          </p>
          <p>
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              stroke-width="5"
              stroke="#597059"
              fill="none"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <circle cx="32" cy="32" r="25.3"></circle>
                <polyline points="32 11.88 32 32.77 43.22 41.38"></polyline>
              </g>
            </svg>
            {booking.sessionId.startTime}
          </p>
          <p>
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              fill="none"
              stroke="#597059"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="2"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <circle cx="5" cy="9" r="2.25"></circle>
                <circle cx="11" cy="4" r="2.25"></circle>
                <path d="m7.75 9.25c0-1 .75-3 3.25-3s3.25 2 3.25 3m-12.5 5c0-1 .75-3 3.25-3s3.25 2 3.25 3"></path>
              </g>
            </svg>{" "}
            {booking.sessionId.courseId.category.charAt(0).toUpperCase() +
              booking.sessionId.courseId.category.slice(1).toLowerCase()}
          </p>
          <p className="booking-description">
            {booking.sessionId.courseId.description}
          </p>
        </div>
        <div className="user-booking-card-options">
          <p>{booking.sessionId.courseId.price} kr</p>
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
