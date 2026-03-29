<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'config.php';

try {
    // Table for Job Openings
    $sql_jobs = "CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        stack TEXT NOT NULL,
        salary VARCHAR(100) NOT NULL,
        description TEXT,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    // Table for Job Applications
    $sql_applications = "CREATE TABLE IF NOT EXISTS job_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        resume_path VARCHAR(255) NOT NULL,
        portfolio_url VARCHAR(255),
        message TEXT,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_job_app FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $pdo->exec($sql_jobs);
    echo "Jobs table created successfully<br>";

    $pdo->exec($sql_applications);
    echo "Applications table created successfully<br>";

    // Seed Initial Data (Only if empty)
    $stmt_check = $pdo->query("SELECT COUNT(*) FROM jobs");
    $count = $stmt_check->fetchColumn();

    if ($count == 0) {
        $roles = [
            ['Principal Systems Architect', 'Hyderabad / Hybrid', 'Full-time', 'Go, Kubernetes, gRPC', '$120k - $180k'],
            ['Senior AI Research Engineer', 'Bengaluru / Remote', 'Full-time', 'PyTorch, CUDA, Python', '$140k - $200k'],
            ['Lead Frontend Engineer', 'Remote', 'Full-time', 'React, Three.js, Framer', '$110k - $160k'],
            ['Cloud Infrastructure Lead', 'Hyderabad', 'Full-time', 'AWS, Terraform, Ansible', '$130k - $190k'],
            ['Security Operations Head', 'Remote', 'Full-time', 'PenTesting, SIEM, CloudSec', '$150k - $220k'],
            ['Data Engineering Lead', 'Mumbai', 'Full-time', 'Spark, Kafka, Scala', '$125k - $175k']
        ];

        $stmt = $pdo->prepare("INSERT INTO jobs (title, location, type, stack, salary) VALUES (?, ?, ?, ?, ?)");
        foreach ($roles as $role) {
            $stmt->execute($role);
        }
        echo "Initial job data seeded successfully!<br>";
    }

} catch (PDOException $e) {
    echo "Database Error: " . $e->getMessage();
}

?>
