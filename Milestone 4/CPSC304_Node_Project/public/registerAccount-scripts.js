/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */


// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}
// ----------------------------------------------------------

// Create new user and insert into Player table
async function registerAccount(event) {
    event.preventDefault();

    const usernameValue = document.getElementById('registerUsername').value;
    const emailValue = document.getElementById('registerEmail').value;
    const passwordValue = document.getElementById('registerPassword').value;
    const countryValue = document.getElementById('registerCountry').value;

    const response = await fetch('/register-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameValue,
            email: emailValue,
            password: passwordValue,
            country: countryValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('registerAccountMessage');

    if (responseData.success) {
        messageElement.textContent = "Registration successful! Please login now.";
    } else {
        messageElement.textContent = "Registration failed. Username and email must be unique.";
    }
}

function redirectToIndex() {
    window.location.href = 'index.html';
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    document.getElementById("registerAccount").addEventListener("submit", registerAccount);
};
