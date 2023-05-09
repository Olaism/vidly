const express = require("express");

const {
  getRentals,
  postRentals,
  getRental,
  putRental,
  patchRental,
  deleteRental,
} = require("../controllers/rental");

const router = express.Router();

router.get("/", getRentals);
router.post("/", postRentals);
router.patch("/:id", patchRental);
router.get("/:id", getRental), router.put("/:id", putRental);
router.delete("/:id", deleteRental);

module.exports = router;
