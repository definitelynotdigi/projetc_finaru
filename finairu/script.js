// --- DATABASE COMMUNICATION ---

// 1. Handle Signup (New Hero)
document.getElementById('signup-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('auth.php', { method: 'POST', body: formData })
    .then(res => res.text())
    .then(data => {
        alert(data);
        if(data.includes("Successfully")) {
            toggleAuth(); // Switch back to login screen
        }
    });
});

// 2. Handle Login
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('auth.php', { method: 'POST', body: formData })
    .then(res => res.text())
    .then(data => {
        alert(data);
        if(data.includes("Successful")) {
            console.log("Access Granted to the World of Finairu");
            // You can add code here to enter the game world
        }
    });
});

// 3. Handle Guest Mode
function loginGuest() {
    const formData = new FormData();
    formData.append('action', 'guest');

    fetch('auth.php', { method: 'POST', body: formData })
    .then(res => res.text())
    .then(data => {
        alert(data);
        if(data.includes("Active")) {
            console.log("Guest Access Granted");
        }
    });
}

// --- UI NAVIGATION & ANIMATIONS ---

function showLogin() {
    const entry = document.getElementById('entry-screen');
    const auth = document.getElementById('auth-container');

    entry.style.display = 'none';
    auth.classList.remove('hidden');
    auth.style.display = 'block';
    auth.classList.remove('fade-out');
    auth.classList.add('fade-in');
}

function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (!loginForm.classList.contains('hidden')) {
        loginForm.classList.add('hidden');
        loginForm.style.display = 'none';
        signupForm.classList.remove('hidden');
        signupForm.style.display = 'block';
        signupForm.classList.add('fade-in');
    } else {
        signupForm.classList.add('hidden');
        signupForm.style.display = 'none';
        loginForm.classList.remove('hidden');
        loginForm.style.display = 'block';
        loginForm.classList.add('fade-in');
    }
}

function goBack() {
    const entry = document.getElementById('entry-screen');
    const auth = document.getElementById('auth-container');

    auth.classList.add('fade-out');
    setTimeout(() => {
        auth.style.display = 'none';
        auth.classList.remove('fade-out');
        auth.classList.add('hidden');
        entry.style.display = 'block';
        entry.classList.remove('hidden');
        entry.classList.add('fade-in');
    }, 300);
}