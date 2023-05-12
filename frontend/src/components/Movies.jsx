import Movie from "./Movie";
import Pagination from "./common/Pagination";
import { paginate } from "../utils";
import React, { useState } from "react";

const Movies = ({
  movies,
  currentPage,
  setCurrentPage,
  onLiked,
  onDelete,
  onSort,
}) => {
  const [pageSize, setPageSize] = useState(4);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedMovies = paginate(movies, currentPage, pageSize);

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col" onClick={() => onSort("title")}>
              Title
            </th>
            <th scope="col" onClick={() => onSort("genre.name")}>
              Genre
            </th>
            <th scope="col" onClick={() => onSort("numberInStock")}>
              Stock
            </th>
            <th scope="col" onClick={() => onSort("dailyRentalRate")}>
              Rental
            </th>
            <th scope="col">liked</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMovies.map((movie) => (
            <Movie
              key={movie._id}
              movie={movie}
              onLiked={onLiked}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        itemCount={movies.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Movies;
