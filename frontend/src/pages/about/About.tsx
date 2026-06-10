import "./about.css";
import Layout from "../../components/layout/Layout";
import { MiniHeroSection } from "../../components/miniHeroSection/MiniHeroSection";
import CTASection from "../../components/CTASection/CTASection";
import portratt from "../../assets/portratt.jpg";

export function About() {
  return (
    <>
      <MiniHeroSection
        title="Om mig"
        subtitle="Välkommen! Jag är Jessicka, konstterapeut med passion för kreativ läkning och personlig utveckling."
      />
      <Layout>
        <main className="about-page">
          <section className="about-intro">
            <div className="about-image">
              <img src={portratt} alt="Jessicka konstterapeut" />
            </div>

            <div className="about-content">
              <h2>Min resa</h2>

              <p>
                Min väg till konstterapi började med en livslång passion för
                konst och en djup fascination för människans inre landskap.
              </p>

              <p>
                Genom min utbildning i konstterapi har jag fått verktyg att
                hjälpa andra att utforska sina känslor och tankar genom
                skapande.
              </p>

              <p>
                Idag driver jag min egen praktik där jag arbetar med människor i
                olika livssituationer. Varje session anpassas efter individens
                behov.
              </p>
            </div>
          </section>

          <section className="about-section">
            <h2>Min filosofi</h2>

            <p>
              Jag tror på att varje människa har en inneboende kreativ förmåga
              som kan användas för läkning och utveckling.
            </p>

            <p>
              Konsten behöver inte vara perfekt. Det viktiga är processen och
              vad den väcker inom dig.
            </p>
          </section>

          <section className="about-section">
            <h2>Utbildning & erfarenhet</h2>

            <div className="education-cards">
              <article className="education-card">
                <div className="education-card-icon">
                  {
                    // <svg
                    //   fill="#597059"
                    //   version="1.1"
                    //   id="Capa_1"
                    //   xmlns="http://www.w3.org/2000/svg"
                    //   viewBox="0 0 364.346 364.346"
                    //   width="30px"
                    //   height="30px"
                    //   stroke="#597059"
                    //   strokeWidth="0.0036434600000000003"
                    // >
                    //   <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    //   <g
                    //     id="SVGRepo_tracerCarrier"
                    //     strokeLinecap="round"
                    //     strokeLinejoin="round"
                    //   ></g>
                    //   <g id="SVGRepo_iconCarrier">
                    //     {" "}
                    //     <g id="XMLID_518_">
                    //       {" "}
                    //       <rect
                    //         id="XMLID_519_"
                    //         x="106.501"
                    //         y="70"
                    //         width="130"
                    //         height="30"
                    //       ></rect>{" "}
                    //       <path
                    //         id="XMLID_520_"
                    //         d="M326.501,170.788V43.338C326.501,19.441,307.06,0,283.163,0H59.84C35.943,0,16.501,19.441,16.501,43.338 v202.583c0,23.896,19.441,43.338,43.338,43.338h159.691v58.287c0,4.718,1.864,9.057,5.248,12.217 c3.119,2.913,7.352,4.584,11.614,4.583c4.412,0,8.594-1.753,11.778-4.938l19.882-19.882c1.28-1.28,2.982-1.985,4.792-1.985 s3.512,0.705,4.792,1.984l19.883,19.883c3.184,3.185,7.367,4.938,11.778,4.938c9.297,0,16.861-7.536,16.861-16.8v-71.743 c13.397-13.555,21.687-32.169,21.687-52.688C347.844,202.775,339.693,184.312,326.501,170.788z M205.574,190H89.001v30h108.922 c-0.043,1.034-0.079,2.07-0.079,3.115c0,13.098,3.383,25.417,9.309,36.144H59.84c-7.355,0-13.338-5.983-13.338-13.338V43.338 C46.501,35.983,52.485,30,59.84,30h223.323c7.355,0,13.338,5.983,13.338,13.338V151.96c-7.443-2.481-15.391-3.845-23.657-3.845 c-6.506,0-12.82,0.835-18.843,2.4V130h-165v30h143.406C220.963,167.358,211.638,177.73,205.574,190z M272.844,263.115 c0,0-42.153-22.833-42.153-51.914c0-12.979,10.521-23.5,23.5-23.5c7.601,0,14.358,3.609,18.653,9.207 c4.296-5.598,11.052-9.207,18.653-9.207c12.979,0,23.5,10.521,23.5,23.5C314.997,240.547,272.844,263.115,272.844,263.115z"
                    //       ></path>{" "}
                    //     </g>{" "}
                    //   </g>
                    // </svg>
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      enableBackground="new 0 0 32 32"
                      width="32px"
                      height="32px"
                      fill="#adbcad"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <polyline
                          fill="none"
                          stroke="#adbcad"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          points="17.4,21 21.3,26.9 22.7,23.6 26.3,23.6 22.6,18 "
                        ></polyline>{" "}
                        <polyline
                          fill="none"
                          stroke="#adbcad"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          points="14.6,21 10.7,26.9 9.3,23.6 5.7,23.6 9.4,18 "
                        ></polyline>{" "}
                        <path
                          fill="none"
                          stroke="#adbcad"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          d="M17.2,4.4L19,5.7L21.2,6c0.9,0.1,1.6,0.8,1.7,1.7 l0.4,2.2l1.3,1.8c0.5,0.7,0.5,1.7,0,2.5L23.3,16L23,18.2c-0.1,0.9-0.8,1.6-1.7,1.7L19,20.3l-1.8,1.3c-0.7,0.5-1.7,0.5-2.5,0L13,20.3 L10.8,20c-0.9-0.1-1.6-0.8-1.7-1.7L8.7,16l-1.3-1.8c-0.5-0.7-0.5-1.7,0-2.5L8.7,10L9,7.8C9.2,6.9,9.9,6.2,10.8,6L13,5.7l1.8-1.3 C15.5,3.9,16.5,3.9,17.2,4.4z"
                        ></path>{" "}
                      </g>
                    </svg>
                  }
                </div>
                <div>
                  <h3>Konstterapeut</h3>
                  <p>Svenska Konstterapeutföreningen</p>
                </div>
              </article>

              <article className="education-card">
                <div className="education-card-icon">
                  {
                    <svg
                      width="30px"
                      height="30px"
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
                          d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
                          stroke="#c598ae"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  }
                </div>
                <div>
                  <h3>Psykologi</h3>
                  <p>Fördjupade studier inom psykologi och samtalsmetodik.</p>
                </div>
              </article>

              <article className="education-card">
                <div className="education-card-icon">
                  {
                    <svg
                      width="30px"
                      height="30px"
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
                          d="M12 20C12 20 21 16 21 9.71405C21 6 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12.7198 5.92016C12.3266 6.32798 11.6734 6.32798 11.2802 5.92016L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5 4 3 6 3 9.71405C3 16 12 20 12 20Z"
                          stroke="#dfd1be"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  }
                </div>
                <div>
                  <h3>Traumamedvetet arbete</h3>
                  <p>Fortbildning inom trauma och återhämtning.</p>
                </div>
              </article>

              <article className="education-card">
                <div className="education-card-icon">
                  {
                    <svg
                      fill="#a2adb6"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          d="M3.5 8a5.5 5.5 0 118.596 4.547 9.005 9.005 0 015.9 8.18.75.75 0 01-1.5.045 7.5 7.5 0 00-14.993 0 .75.75 0 01-1.499-.044 9.005 9.005 0 015.9-8.181A5.494 5.494 0 013.5 8zM9 4a4 4 0 100 8 4 4 0 000-8z"
                        ></path>
                        <path d="M17.29 8c-.148 0-.292.01-.434.03a.75.75 0 11-.212-1.484 4.53 4.53 0 013.38 8.097 6.69 6.69 0 013.956 6.107.75.75 0 01-1.5 0 5.193 5.193 0 00-3.696-4.972l-.534-.16v-1.676l.41-.209A3.03 3.03 0 0017.29 8z"></path>
                      </g>
                    </svg>
                  }
                </div>
                <div>
                  <h3>Handledning</h3>
                  <p>Kontinuerlig professionell utveckling och handledning.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="about-section">
            <h2>Mina värderingar</h2>

            <div className="about-cards">
              <article className="about-card">
                <h3>Respekt</h3>
                <p>Varje människa har sin egen berättelse.</p>
              </article>

              <article className="about-card">
                <h3>Trygghet</h3>
                <p>En säker plats för reflektion och utveckling.</p>
              </article>

              <article className="about-card">
                <h3>Kreativitet</h3>
                <p>Skapande kan öppna nya vägar till förståelse.</p>
              </article>

              <article className="about-card">
                <h3>Helhet</h3>
                <p>Jag ser till hela människan.</p>
              </article>
            </div>
          </section>

          <CTASection
            title="Låt oss börja din resa tillsammans"
            text="Boka ett kostnadsfritt första samtal så kan vi prata om hur konstterapi kan hjälpa dig."
            btnLabel="Boka tid"
            href="/boka-tid"
          />
        </main>
      </Layout>
    </>
  );
}
