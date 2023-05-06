import Movie from "./Movie";

const movies = ({ movies, onDelete, onLiked }) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#id</th>
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">numberInStock</th>
          <th scope="col">dailyRentalRate</th>
          <th scope="col">liked</th>
          <th scope="col">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <Movie
            key={movie._id}
            movie={movie}
            onLiked={onLiked}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default movies;
