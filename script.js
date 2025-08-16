// --- 1. SELECTORS (Your tools) ---
const bookForm = document.querySelector('#book-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const libraryContainer = document.querySelector('.library-container');


// --- 2. FUNCTION DEFINITIONS (Your "worker" functions) ---
function createBookCard(title, author) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
    <h3>${title}</h3>
    <p>by ${author}</p>
  `;

    libraryContainer.appendChild(bookCard);
}


// --- 3. EVENT LISTENERS (Your "manager" function) ---
bookForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the page from reloading

    // Get the values from the input fields
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    // The validation check:
    if (title === '' || author === '') {
        alert('Please fill out both Title and Author.'); // Simple feedback for now
        return; // Stop the function from running further
    }

    // Call the worker function to do the heavy lifting
    createBookCard(title, author);

    // Clear the input fields for the next entry
    titleInput.value = '';
    authorInput.value = '';
});