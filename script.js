// Select the form and the input fields
const bookForm = document.querySelector('#book-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

// Select the container where new books will be added
const libraryContainer = document.querySelector('.library-container');

bookForm.addEventListener('submit', function (event) {
    // This is the function that will run when the form is submitted
    event.preventDefault(); // VERY IMPORTANT: Prevents the page from reloading

    // 1. Get the values from the input fields
    const title = titleInput.value;
    const author = authorInput.value;

    // 2. Log the value to the console to confirm they were captured
    console.log('Book Title:', title);
    console.log('Book Author:', author);

    // 3. Clear the input fields for the next entry
    titleInput.value = '';
    authorInput.value = '';

    // 4. Create the new book card element
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card'); // Add a class for styling

    // 5. Create the HTML content for the card
    bookCard.innerHTML = `
        <h3>${title}</h3>
        <p>by ${author}</p>
    `;

    // 6. Append the new card to the library container
    libraryContainer.appendChild(bookCard);

});