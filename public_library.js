/*
To begin, instantiate a new Library. Then create Books passing in 'title' and
'shelfNum'. Call each book's .enshlf() passing in the desired 'library'.

I have left my testing code active for your examination. so feel free to take
a look in the console to get a good idea of how each class is functioning.
 */


// Code Fellows: Book
//   Make the book object have "enshelf" and "unshelf" methods 
//   that control what shelf the book is sitting on.
var Book = function(title, shelfNum) {
  this.title = title;
  this.shelfNum = shelfNum;
  this.library = null;
  this.body = "Exciting text that differentiates this book from all others.";
};

Book.prototype.enshelf = function(library) {
  this.library = library;

  if(library.shelves[this.shelfNum] instanceof Shelf) {
    library.shelves[this.shelfNum].books.push(this);
  } else {
    library.shelves[this.shelfNum] = new Shelf();
    library.shelves[this.shelfNum].books.push(this);
  }
};
Book.prototype.unshelf = function() {
  if(this.library !== null) {
    var shelf = this.library.shelves[this.shelfNum].books,
        length = shelf.length,
        title = this.title;

    for(var i = 0; i < length; i++) {
      if(shelf[i].title === title) {
        var tempBookArr = shelf.splice(i, 1);
        this.library = null;
        console.log("Checking out: " + title);
        
        return tempBookArr[0];
      }
    }
  } else {
    console.log(this.title + " is not currently on a shelf.");
  }
};


// Code Fellows: Library
//   The library should be aware of the number of shelves.
//   The library should have a method to report all books it contains.
var Library = function() {
  this.shelves = [];
};

Library.prototype.numShelves = function() {
  var length = this.shelves.length;

  if(length === 1) {
    console.log("This library contains 1 shelf.");
  } else {
    console.log("This library contains " + length + " shelves.");
  }
};
Library.prototype.contents = function() {
  var shelves = this.shelves,
      length = shelves.length;

  if(length === 0){
    console.log("This library has no shelves or books, sorry.");
  } else {
    for(var i = 0; i < length; i++) {
      console.log("\nShelf " + i + ":\n");
      shelves[i].contents();
    }
  }
};


// Code Fellows: Shelf
//   Each shelf should know what books it contains
var Shelf = function() {
  this.books = [];
};

Shelf.prototype.contents = function() {
var shelf = this.books,
    length = shelf.length;

  if(length) {
    for(var i = 0; i < length; i++) {
      console.log("   " + shelf[i].title + "\n");
    }
  } else {
    console.log("   Shelf is empty.");
  }
};


// Tests:
// ============================================================================

// Shelf:
// ----------------------------------------------------------------------------
console.log("\nShelf: Begin testing:\n\n");

// Create a test Shelf object
var testShelf1 = new Shelf();

// Test Shelf's .contents() expecting an empty shelf
testShelf1.contents();

// Add generic object test data with title property
// Note: At time of first testing the "Book" class is not complete so pseudo-
// book objects are hare created in line to simulate basic functionality
testShelf1.books.push({ title: "TestBookTitle 1" });
testShelf1.books.push({ title: "TestBookTitle 2" });
testShelf1.books.push({ title: "TestBookTitle 3" });

// Test Shelf's .contents() expecting 3 pseudo-Book objects and their titles
testShelf1.contents();

// Create a second test Shelf for use in testing the Library
var testShelf2 = new Shelf();

// Test Shelf's .contents() Expecting an empty shelf
testShelf2.contents();

// Add generic object test data with title property
testShelf2.books.push({ title: "TestBookTitle 4" });
testShelf2.books.push({ title: "TestBookTitle 5" });
testShelf2.books.push({ title: "TestBookTitle 6" });

// Log out testShelf2's contents for comparison with future amendments
testShelf2.contents();

console.log("\nShelf: End testing\n\n");

// Library:
// ----------------------------------------------------------------------------
console.log("\nLibrary: Begin testing:\n\n");

// Create a test Library object
var testLibrary = new Library();

// Test Library's .contents() expecting an empty library
testLibrary.contents();

// Add test shelves to the library
testLibrary.shelves.push(testShelf1);
testLibrary.shelves.push(testShelf2);

// Test Library's .contents() expecting:
// two shelves containing three book like objects each
testLibrary.contents();

console.log("\nLibrary: End testing\n\n");

// Book:
// ----------------------------------------------------------------------------
console.log("\nBook: Begin testing:\n\n");

//  Create a test Book object
var testBook1 = new Book("testBook1", 1);

// Test Book's .unshelf() expecting the book not to be on a shelf.
testBook1.unshelf();

// Test Book's .enshelf() expecting the shelf to already exist
testBook1.enshelf(testLibrary);

// Create a test Book object
var testBook2 = new Book("testBook2", 2);

// Test Book's .unshelf() expecting the book not to be on a shelf.
testBook2.unshelf();

// Test Book's .enshelf() expecting the shelf not to exist
testBook2.enshelf(testLibrary);

// Log out the new contents of the test library after adding the Book objects
testLibrary.contents();

// Test Book's .unshelf() expecting the book to be on a shelf
var testCheckedOutBook1 = testBook1.unshelf();
var testCheckedOutBook2 = testBook2.unshelf();

// Check what the .unshelf() actual returned
console.log(testCheckedOutBook1);
console.log(testCheckedOutBook2);

// Log out the contents of the library after the books have removed themselves
testLibrary.contents();

console.log("\nBook: End testing\n\n");