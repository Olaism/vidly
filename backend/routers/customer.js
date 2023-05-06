const express = require("express");
const {
  getCustomers,
  postCustomers,
  getCustomer,
  putCustomer,
  deleteCustomer,
} = require("../controllers/customer");

const router = express.Router();

router.get("/", getCustomers);

router.post("/", postCustomers);

router.get("/:id", getCustomer);

router.put("/:id", putCustomer);

router.delete("/:id", deleteCustomer);

module.exports = router;
