const express = require("express");

const {
  getGenres,
  getGenre,
  postGenres,
  putGenre,
  patchGenre,
  deleteGenre,
} = require("../controllers/genre");

const router = express.Router();

router.get("/", getGenres);

router.post("/", postGenres);

router.get("/:id", getGenre);

router.put("/:id", putGenre);

router.patch("/:id", patchGenre);

router.delete("/:id", deleteGenre);

module.exports = router;
