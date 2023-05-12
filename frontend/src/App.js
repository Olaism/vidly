import React, { useState } from "react";
import Header from "./components/Header";
import ListGroup from "./components/common/ListGroup";
import movieData from "./datas/fakeMovieService";
import genreData from "./datas/fakeGenreService";
import { filterItemByGenre } from "./utils";
import "bootstrap/dist/css/bootstrap.css";
import MoviesTables from "./components/moviesTable";
import _ from "lodash";

const App = () => {
  const [movies, setMovies] = useState([...movieData]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([
    { _id: "1", name: "All" },
    ...genreData,
  ]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const handleGenreSelect = (genreName) => {
    setCurrentPage(1);
    setSelectedGenre(genreName);
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
      const { _id } = movie;

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

  const handleSort = (path) => {
    const newSortColumn = { ...sortColumn };
    if (newSortColumn.path === path) {
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    setSortColumn(newSortColumn);
  };

  const handleDelete = (movieId) => {
    const updatedMovies = movies.filter((m) => m._id !== movieId);
    setMovies(updatedMovies);
  };

  const filteredMovies = selectedGenre
    ? filterItemByGenre(movies, selectedGenre)
    : movies;

  const sortedMovies = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    [sortColumn.order]
  );

  return (
    <>
      <Header count={sortedMovies.length} />
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-2 col-md-12">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={handleGenreSelect}
            />
          </div>
          <MoviesTables
            moviesLength={movies.length}
            sortedMovies={sortedMovies}
            onLiked={handleLiked}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onDelete={handleDelete}
            onSort={handleSort}
          />
        </div>
      </div>
    </>
  );
};

export default App;
