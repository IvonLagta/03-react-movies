import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import MovieGrid from "../../components/MovieGrid/MovieGrid.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../../components/MovieModal/MovieModal.tsx";
import { fetchMovies } from "../../services/movieService.ts";
import { Movie } from "../../types/movie.ts";

const App = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(false);
    setMovies(null); // Очищення попередньої колекції при новому пошуку

    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = async (movieId: number) => {
    try {
      // Тут буде виклик fetchMovieById, якщо потрібно отримати повні дані
      // Поки що використовуємо існуючий об'єкт (якщо є)
      const movie = movies?.find((m) => m.id === movieId) || null;
      setSelectedMovie(movie);
    } catch {
      toast.error("Failed to load movie details");
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader />}

      {error && <ErrorMessage />}

      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />

      <Toaster position="top-center" />
    </>
  );
};

export default App;
