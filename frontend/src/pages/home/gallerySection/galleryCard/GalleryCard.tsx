import "./galleryCard.css";

interface GalleryProps {
  art: string;
}

export default function GallerySection({ art }: GalleryProps) {
  return (
    <article className="home-gallery-img">
      <img src={art} alt="art1"></img>
    </article>
  );
}
