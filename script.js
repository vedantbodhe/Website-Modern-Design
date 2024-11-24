// Replace with your Google Apps Script Web App URL
const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbxCxABmscVo6qcENRr-RhXYKe0r0j0gwBgOCB49klYSIUfcQE3XDGU1onnp1flYTzPX/exec';

// UEBERGREIFEND

// Helper function to enable scrolling
function enableScrolling() {
    document.body.style.overflow = 'auto'; // Allow scrolling on the page
}

// Helper function to disable scrolling
function disableScrolling() {
    document.body.style.overflow = 'hidden'; // Disable scrolling when the banner or settings menu is active
}

// Disable scrolling initially until the cookie banner is interacted with
disableScrolling();

// Function to log user actions for analysis
let userActions = []; // Array to store user interactions
const sessionId = `session_${Date.now()}`; // Unique session ID for each visit

function logAction(action) {
    const timestamp = new Date().toISOString();
    userActions.push({ SessionID: sessionId, Action: action, Timestamp: timestamp });
    console.log(`Action logged: ${action} at ${timestamp} for ${sessionId}`);
}

// Function to send user actions to Google Apps Script
function sendUserActionsToGoogleSheet() {
    if (userActions.length === 0) return; // Avoid sending empty data
    fetch(googleAppsScriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userActions)
    })
        .then(response => {
            if (response.ok) {
                console.log('Data sent to Google Sheets via Google Apps Script');
                userActions = []; // Clear actions after sending
            } else {
                console.error('Failed to send data to Google Sheets via Google Apps Script');
            }
        })
        .catch(error => console.error('Error:', error));
}

// CONSENT BANNER

// Handle Accept All button
document.getElementById('accept-btn').addEventListener('click', () => {
    alert('You have accepted all cookies.');
    document.getElementById('cookie-banner').classList.add('hidden'); // Hide banner
    document.getElementById('main-content').classList.remove('hidden'); // Show main content
    enableScrolling(); // Enable scrolling
    logAction('Accept All Cookies'); // Log action
    sendUserActionsToGoogleSheet(); // Send to Google Sheets
});

// Handle Decline All button
document.getElementById('essential-btn').addEventListener('click', () => {
    alert('Cookies declined, essential only.');
    document.getElementById('functional-toggle').checked = false;
    document.getElementById('marketing-toggle').checked = false;

    document.getElementById('cookie-banner').classList.add('hidden'); // Hide banner
    document.getElementById('main-content').classList.remove('hidden'); // Show main content
    enableScrolling(); // Enable scrolling

    logAction('Functional Cookies Disabled');
    logAction('Marketing Cookies Disabled');
    logAction('Cookies declined, essential only'); // Log action
    sendUserActionsToGoogleSheet(); // Send to Google Sheets
});

// Manage Settings Submenu
document.getElementById('settings-btn').addEventListener('click', () => {
    if (!document.getElementById('settings-menu').classList.contains('hidden')) return; // Prevent duplicate logs
    document.getElementById('cookie-banner').classList.add('hidden'); // Hide banner
    document.getElementById('settings-menu').classList.remove('hidden'); // Show settings menu
    disableScrolling(); // Keep scrolling disabled
    logAction('Manage Settings Opened'); // Log action
    sendUserActionsToGoogleSheet(); // Send to Google Sheets
});

// Save Settings in Submenu
document.getElementById('save-settings-btn').addEventListener('click', () => {
    alert('Your cookie preferences have been saved.');

    const marketingStatus = document.getElementById('marketing-toggle').checked ? 'Enabled' : 'Disabled';
    const functionalStatus = document.getElementById('functional-toggle').checked ? 'Enabled' : 'Disabled';

    logAction(`Marketing Cookies ${marketingStatus}`);
    logAction(`Functional Cookies ${functionalStatus}`);

    logAction('Save Preferences'); // Log action
    sendUserActionsToGoogleSheet(); // Send to Google Sheets

    document.getElementById('settings-menu').classList.add('hidden'); // Hide settings menu
    document.getElementById('main-content').classList.remove('hidden'); // Show main content
    enableScrolling(); // Enable scrolling
});

// Cancel Settings in Submenu
document.getElementById('cancel-settings-btn').addEventListener('click', () => {
    document.getElementById('settings-menu').classList.add('hidden'); // Hide settings menu
    document.getElementById('cookie-banner').classList.remove('hidden'); // Show banner again
    disableScrolling(); // Keep scrolling disabled
    logAction('Go Back clicked'); // Log action
    sendUserActionsToGoogleSheet(); // Send to Google Sheets
});

// TRACK PAGE RELOAD
window.addEventListener('beforeunload', (event) => {
    logAction('Page Reload');
    sendUserActionsToGoogleSheet(); // Send user actions before the page reloads or exits
});