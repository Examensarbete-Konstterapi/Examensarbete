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
      price: number;
      description: string;
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
          description: session.courseId.description,
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
          <h3>Kurs</h3>
          <h3>Kategori</h3>
          <h3>Datum</h3>
          <h3>Bokningar</h3>
          <h3>Pris</h3>
          <h3>Åtgärder</h3>
        </div>

        {groupedSessions.map((session: any) => (
          <div className="booking-card" key={session._id}>
            <div className="booking-info">
              <div>
                <h4>{session.title}</h4>
                <p>{session.description}</p>
              </div>

              <div>
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
                <p>
                  {/* {booking.sessionId.courseId.category === "group"
                    ? `${booking.sessionId.maxParticipants} platser`
                    : `${booking.userId.firstName} ${booking.userId.lastName}`} */}
                  {session.category === "group"
                    ? `${session.participants.length} / ${session.maxParticipants} deltagare`
                    : `${session.participants[0]?.firstName} ${session.participants[0]?.lastName}`}
                </p>
              </div>

              <div>
                <p>{session.price} kr</p>
              </div>

              <div className="booking-actions">
                {/* <IconButton
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
                /> */}
                <IconButton
                  label=""
                  onClick={() => {}}
                  icon={
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M11 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13"
                          stroke="#597059"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M9.5 11.5L17.5 3.5C18.3284 2.67157 19.6716 2.67157 20.5 3.5C21.3284 4.32843 21.3284 5.67157 20.5 6.5L12.5 14.5L8 16L9.5 11.5Z"
                          stroke="#597059"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  }
                />
                <IconButton
                  label=""
                  onClick={() => {}}
                  icon={
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"
                          stroke="#d32f2f"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M14 11V17"
                          stroke="#d32f2f"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M10 11V17"
                          stroke="#d32f2f"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
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
