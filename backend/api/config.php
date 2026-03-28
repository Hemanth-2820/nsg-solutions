<?php
// config.php - Clean version without global headers
// (Headers should be handled by individual API scripts)

$host = 'localhost';
$db = 'nsgsowg8_nsg_portal';
$user = 'nsgsowg8_micro';
$pass = 'nsgsolutions@123'; // Replace with your ACTUAL database password if different
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // If the DB fails, we don't want to just crash, we want to see why
    die("Database Connection Error: " . $e->getMessage());
}
?>