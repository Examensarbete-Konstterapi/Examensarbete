import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./booking.css";
import Layout from "../../components/layout/Layout";
import RegularButton from "../../components/buttons/regularButton/RegularButton";
import { MiniHeroSection } from "../../components/miniHeroSection/MiniHeroSection";
import Modal from "../../components/modal/Modal";
import Login from "../login/Login";
import Register from "../register/Register";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
// import ConfirmModal from "../../components/confirmModal/ConfirmModal";

type BookingForm = {
  category: string;
  courseId: string;
  sessionId: string;
  date: string;
  message: string;
};

type Session = {
  _id: string;
  date: string;
  startTime: string;
  maxParticipants: number;
  bookedParticipants: number;
  isFull: boolean;
  courseId: {
    _id: string;
    title: string;
    price: number;
    category: string;
    description: string;
  };
};

export function Booking() {
  const navigate = useNavigate();
  const [pendingBooking, setPendingBooking] = useState<BookingForm | null>(
    null,
  );
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);
  const { isLoggedIn } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingForm>();

  const selectedCourseId = watch("courseId");
  const selectedDate = watch("date");
  const selectedCategory = watch("category");

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await API.get("/sessions");
        setSessions(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSessions();
  }, []);

  function onSubmit(data: BookingForm) {
    setPendingBooking(data);
    setConfirmModalOpen(true);
  }

  const courses = Array.from(
    new Map(
      sessions.map((session) => [session.courseId._id, session.courseId]),
    ).values(),
  );

  const filteredCourses = courses.filter(
    (course) => course.category === selectedCategory,
  );

  const filteredDates = sessions.filter(
    (session) => session.courseId._id === selectedCourseId,
  );

  const uniqueDates = [
    ...new Set(
      filteredDates.map((session) =>
        new Date(session.date).toLocaleDateString("sv-SE"),
      ),
    ),
  ];

  const filteredTimes = sessions.filter(
    (session) =>
      session.courseId._id === selectedCourseId &&
      new Date(session.date).toLocaleDateString("sv-SE") === selectedDate,
  );

  const selectedCourse = courses.find(
    (course) => course._id === selectedCourseId,
  );

  const selectedSession = sessions.find(
    (session) => session._id === pendingBooking?.sessionId,
  );
  async function handleConfirmBooking() {
    if (!pendingBooking) return;

    try {
      await API.post("/bookings", {
        sessionId: pendingBooking.sessionId,
        message: pendingBooking.message,
      });
      reset();
      setConfirmModalOpen(false);
      setSuccessModalOpen(true);
    } catch (error) {
      console.error(error);
      setConfirmModalOpen(false);
    }
  }

  return (
    <>
      <MiniHeroSection
        title="Boka tid"
        subtitle="Ta det första steget mot förändring. Fyll i formuläret så återkommer jag till dig."
      />
      <Layout>
        <main className="booking-page">
          <section className="booking-content">
            <aside className="booking-info">
              <div className="aside-menu">
                <h3>Så går det till</h3>
                <div className="steps">
                  <div className="step">
                    <span>1</span>
                    <p>Välj en ledig tid.</p>
                  </div>

                  <div className="step">
                    <span>2</span>
                    <p>Skicka din bokning.</p>
                  </div>

                  <div className="step">
                    <span>3</span>
                    <p>Du får en bekräftelse.</p>
                  </div>
                </div>
              </div>
              <div className="aside-menu">
                <h3>Första samtalet</h3>
                <p>
                  Det första samtalet är alltid kostnadsfritt. Vi pratar om dina
                  behov och ser om konstterapi känns rätt för dig. Inga
                  förpliktelser – bara en möjlighet att lära känna varandra.
                </p>
              </div>
              <div className="aside-menu">
                <h3>Avbokning</h3>
                <p>
                  Avbokning ska ske senast 24 timmar innan bokad tid. Vid senare
                  avbokning debiteras hela sessionen.
                </p>
              </div>
            </aside>

            <div className="booking-forms">
              {!isLoggedIn ? (
                <form className="booking-form">
                  <h2>Logga in</h2>
                  <div className="booking-form-text">
                    <p>För att boka en tid behöver du vara inloggad.</p>
                    <p>
                      Har du inget konto ännu? Registrera dig gratis för att
                      kunna boka och hantera dina tider.
                    </p>
                  </div>
                  <div className="buttons">
                    <RegularButton
                      label="Logga in"
                      size="lg"
                      color="green"
                      type="button"
                      onClick={() => setModalType("login")}
                    />
                    <RegularButton
                      label="Registrera dig"
                      size="lg"
                      color="green"
                      type="button"
                      onClick={() => setModalType("register")}
                    />
                  </div>
                </form>
              ) : (
                <form
                  className="booking-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h2>Välj tid och typ av session</h2>
                  <label>
                    Välj typ kurs
                    <select {...register("category")}>
                      <option value="">Välj typ</option>
                      <option value="individual">Individuell terapi</option>
                      <option value="group">Gruppterapi</option>
                    </select>
                    {errors.courseId && <span>{errors.courseId.message}</span>}
                  </label>
                  <label>
                    Välj kurs
                    <select
                      {...register("courseId", {
                        required: "Välj kurs",
                      })}
                    >
                      <option value="">Välj kurs</option>

                      {filteredCourses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    {errors.courseId && <span>{errors.courseId.message}</span>}
                  </label>
                  {selectedCourse && (
                    <div className="price-box">
                      <h3>Pris</h3>
                      <p>{selectedCourse.price} kr</p>
                    </div>
                  )}
                  <label>
                    Välj datum
                    <select
                      {...register("date", {
                        required: "Välj datum",
                      })}
                    >
                      <option value="">Välj datum</option>

                      {uniqueDates.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                    {errors.sessionId && (
                      <span>{errors.sessionId.message}</span>
                    )}
                  </label>
                  <label>
                    Välj tid
                    <select
                      {...register("sessionId", {
                        required: "Välj tid",
                      })}
                    >
                      <option value="">Välj tid</option>

                      {filteredTimes.map((session) => (
                        <option
                          key={session._id}
                          value={session._id}
                          disabled={session.isFull}
                        >
                          {session.startTime}{" "}
                          {session.courseId.category === "group" &&
                            ` (${session.bookedParticipants} av ${session.maxParticipants} platser bokade)`}
                          {session.isFull ? " - Fullbokad" : ""}
                        </option>
                      ))}
                    </select>
                    {errors.sessionId && (
                      <span>{errors.sessionId.message}</span>
                    )}
                  </label>

                  <label>
                    Meddelande
                    <textarea rows={4} {...register("message")} />
                  </label>

                  <RegularButton
                    onClick={() => {}}
                    label="Boka tid"
                    size="lg"
                    color="green"
                    type="submit"
                  />
                </form>
              )}
            </div>
          </section>
        </main>
        <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
          {modalType === "login" && (
            <Login
              onSwitchToRegister={() => setModalType("register")}
              onClose={() => setModalType(null)}
            />
          )}

          {modalType === "register" && (
            <Register
              onSwitchToLogin={() => setModalType("login")}
              onClose={() => setModalType(null)}
            />
          )}
        </Modal>
        {/* Bekräfta bokning */}
        <Modal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
        >
          <div className="booking-confirm-modal">
            <h2>Bekräfta bokning</h2>
            <div className="booking-confirm-modal-info ">
              <p>Kurs: {selectedSession?.courseId.title}</p>
              <p>
                Datum:{" "}
                {selectedSession &&
                  new Date(selectedSession.date).toLocaleDateString("sv-SE")}
              </p>
              <p>Tid: {selectedSession?.startTime}</p>
              <p>Pris: {selectedSession?.courseId.price} kr</p>
              {pendingBooking?.message && (
                <p>Meddelande: {pendingBooking.message}</p>
              )}
            </div>
            <div className="booking-confirm-buttons">
              <RegularButton
                label="Ja, boka"
                color="green"
                size="xs"
                onClick={handleConfirmBooking}
              />
              <RegularButton
                label="Avbryt"
                color="red"
                size="xs"
                onClick={() => setConfirmModalOpen(false)}
              />
            </div>
          </div>
        </Modal>

        {/* Bokning skapad */}
        <Modal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
        >
          <div className="booking-success-modal">
            <h2>Bokning skapad!</h2>
            <p>
              Din bokning har registrerats och du hittar den under Mina sidor.
            </p>
            <RegularButton
              label="Till Mina sidor"
              color="green"
              size="sm"
              onClick={() => navigate("/mina-sidor")}
            />
          </div>
        </Modal>
      </Layout>
    </>
  );
}
