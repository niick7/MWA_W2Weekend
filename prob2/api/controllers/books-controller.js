const mongoose = require("mongoose");
const Book = mongoose.model("Book");

module.exports.getBooks = function(req, res) {
  let offset = 1;
  let count = 20;
  if(req.query) {
    if(req.query.offset)
      offset = parseInt(req.query.offset);
    if(req.query.count)
      count = parseInt(req.query.count);
  }
  if(isNaN(offset) || isNaN(count)){
    res.status(400).json({message: "Offset and Count must be number."});
    return;
  }

  Book.find().skip(offset).limit(count).exec(function(err, books){
    const response = {
      status: 200,
      message: books
    }
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.getBook = function(req, res) {
  const bookId = req.params.bookId;
  Book.findById(bookId).exec(function(err, book){
    response = {
      status: 200,
      message: book
    }
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!book) {
      response.status = 404;
      response.message = { message: "Book ID is not found." }
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.createBook = function(req, res) {

  Book.create({
    title: req.body.title,
    price: parseFloat(req.body.price),
    rate: parseInt(req.body.rate),
    year: parseInt(req.body.year)
  }, function(err, createdBook){
    const response = {
      status: 200,
      message: createdBook
    }
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.deleteBook = function(req, res) {
  console.log("deleted");
  const bookId = req.params.bookId;
  Book.findByIdAndDelete(bookId).exec(function(err, book){
    response = {
      status: 204,
      message: book
    }
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if(!book) {
      response.status = 404;
      response.message = {message: "Book Id is not found."}
    }
    res.status(response.status).json(response.message);
  })
}