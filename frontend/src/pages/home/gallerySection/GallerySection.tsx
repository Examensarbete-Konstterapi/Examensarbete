import "./gallerySection.css";
import GalleryCard from "./galleryCard/GalleryCard";
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
        href="/gallery"
        label="Visa hela galleriet"
        color="transparent"
        size="xxs"
      />
    </section>
  );
}
