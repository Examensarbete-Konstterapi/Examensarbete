import "./bookingsTab.css";
import IconButton from "../../../../components/buttons/iconButton/IconButton";
import API from "../../../../api/axios";
import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  message?: string;
  createdAt: string;

  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  sessionId: {
    _id: string;
    date: string;
    startTime: string;
    maxParticipants: number;

    courseId: {
      _id: string;
      title: string;
      category: "group" | "individual";
      price: number
    };
  };
}

export function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await API.get(`/bookings`);
        console.log(response);
        setBookings(response.data);
      } catch (error) {
        console.error("Kunde inte hämta kurser:", error);
        return [];
      }
    }
    fetchBookings();
  }, []);

  const groupedSessions = Object.values(
    bookings.reduce((acc: any, booking: any) => {
      const session = booking.sessionId;
      const sessionId = session._id;

      if (!acc[sessionId]) {
        acc[sessionId] = {
          sessionId,
          title: session.courseId.title,
          category: session.courseId.category,
          price: session.courseId.price,
          date: session.date,
          startTime: session.startTime,
          maxParticipants: session.maxParticipants,
          participants: [],
        };
      }

      acc[sessionId].participants.push(booking.userId);

      return acc;
    }, {}),
  );

  return (
    <div className="admin-bookings">
      <div className="bookings-heading">
        <h2>Hantera bokningar</h2>
      </div>

      <div className="bookings-list">
        <div className="booking-list-heading">
          <h3>Tjänst</h3>
          <h3>Datum</h3>
          <h3>Pris</h3>
          <h3>Bokningar</h3>
          <h3>Åtgärder</h3>
        </div>

        {groupedSessions.map((session: any) => (
          <div className="booking-card" key={session._id}>
            <div className="booking-info">
              <div>
                <h4>{session.title}</h4>
                <p>
                  {session.category === "group"
                    ? "Gruppkurs"
                    : "Individuell bokning"}
                </p>
              </div>

              <div>
                <p>{new Date(session.date).toLocaleDateString("sv-SE")}</p>
                <p>{session.startTime}</p>
              </div>

              <div>
                <p>{session.courseId.price}</p>
              </div>

              <div>
                <p>
                  {/* {booking.sessionId.courseId.category === "group"
                    ? `${booking.sessionId.maxParticipants} platser`
                    : `${booking.userId.firstName} ${booking.userId.lastName}`} */}
                  {session.category === "group"
                    ? `${session.participants.length} / ${session.maxParticipants} deltagare`
                    : `${session.participants[0]?.firstName} ${session.participants[0]?.lastName}`}
                </p>
              </div>

              <div className="booking-actions">
                <IconButton
                  label=""
                  onClick={() => console.log("Visa bokning")}
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke="#597059"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#597059"
                        strokeWidth="2"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
