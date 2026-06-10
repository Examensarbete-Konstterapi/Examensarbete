import "./gallery.css";
import Layout from "../../components/layout/Layout";
import { MiniHeroSection } from "../../components/miniHeroSection/MiniHeroSection";
import LinkButton from "../../components/buttons/linkButton/LinkButton";
import GalleryCard from "../home/gallerySection/galleryCard/GalleryCard";
import art1 from "../../assets/gallery/art1.jpg";
import art2 from "../../assets/gallery/art2.jpg";
import art3 from "../../assets/gallery/art3.jpg";
import art4 from "../../assets/gallery/art4.jpg";

export function Gallery() {
  const images = [
    art1,
    art2,
    art3,
    art4,
    art2,
    art1,
    art4,
    art3,
    art3,
    art2,
    art1,
    art4,
    art1,
    art4,
    art3,
    art2,
  ];
  return (
    <>
      <MiniHeroSection
        title="Galleri"
        subtitle="Ett urval av konstverk som skapats av mig"
      />
      <Layout>
        <section className="gallery-grid">
          {images.map((image, index) => (
            <GalleryCard key={index} art={image} />
          ))}
        </section>
        <section className="about-gallery-section">
          <article className="about-gallery">
            <h2>Om galleriet</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              nulla eaque amet maiores modi sed eius eos alias sunt laborum quas
              quidem molestias molestiae pariatur cupiditate vero dolorum,
              distinctio odit.
            </p>
            <LinkButton
              href="/kontakt"
              label="Kontakta mig här"
              color="transparent"
              size="xxs"
              icon={
                <svg
                  width="22px"
                  height="22px"
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
                      d="M6 12H18M18 12L13 7M18 12L13 17"
                      stroke="#597059"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              }
            />
          </article>
        </section>
      </Layout>
    </>
  );
}
