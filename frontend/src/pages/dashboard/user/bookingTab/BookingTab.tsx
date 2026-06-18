import "./bookingTab.css";
import { useState, useEffect } from "react";
import API from "../../../../api/axios";
import { BookingCard } from "./bookingCard/BookingCard";
import ConfirmModal from "../../../../components/confirmModal/ConfirmModal";

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
      description: string;
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
        setBookings(response.data);
      } catch {
        setError("Något gick fel. Försök igen senare.");
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
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Mina bokningar</h2>
      <div className="user-booking-tab-section">
        <div className="booking-tab-tabs">
          <button
            className={activeTab === "upcoming" ? "active" : ""}
            onClick={() => setActiveTab("upcoming")}
          >
            Kommande ({upcomingBookings.length})
          </button>

          <button
            className={activeTab === "history" ? "active" : ""}
            onClick={() => setActiveTab("history")}
          >
            Historik ({historyBookings.length})
          </button>
        </div>
        <div className="booking-tab-info">
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
        <ConfirmModal
          isOpen={isModalOpen}
          title={"Bekräfta avbokning"}
          message="Är du säker på att du vill avboka denna session?"
          confirmText="Ja, avboka"
          cancelText="Avbryt"
          onConfirm={handleDeleteBooking}
          onCancel={() => setIsModalOpen(false)}
          size="md"
        />
      </div>
    </>
  );
}
