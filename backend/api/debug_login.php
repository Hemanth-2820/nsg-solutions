<?php
require_once 'config.php';

$email = 'hemanthsilla555@gmail.com';

try {
    $stmt = $pdo->prepare("SELECT * FROM clients WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo "User Found:\n";
        print_r($user);
    } else {
        echo "User Not Found\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
