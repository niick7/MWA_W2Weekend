const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books-controller");
const usersController = require("../controllers/users-controller");

router.route("/books").get(booksController.getBooks)
                      .post(booksController.createBook);
router.route("/books/:bookId").get(booksController.getBook)
                              .delete(booksController.deleteBook);

router.route("/users/register").get(usersController.register);
router.route("/users/login").get(usersController.login);

module.exports = router;