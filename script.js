// --- 1. SELECTORS ---
const bookForm = document.querySelector('#book-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const libraryContainer = document.querySelector('.library-container');
const modal = document.querySelector('#addBookModal');
const newBookBtn = document.querySelector('#new-book-btn');
const closeBtn = document.querySelector('.close-btn');

let myLibrary = []; // This will hold our book data

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.read = false; // Default value for read status
}

// --- 2. FUNCTION DEFINITIONS ---
function createBookCard(book, index) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.index = index; // Add data-index attribute for easy reference

    if (book.read) {
        bookCard.classList.add('read'); // Add a class for styling if the book is read  
    }

    // Create the inner HTML for the book card
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
    `;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button'); // We'll use this class to identify clicks

    const toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
    toggleReadButton.classList.add('toggle-read-button'); // And this one too

    // Append buttons to the book card
    bookCard.appendChild(removeButton);
    bookCard.appendChild(toggleReadButton);

    // Append the complete card to the main container
    libraryContainer.appendChild(bookCard);

}

function render() {
    // Clear the existing display to prevent duplicating books on each render.
    libraryContainer.innerHTML = '';

    // Loop through the myLibrary array and create a card for each book
    myLibrary.forEach((book, index) => {
        // Call the function to create the DOM element for each book
        createBookCard(book, index);
    });

}

function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibrary() {
    const savedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    if (savedLibrary) {
        myLibrary = savedLibrary;
    }
}

// --- 3. EVENT LISTENERS ---
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

    // Create a new book OBJECT using our constructor
    const newBook = new Book(title, author);

    // Add that object to our central data array
    myLibrary.push(newBook);

    // Save the updated library to localStorage
    saveLibrary();

    // (Veritification for now): Log the array to the console
    console.log(myLibrary);

    render(); // Call the render function to update the display

    // Clear the input form inputs
    titleInput.value = '';
    authorInput.value = '';

    // Close the modal after successfully adding the book
    modal.classList.remove('show-modal');
});

// The NEW listeners for all button clicks inside the library
libraryContainer.addEventListener('click', function (event) {
    // Find the closest parent book-cart to the thing that was clicked
    const card = event.target.closest('.book-card');

    // If we didn't click inside a card, we can stop here
    if (!card) return;

    // Get the index of the book from the data-index attribute
    const index = card.dataset.index;

    // Check if the remove button was clicked
    if (event.target.classList.contains('remove-button')) {
        // Remove the book from the myLibrary array
        myLibrary.splice(index, 1);
        // Save the updated library to localStorage
        saveLibrary();
        // Re-render the library to reflect the changes
        render();
    }

    // Check if the toggle read button was clicked
    if (event.target.classList.contains('toggle-read-button')) {
        // Toggle the read status of the book
        myLibrary[index].read = !myLibrary[index].read;
        // Save the updated library to localStorage
        saveLibrary();
        // Re-render the library to reflect the changes
        render();
    }
});

// Event listener for the "New Book" button to show the modal
newBookBtn.addEventListener('click', function () {
    modal.classList.add('show-modal'); // Add the class to display the modal
});

// Event listener for the "Close" button to hide the modal
closeBtn.addEventListener('click', function () {
    modal.classList.remove('show-modal'); // Remove the class to hide the modal
});

// Event listener for the window to close the modal when clicking outside the content
window.addEventListener('click', function (event) {
    if (event.target === modal) { // Check if the click is on the modal overlay
        modal.classList.remove('show-modal'); // Remove the class to hide the modal
    }
});

// --- INITIALIZATION ---
loadLibrary();
render();
