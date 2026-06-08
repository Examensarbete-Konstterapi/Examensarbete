import "./adminPanel.css";
import Layout from "../../../components/layout/Layout";
import { MiniHeroSection } from "../../../components/miniHeroSection/MiniHeroSection";
import IconButton from "../../../components/buttons/iconButton/IconButton";
import { useAuth } from "../../../context/useAuth";
import { useState } from "react";
import { CoursesTab } from "./coursesTab/CoursesTab";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "courses"
  >("overview");
  const { user, logout } = useAuth();

  return (
    <>
      <MiniHeroSection
        title="Admin Panel"
        subtitle={
          user ? `Välkommen ${user.firstName} ${user.lastName}!` : "Välkommen!"
        }
      />
      <Layout>
        <section className="my-pages-section">
          <div className="menu">
            <IconButton
              onClick={() => setActiveTab("overview")}
              active={activeTab === "overview"}
              label="Översikt"
              icon={
                <svg
                  width="18px"
                  height="18px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="3.2"
                  stroke={activeTab === "overview" ? "#fef1eb" : "#597059"}
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
              onClick={() => setActiveTab("courses")}
              active={activeTab === "courses"}
              label="Kurser"
              icon={
                <svg
                  width="18px"
                  height="18px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="3.2"
                  stroke={activeTab === "courses" ? "#fef1eb" : "#597059"}
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
              label="Bokningar"
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
              onClick={logout}
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
            {activeTab === "courses" && <CoursesTab />}
            {/* {activeTab === "bookings" && <BookingTab />} */}
          </div>
        </section>
      </Layout>
    </>
  );
}
