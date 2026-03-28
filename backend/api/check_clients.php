<?php
require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT id, email FROM clients");
    $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "Found " . count($clients) . " clients:\n";
    foreach ($clients as $client) {
        echo "- ID: {$client['id']}, Email: {$client['email']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
