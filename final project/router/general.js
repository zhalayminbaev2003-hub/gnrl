const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Task 1: Get the list of books available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(JSON.stringify(books, null, 4));
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }
  return res.status(404).json({ message: "Book not found" });
});
  
// Task 3: Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author.toLowerCase();
  let filteredBooks = [];
  let keys = Object.keys(books);
  
  keys.forEach((key) => {
    if (books[key].author.toLowerCase() === author) {
      filteredBooks.push(books[key]);
    }
  });

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  }
  return res.status(404).json({ message: "Author not found" });
});

// Task 4: Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();
  let filteredBooks = [];
  let keys = Object.keys(books);

  keys.forEach((key) => {
    if (books[key].title.toLowerCase() === title) {
      filteredBooks.push(books[key]);
    }
  });

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  }
  return res.status(404).json({ message: "Title not found" });
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({ message: "Book not found" });
});

// ==========================================
// TASKS 10 - 13: Axios & Async/Await Implementations
// ==========================================

const API_URL = 'http://localhost:5000'; // Adjust if needed

// Task 10: Retrieve all books using async/await
async function getAllBooks() {
  try {
    const response = await axios.get(`${API_URL}/`);
    console.log("All Books:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all books:", error.message);
  }
}

// Task 11: Retrieve book details by ISBN using Promises
function getBookByISBN(isbn) {
  return axios.get(`${API_URL}/isbn/${isbn}`)
    .then(response => {
      console.log(`Book with ISBN ${isbn}:`, response.data);
      return response.data;
    })
    .catch(error => {
      console.error(`Error fetching book by ISBN ${isbn}:`, error.message);
    });
}

// Task 12: Retrieve book details by Author using async/await
async function getBookByAuthor(author) {
  try {
    const response = await axios.get(`${API_URL}/author/${author}`);
    console.log(`Books by ${author}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by ${author}:`, error.message);
  }
}

// Task 13: Retrieve book details by Title using async/await
async function getBookByTitle(title) {
  try {
    const response = await axios.get(`${API_URL}/title/${title}`);
    console.log(`Books titled ${title}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by title ${title}:`, error.message);
  }
}

module.exports.general = public_users;