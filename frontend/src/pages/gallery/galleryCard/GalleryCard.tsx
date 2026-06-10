import "./galleryCard.css";

interface GalleryCardProps {
  art: string;
}

export default function GalleryCard({ art }: GalleryCardProps) {
  return (
    <article className="home-gallery-img">
      <img src={art} alt="art1"></img>
    </article>
  );
}
