import "./myPages.css";
import Layout from "../../../components/layout/Layout";
import { MiniHeroSection } from "../../../components/miniHeroSection/MiniHeroSection";
// import RegularButton from "../../../components/buttons/regularButton/RegularButton";
import IconButton from "../../../components/buttons/iconButton/IconButton";
import { useAuth } from "../../../context/useAuth";
import { useState } from "react";
import ProfileTab from "./profileTab/ProfileTab";
import { BookingTab } from "./bookingTab/BookingTab";
import { ChangePassword } from "./profileTab/changePassword/ChangePassword";
import Spinner from "../../../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";

export function MyPages() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "bookings" | "courses"
  >("profile");
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setLoading(true);
    logout();
    navigate("/")
  }

  return (
    <>
      <MiniHeroSection
        title="Mina Sidor"
        subtitle={
          user ? `Välkommen ${user.firstName} ${user.lastName}!` : "Välkommen!"
        }
      />
      <Layout>
        <section className="my-pages-section">
          <div className="menu">
            <IconButton
              onClick={() => setActiveTab("profile")}
              active={activeTab === "profile"}
              label="Min profil"
              icon={
                <svg
                  width="18px"
                  height="18px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="3.2"
                  stroke={activeTab === "profile" ? "#fef1eb" : "#597059"}
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <circle cx="32" cy="18.14" r="11.14"></circle>
                    <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"></path>
                  </g>
                </svg>
              }
            />
            <IconButton
              onClick={() => setActiveTab("bookings")}
              active={activeTab === "bookings"}
              label="Mina bokningar"
              icon={
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="3.2"
                  stroke={activeTab === "bookings" ? "#fef1eb" : "#597059"}
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M48.5,24.5H15.5c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h33c2.2,0,4-1.8,4-4v-24C52.5,26.3,50.7,24.5,48.5,24.5z"></path>
                    <path d="M15.5,16h33c1.7,0,3,1.3,3,3v6H12.5V19C12.5,17.3,13.8,16,15.5,16z"></path>
                  </g>
                </svg>
              }
            />
            <IconButton
              onClick={() => setActiveTab("courses")}
              active={activeTab === "courses"}
              label="Mina kurser"
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
                    <g id="Interface / Book_Open">
                      <path
                        id="Vector"
                        d="M12 9.7998V19.9998M12 9.7998C12 8.11965 12 7.27992 12.327 6.63818C12.6146 6.0737 13.0732 5.6146 13.6377 5.32698C14.2794 5 15.1196 5 16.7998 5H19.3998C19.9599 5 20.2401 5 20.454 5.10899C20.6422 5.20487 20.7948 5.35774 20.8906 5.5459C20.9996 5.75981 21 6.04004 21 6.6001V15.4001C21 15.9601 20.9996 16.2398 20.8906 16.4537C20.7948 16.6419 20.6425 16.7952 20.4543 16.8911C20.2406 17 19.961 17 19.402 17H16.5693C15.6301 17 15.1597 17 14.7334 17.1295C14.356 17.2441 14.0057 17.4317 13.701 17.6821C13.3568 17.965 13.096 18.3557 12.575 19.1372L12 19.9998M12 9.7998C12 8.11965 11.9998 7.27992 11.6729 6.63818C11.3852 6.0737 10.9263 5.6146 10.3618 5.32698C9.72004 5 8.87977 5 7.19961 5H4.59961C4.03956 5 3.75981 5 3.5459 5.10899C3.35774 5.20487 3.20487 5.35774 3.10899 5.5459C3 5.75981 3 6.04004 3 6.6001V15.4001C3 15.9601 3 16.2398 3.10899 16.4537C3.20487 16.6419 3.35774 16.7952 3.5459 16.8911C3.7596 17 4.03901 17 4.59797 17H7.43073C8.36994 17 8.83942 17 9.26569 17.1295C9.64306 17.2441 9.99512 17.4317 10.2998 17.6821C10.6426 17.9638 10.9017 18.3526 11.4185 19.1277L12 19.9998"
                        stroke={activeTab === "courses" ? "#fef1eb" : "#597059"}
                        strokeWidth="0.9600000000000002"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              }
            />
            <IconButton
              onClick={handleLogout}
              icon={
                <svg
                  fill="#597059"
                  height="18px"
                  width="18px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 471.2 471.2"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        <path d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5 s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5 S235.019,444.2,227.619,444.2z"></path>
                        <path d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5 s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8 C455.319,239.9,455.319,231.3,450.019,226.1z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              }
              label="Logga ut"
            />
          </div>
          <div className="tab-section">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "bookings" && <BookingTab />}
          </div>
          <div
            className={`${activeTab === "profile" ? "tab-password-section" : "no-tab-section"}`}
          >
            {activeTab === "profile" && <ChangePassword />}
          </div>
          {loading && <Spinner size="lg" />}
        </section>
      </Layout>
    </>
  );
}
