import React, { useState } from "react";
import Header from "./components/Header";
import Movies from "./components/Movies";
import movieData from "./datas/fakeMovieService";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [movies, setMovies] = useState([...movieData]);

  const handleLiked = (movieId) => {
    // Find the movie to update
    const movie = movies.find((m) => m._id === movieId);

    // Define the ID of the object to update and the new liked value
    const idToUpdate = movies.indexOf(movie);
    const updatedLiked = movie.liked
      ? (movie.liked = false)
      : (movie.liked = true);

    // Use `map()` to create a new array with the updated objects
    const updatedMovies = movies.map((movie) => {
      // Use destructuring to copy the properties of the object
      const { _id, liked } = movie;

      // Check if this is the object to update
      if (_id === idToUpdate) {
        // If so, return a new object with the updated name
        return { liked: updatedLiked };
      }

      // If not, return the original object
      return movie;
    });

    // update the movie state
    setMovies(updatedMovies);
  };

  const handleDelete = (movieId) => {
    const updatedMovies = movies.filter((m) => m._id !== movieId);
    setMovies(updatedMovies);
    console.log(`Movie with ${movieId} clicked!`);
  };

  return (
    <>
      <Header count={movies.length} />
      {movies.length > 0 && (
        <Movies movies={movies} onLiked={handleLiked} onDelete={handleDelete} />
      )}
    </>
  );
};

export default App;
