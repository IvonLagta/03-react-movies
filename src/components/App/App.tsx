import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import MovieGrid from "../../components/MovieGrid/MovieGrid.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../../components/MovieModal/MovieModal.tsx";

import { fetchMovies } from "../../services/movieService.ts";
import { Movie } from "../../types/movie.ts";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(false);
    setMovies([]);
    setSelectedMovie(null);

    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(results);
    } catch (err) {
      console.error(err);
      setError(true);
      toast.error("Something went wrong while fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader />}

      {error && <ErrorMessage />}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />

      <Toaster position="top-center" />
    </>
  );
};

export default App;
