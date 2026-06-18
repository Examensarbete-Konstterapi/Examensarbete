import "./bookingsTab.css";
import IconButton from "../../../../components/buttons/iconButton/IconButton";
import Modal from "../../../../components/modal/Modal";
import ConfirmModal from "../../../../components/confirmModal/ConfirmModal";
import API from "../../../../api/axios";
import { useEffect, useState } from "react";
import BookingDetailsForm from "./bookingDetailsForm/BookingDetailsForm";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const response = await API.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadBookings = async () => {
      await fetchBookings();
    };

    loadBookings();
  }, []);

  async function handleDeleteSession(sessionId: string) {
    try {
      await API.delete(`/sessions/${sessionId}`);

      setBookings((prev) =>
        prev.filter((booking) => booking.sessionId._id !== sessionId),
      );
    } catch (error) {
      console.error(error);
      alert("Kunde inte ta bort kurstillfället");
    }
  }

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

      acc[sessionId].participants.push({
        bookingId: booking._id,
        ...booking.userId,
        message: booking.message,
      });

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
          <div className="booking-card" key={session.sessionId}>
            <div className="booking-info">
              <div>
                <h4>{session.title}</h4>
                <p>
                  {session.description.length > 50
                    ? session.description.slice(0, 50) + "..."
                    : session.description}
                </p>
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
                  {session.category === "group"
                    ? `${session.participants.length} / ${session.maxParticipants} deltagare`
                    : `${session.participants[0]?.firstName} ${session.participants[0]?.lastName}`}
                </p>
              </div>

              <div>
                <p>{session.price} kr</p>
              </div>

              <div className="booking-actions">
                <IconButton
                  label=""
                  onClick={() => {
                    setShowModal(true);
                    setSelectedSession(session);
                  }}
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
                  onClick={() => {
                    setSessionToDelete(session.sessionId);
                    setShowDeleteModal(true);
                  }}
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
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedSession(null);
        }}
      >
        {selectedSession && (
          <BookingDetailsForm
            session={selectedSession}
            onClose={() => {
              setShowModal(false);
              setSelectedSession(null);
            }}
            refreshBookings={fetchBookings}
          />
        )}
      </Modal>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Ta bort kurstillfälle"
        message="Alla bokningar för detta tillfälle kommer också att tas bort."
        confirmText="Radera"
        cancelText="Avbryt"
        size="md"
        onCancel={() => {
          setShowDeleteModal(false);
          setSessionToDelete(null);
        }}
        onConfirm={async () => {
          if (!sessionToDelete) return;

          await handleDeleteSession(sessionToDelete);

          setShowDeleteModal(false);
          setSessionToDelete(null);
        }}
      />
    </div>
  );
}
