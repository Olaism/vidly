const express = require("express");
const {
  getMovies,
  postMovies,
  getMovie,
  putMovie,
  deleteMovie,
} = require("../controllers/movie");

const router = express.Router();

router.get("/", getMovies);
router.post("/", postMovies);
router.get("/:id", getMovie);
router.put("/:id", putMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
