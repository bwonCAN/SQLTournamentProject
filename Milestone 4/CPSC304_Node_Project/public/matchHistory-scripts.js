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

// Inserts new records into the demotable.
async function retrieveMatchHistory() {
    const tableElement = document.getElementById('matchHistoryTable');
    const tableBody = tableElement.querySelector('tbody');

    const playerName = sessionStorage.getItem("username");

    const response = await fetch('/retrieve-match-history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playerName: playerName
        })
    });

    const responseData = await response.json();
    const matchHistoryContent = responseData.data;
    const messageElement = document.getElementById('matchHistoryMessage');
    
    if (responseData.success) {
        matchHistoryContent.forEach(player => {
            const row = tableBody.insertRow();
            player.forEach((field, index) => {
                const cell = row.insertCell(index);
                if (field == 1) {
                    field = "Player 1";
                }
                if (field == 2) {
                    field = "Player 2";
                }
                cell.textContent = field;
            });
        });      
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

async function redirectToDashboard() {
    window.location.href = 'dashboard.html';
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    retrieveMatchHistory();
};
