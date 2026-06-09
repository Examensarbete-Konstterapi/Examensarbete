import "./bookingTab.css";
import { useState, useEffect } from "react";
import API from "../../../../api/axios";
import { BookingCard } from "./bookingCard/BookingCard";
import Modal from "../../../../components/modal/Modal";
import RegularButton from "../../../../components/buttons/regularButton/RegularButton";

export interface Booking {
  _id: string;
  message?: string;

  sessionId: {
    _id: string;
    date: string;
    startTime: string;

    courseId: {
      _id: string;
      title: string;
      category: "group" | "individual";
      price: number;
    };
  };
}

export function BookingTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">(
    "upcoming",
  );
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // async function fetchBookings() {
  //   try {
  //     const response = await API.get("/bookings/my-bookings");

  //     setBookings(response.data);
  //     setLoading(false);
  //   } catch (error: any) {
  //     setError("Kunde inte hämta bokningar");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.sessionId.date) > new Date(),
  );
  const historyBookings = bookings.filter(
    (booking) => new Date(booking.sessionId.date) <= new Date(),
  );
  const displayedBookings =
    activeTab === "upcoming" ? upcomingBookings : historyBookings;

  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await API.get("/bookings/my-bookings");
        console.log(response.data);
        setBookings(response.data);
      } catch {
        setError("Kunde inte hämta bokningar");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  function handleOpenCancelModal(booking: Booking) {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  }

  async function handleDeleteBooking() {
    if (!selectedBooking) return;

    try {
      await API.delete(`/bookings/${selectedBooking._id}`);

      setBookings((prev) =>
        prev.filter((booking) => booking._id !== selectedBooking._id),
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <p>Laddar bokningar...</p>;

  return (
    <>
      <h2>Mina bokningar</h2>
      <div className="booking-tab-section">
        <div className="booking-tab-tabs">
          <button onClick={() => setActiveTab("upcoming")}>
            Kommande ({upcomingBookings.length})
          </button>

          <button onClick={() => setActiveTab("history")}>
            Historik ({historyBookings.length})
          </button>
        </div>
        <div>
          {error && <p>{error}</p>}
          {displayedBookings.length === 0 && (
            <p>
              {activeTab === "upcoming"
                ? "Du har inga kommande bokningar"
                : "Du har inga tidigare bokningar"}
            </p>
          )}
          {displayedBookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              isHistory={activeTab === "history"}
              onCancel={handleOpenCancelModal}
            />
          ))}
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="booking-tab-modal-cancel">
            <h3>Bekräfta avbokning</h3>
            <p>Är du säker på att du vill avboka denna session?</p>
            <div className="booking-tab-modal-buttons">
              <RegularButton
                label="Ja, avboka"
                color="red"
                size="xs"
                onClick={handleDeleteBooking}
              />
              <RegularButton
                label="Avbryt"
                color="light"
                size="xs"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
