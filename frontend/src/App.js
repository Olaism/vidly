import React, { useState } from "react";
import Header from "./components/Header";
import Movies from "./components/Movies";
import ListGroup from "./components/common/ListGroup";
import movieData from "./datas/fakeMovieService";
import genreData from "./datas/fakeGenreService";
import { filterItemByGenre } from "./utils";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [movies, setMovies] = useState([...movieData]);
  const [genres, setGenres] = useState([
    { _id: "1", name: "All" },
    ...genreData,
  ]);
  const [currentGenre, setcurrentGenre] = useState("All");

  const handleGenreChange = (name) => {
    setcurrentGenre(name);
  };

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

  const filteredMovies = filterItemByGenre(movies, currentGenre);

  return (
    <>
      <Header count={filteredMovies.length} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-2 col-md-12">
            <ListGroup
              items={genres}
              currentItem={currentGenre}
              onItemChange={handleGenreChange}
            />
          </div>
          <div className="col-lg-10 col-md-12">
            {movies.length > 0 && (
              <Movies
                movies={filteredMovies}
                onLiked={handleLiked}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
