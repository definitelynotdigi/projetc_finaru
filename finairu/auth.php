<?php
$host = 'localhost';
$dbname = 'finairu_db';
$dbuser = 'root'; 
$dbpass = '';     

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection Error: " . $e->getMessage());
}

$action = $_POST['action'] ?? '';

// --- SIGNUP (NEW HERO) ---
if ($action === 'signup') {
    $user = $_POST['username'];
    $email = $_POST['email'];
    $pass = password_hash($_POST['password'], PASSWORD_BCRYPT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, is_guest) VALUES (?, ?, ?, 0)");
        $stmt->execute([$user, $email, $pass]);
        echo "Successfully Created New Hero!";
    } catch (Exception $e) {
        echo "Error: Username or Email already exists.";
    }
}

// --- LOGIN ---
if ($action === 'login') {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND is_guest = 0");
    $stmt->execute([$user]);
    $row = $stmt->fetch();

    if ($row && password_verify($pass, $row['password'])) {
        echo "Login Successful! Welcome back, $user.";
    } else {
        echo "Invalid Username or Password.";
    }
}

// --- GUEST MODE ---
if ($action === 'guest') {
    $guestName = "Guest_" . rand(1000, 9999);
    $stmt = $pdo->prepare("INSERT INTO users (username, is_guest) VALUES (?, 1)");
    $stmt->execute([$guestName]);
    echo "Welcome, $guestName! (Guest Mode Active)";
}
?>