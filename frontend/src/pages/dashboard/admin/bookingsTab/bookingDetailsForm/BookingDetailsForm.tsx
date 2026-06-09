import "./bookingDetailsForm.css";
import IconButton from "../../../../../components/buttons/iconButton/IconButton";
import API from "../../../../../api/axios";

interface Participant {
  bookingId: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}

interface BookingSession {
  title: string;
  category: "group" | "individual";
  description: string;
  date: string;
  startTime: string;
  price: number;
  maxParticipants: number;
  participants: Participant[];
}

interface BookingDetailsFormProps {
  session: BookingSession;
  onRemoveParticipant: (participantId: string) => void;
}

export default function BookingDetailsForm({
  session,
  onRemoveParticipant,
}: BookingDetailsFormProps) {
  return (
    <div className="booking-details">
      <h2>Hantera bokning</h2>

      <div className="booking-summary">
        <h3>{session.title}</h3>
        <p>{session.description}</p>

        <div className="summary-grid">
          <div>
            <h4>Kategori</h4>
            <p>
              {session.category === "group"
                ? "Gruppkurs"
                : "Individuell bokning"}
            </p>
          </div>

          <div>
            <h4>Datum</h4>
            <p>{new Date(session.date).toLocaleDateString("sv-SE")}</p>
          </div>

          <div>
            <h4>Tid</h4>
            <p>{session.startTime}</p>
          </div>

          <div>
            <h4>Pris</h4>
            <p>{session.price} kr</p>
          </div>

          <div>
            <h4>Platser</h4>
            <p>
              {session.participants.length} / {session.maxParticipants}
            </p>
          </div>
        </div>
      </div>

      <div className="participants-section">
        <h3>Deltagare</h3>

        {session.participants.length === 0 ? (
          <p>Inga deltagare anmälda.</p>
        ) : (
          session.participants.map((participant) => (
            <div className="participant-card" key={participant._id}>
              <div className="participant-info">
                <h4>
                  {participant.firstName} {participant.lastName}
                </h4>

                <p>{participant.email}</p>

                <div className="participant-message">
                  <label>Meddelande från kund</label>

                  <textarea
                    value={participant.message || "Inget meddelande"}
                    readOnly
                  />
                </div>
              </div>
              <div className="button-container">
                <IconButton
                  label=""
                  onClick={() => onRemoveParticipant(participant.bookingId)}
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
          ))
        )}
      </div>
    </div>
  );
}
