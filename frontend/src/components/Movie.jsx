import { FaHeart, FaHeartBroken } from "react-icons/fa";

const Movie = ({
  movie: {
    _id,
    title,
    genre: { name },
    numberInStock,
    dailyRentalRate,
    liked,
  },
  onDelete,
  onLiked,
}) => {
  return (
    <>
      <tr>
        <th scope="row">{_id}</th>
        <td>{title}</td>
        <td>{name}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
        <td>
          <button onClick={() => onLiked(_id)}>
            {liked ? <FaHeart /> : <FaHeartBroken />}
          </button>
        </td>
        <td>
          <button
            onClick={() => onDelete(_id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Movie;
