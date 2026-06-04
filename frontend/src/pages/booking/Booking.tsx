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

type BookingForm = {
  courseId: string;
  sessionId: string;
};

type Session = {
  _id: string;
  date: string;
  courseId: {
    _id: string;
    title: string;
  };
};

export function Booking() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);

  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingForm>();

  const selectedCourseId = watch("courseId");

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

  async function onSubmit(data: BookingForm) {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/bookings",
        {
          sessionId: data.sessionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Bokning skapad!");
    } catch (error) {
      console.error(error);
      alert("Något gick fel");
    }
  }

  const courses = Array.from(
    new Map(
      sessions.map((session) => [session.courseId._id, session.courseId]),
    ).values(),
  );

  const filteredSessions = sessions.filter(
    (session) => session.courseId._id === selectedCourseId,
  );

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
              {!token ? (
                <form className="booking-form">
                  <h2>Boka tid</h2>
                  <p>För att boka en tid behöver du vara inloggad.</p>
                  <p>
                    Har du inget konto ännu? Registrera dig gratis för att kunna
                    boka och hantera dina tider.
                  </p>
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
                    Välj kurs
                    <select
                      {...register("courseId", {
                        required: "Välj kurs",
                      })}
                    >
                      <option value="">Välj kurs</option>

                      {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    {errors.courseId && <span>{errors.courseId.message}</span>}
                  </label>
                  <label>
                    Välj datum
                    <select
                      {...register("sessionId", {
                        required: "Välj datum",
                      })}
                    >
                      <option value="">Välj datum</option>

                      {filteredSessions.map((session) => (
                        <option key={session._id} value={session._id}>
                          {new Date(session.date).toLocaleDateString("sv-SE")}
                        </option>
                      ))}
                    </select>
                    {errors.sessionId && (
                      <span>{errors.sessionId.message}</span>
                    )}
                  </label>

                  {/* <label>
                  Meddelande
                  <textarea
                    name="message"
                    rows={4}
                   
                  />
                </label> */}

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
            <Login onSwitchToRegister={() => setModalType("register")} />
          )}

          {modalType === "register" && (
            <Register onSwitchToLogin={() => setModalType("login")} />
          )}
        </Modal>
      </Layout>
    </>
  );
}
