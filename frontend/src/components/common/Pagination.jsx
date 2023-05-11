import _ from "lodash";
import propTypes from "prop-types";

const Pagination = ({ pageSize, itemCount, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-12">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={currentPage === 1 ? "page-item disabled" : "page-item"}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {pages.map((page) => (
              <li
                key={page}
                className={
                  currentPage === page ? "page-item active" : "page-item"
                }
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li
              className={
                currentPage === pageCount ? "page-item disabled" : "page-item"
              }
            >
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pageSize: propTypes.number.isRequired,
  itemCount: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};

export default Pagination;
