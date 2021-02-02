angular.module("meanBooksApp").controller("booksController", booksController);

function booksController($http, bookDataFactory){
  const vm = this;
  bookDataFactory.getBooks().then(function(response){
    vm.books = response;
  })
  vm.addBook = function(){
    const newBook = {
      title: vm.title,
      price: vm.price,
      rate: vm.rate,
      year: vm.year
    };
    $http.post("/api/books", newBook).then(function(response){
      vm.success = "Added book successfully.";
    });
  },
  vm.deleteBook = function(id){
    $http.delete("/api/books/", id).then(function(response){
      vm.success = "Deleted book successfully.";
    });
  }
}