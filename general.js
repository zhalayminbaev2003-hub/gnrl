const axios = require('axios');
const API_URL = 'http://localhost:5000'; // Adjust if your local Express server runs on a different port

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

// Example execution (uncomment to test locally)
// getAllBooks();
// getBookByISBN('1'); 
// getBookByAuthor('Chinua Achebe');
// getBookByTitle('Things Fall Apart');