const header = ({ count }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">
          There are{" "}
          <span className="text-primary">{count === 0 ? "no" : count}</span>{" "}
          movie(s) in the database.
        </div>
      </div>
    </nav>
  );
};

export default header;
