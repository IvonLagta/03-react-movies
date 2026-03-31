import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
import { Movie } from "../../types/movie.ts";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    if (!movie) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}>
          &times;
        </button>

        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || "Movie backdrop"}
          className={css.image}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || "N/A"}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average?.toFixed(1) || "N/A"}
            /10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default MovieModal;
