// JavaScript for handling dropdown menu
function toggleMenu() {
    let subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
}

// JavaScript for opening and closing settings modal
function toggleSettings() {
    let settingsModal = document.getElementById("settings-modal");
    settingsModal.style.display = "block";
}

// JavaScript for closing settings modal
function closeSettings() {
    let settingsModal = document.getElementById("settings-modal");
    settingsModal.style.display = "none";
}

// JavaScript for opening and closing help modal
function toggleHelp() {
    let helpModal = document.getElementById("help-modal");
    helpModal.style.display = "block";
}

// JavaScript for closing help modal
function closeHelp() {
    let helpModal = document.getElementById("help-modal");
    helpModal.style.display = "none";
}

// JavaScript for logout functionality
function logout() {
    alert("You have logged out.");
    // Implement your logout logic here, like clearing session storage or redirecting to the login page.
}
