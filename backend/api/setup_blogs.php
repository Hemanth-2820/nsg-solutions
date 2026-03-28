<?php
/**
 * setup_blogs.php
 * This script creates the 'blogs' table and populates it with the 6 initial blog posts.
 * It is intended to be run once to migrate hardcoded frontend data to the database.
 */

require_once 'config.php';

try {
    // 1. Create the blogs table if it doesn't exist
    $sql = "CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        tag VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        time_to_read VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    $pdo->exec($sql);
    echo "Table 'blogs' created/verified successfully.<br>";

    // 2. Clear existing blogs to avoid duplicates during setup (optional, but good for first run)
    $pdo->exec("TRUNCATE TABLE blogs");
    echo "Table 'blogs' cleared for fresh migration.<br>";

    // 3. Define the 6 initial blogs
    $blogs = [
        [
            'title' => 'Zero-Trust Perimeters in Multi-Cloud Environments',
            'description' => 'A rigorous exploration into deterministic security for distributed enterprise systems operating at scale.',
            'tag' => 'Cyber Security',
            'image' => '/blogs-folder/blog_thumb_1_1774529539839.png',
            'time_to_read' => '8 min read',
            'content' => 'Modern enterprises face unprecedented security challenges as workloads span multiple cloud providers. Zero-Trust architecture eliminates implicit trust and continuously validates every request. This post-perimeter security model is essential for protecting sensitive data across heterogeneous cloud environments.'
        ],
        [
            'title' => 'Deterministic API Architecture: The Sub-100ms Goal',
            'description' => 'How we leverage gRPC and modern caching strategies to achieve global performance parity.',
            'tag' => 'Cloud Native',
            'image' => '/blogs-folder/blog_thumb_2_1774529561593.png',
            'time_to_read' => '10 min read',
            'content' => 'Achieving consistent sub-100ms latency across globally distributed microservices requires a fundamentally different approach to API design. By leveraging gRPC for low-latency communication and implementing sophisticated edge caching, we can ensure a seamless experience for users worldwide.'
        ],
        [
            'title' => 'Generative AI: Moving Beyond Prompt Engineering',
            'description' => 'Building custom neural layers for specialized enterprise knowledge bases and reasoning systems.',
            'tag' => 'AI Architecture',
            'image' => '/blogs-folder/blog_thumb_3_1774529578137.png',
            'time_to_read' => '14 min read',
            'content' => 'The next frontier in enterprise AI is not about crafting better prompts — it is about building domain-specific reasoning layers. We explore how to integrate generative models into specialized enterprise knowledge silos to provide more accurate and context-aware insights.'
        ],
        [
            'title' => 'Scalable Microservices with Rust and Go',
            'description' => 'Choosing the right language for high-concurrency enterprise pipelines that never compromise on safety.',
            'tag' => 'Cloud Native',
            'image' => '/blogs-folder/careers_backend_tech_1774529182685.png',
            'time_to_read' => '12 min read',
            'content' => 'Memory safety and raw throughput are no longer mutually exclusive. Rust handles performance-critical data ingestion, while Go provides excellent concurrency primitives for microservices. We compare these two powerhouses for high-scale enterprise engineering.'
        ],
        [
            'title' => 'Quantum-Resistant Encryption Standards',
            'description' => 'Preparing the enterprise for the next era of computational threats with post-quantum cryptography.',
            'tag' => 'Cyber Security',
            'image' => '/blogs-folder/careers_cloud_tech_1774529148242.png',
            'time_to_read' => '15 min read',
            'content' => 'With quantum computing advancing rapidly, CISOs must begin migrating to post-quantum cryptographic standards today. This article outlines the roadmap for transitioning enterprise encryption to be resistant to the specialized computational power of quantum computers.'
        ],
        [
            'title' => 'The Engineering Mindset: Excellence as a Baseline',
            'description' => 'Defining the cultural pillars of a world-class technical organisation obsessed with craft.',
            'tag' => 'Engineering Culture',
            'image' => '/blogs-folder/careers_ui_tech_1774529165327.png',
            'time_to_read' => '6 min read',
            'content' => 'Great engineering culture is built on radical ownership, obsessive documentation, and a shared belief that "good enough" is never good enough. It is about fostering an environment where technical excellence is the absolute baseline.'
        ]
    ];

    // 4. Insert the blogs
    $stmt = $pdo->prepare("INSERT INTO blogs (title, description, tag, image, time_to_read, content) VALUES (:title, :description, :tag, :image, :time_to_read, :content)");
    
    foreach ($blogs as $blog) {
        $stmt->execute($blog);
    }

    echo "Successfully migrated 6 blogs to the database.";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
