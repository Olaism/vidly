const express = require("express");
const { connect } = require("mongoose");
const genreRouter = require("./routers/genre");
const customerRouter = require("./routers/customer");
const movieRouter = require("./routers/movie");
const rentalRouter = require("./routers/rental");

const app = express();

const connectMongoose = async () => {
  await connect("mongodb://127.0.0.1:27017/vidly");
};

connectMongoose().catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/rentals/", rentalRouter);
app.use((req, res) => {
  res.status(404).send("Not found.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
