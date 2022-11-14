const express = require("express");
const {
  createBook,
  getBook,
  deleteBook,
} = require("../controller/bookController");
const router = express.Router();

router.route("/").post(createBook).get(getBook);

router.route("/:id").delete(deleteBook);

module.exports = router;
