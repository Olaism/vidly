const express = require("express");
const genreRouter = require("./routers/genre");
const customerRouter = require("./routers/customer");

const app = express();

app.use(express.json());
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/customers", customerRouter);
app.use((req, res) => {
  res.status(400).send("Not found.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
