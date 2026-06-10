import "./gallerySection.css";
import GalleryCard from "../../gallery/galleryCard/GalleryCard";
import LinkButton from "../../../components/buttons/linkButton/LinkButton";
import art1 from "../../../assets/gallery/art1.jpg";
import art2 from "../../../assets/gallery/art2.jpg";
import art3 from "../../../assets/gallery/art3.jpg";
import art4 from "../../../assets/gallery/art4.jpg";

export default function GallerySection() {
  return (
    <section className="home-page-gallery-section">
      <h2>Galleri</h2>
      <p>Ett urval av konstverk skapade av mig</p>
      <div className="gallery-container">
        <GalleryCard art={art1} />
        <GalleryCard art={art2} />
        <GalleryCard art={art3} />
        <GalleryCard art={art4} />
      </div>
      <LinkButton
        href="/galleri"
        label="Visa hela galleriet"
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
    </section>
  );
}
