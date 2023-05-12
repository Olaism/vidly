import Movies from "./Movies";

const MoviesTables = ({
  moviesLength,
  sortedMovies,
  onLiked,
  currentPage,
  setCurrentPage,
  onDelete,
  onSort,
}) => {
  return (
    <div className="col-lg-10 col-md-12">
      {moviesLength > 0 && (
        <Movies
          movies={sortedMovies}
          onLiked={onLiked}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onDelete={onDelete}
          onSort={onSort}
        />
      )}
    </div>
  );
};

export default MoviesTables;
