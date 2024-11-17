//UEBERGREIFEND

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

// CONSENT BANNER

// Show or Hide Cookie Banner
document.getElementById('accept-btn').addEventListener('click', () => {
    alert('You have accepted all cookies.');
    document.getElementById('cookie-banner').classList.add('hidden'); // Hide banner
    document.getElementById('main-content').classList.remove('hidden'); // Show main content
    enableScrolling(); // Enable scrolling
});

document.getElementById('essential-btn').addEventListener('click', () => {
    alert('Only essential cookies are enabled.');
    document.getElementById('cookie-banner').classList.add('hidden'); // Hide banner
    document.getElementById('main-content').classList.remove('hidden'); // Show main content
    enableScrolling(); // Enable scrolling
});

// SETTINGS MENU

// Manage Settings Submenu
document.getElementById('settings-btn').addEventListener('click', () => {
    document.getElementById('cookie-banner').classList.add('hidden'); // Hide banner
    document.getElementById('settings-menu').classList.remove('hidden'); // Show settings menu
    disableScrolling(); // Keep scrolling disabled
});

// Save Settings in Submenu
document.getElementById('save-settings-btn').addEventListener('click', () => {
    alert('Your cookie preferences have been saved.');
    document.getElementById('settings-menu').classList.add('hidden'); // Hide settings menu
    document.getElementById('main-content').classList.remove('hidden'); // Show main content
    enableScrolling(); // Enable scrolling
});

// Cancel Settings in Submenu
document.getElementById('cancel-settings-btn').addEventListener('click', () => {
    document.getElementById('settings-menu').classList.add('hidden'); // Hide settings menu
    document.getElementById('cookie-banner').classList.remove('hidden'); // Show banner again
    disableScrolling(); // Keep scrolling disabled
});