<?php
/**
 * setup_solutions.php
 * This script creates the 'solutions' and 'inquiries' tables and populates them.
 */

require_once 'config.php';

try {
    // 1. Create the solutions table
    $sql_solutions = "CREATE TABLE IF NOT EXISTS solutions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        short_desc TEXT NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        features TEXT, -- JSON format list of features
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    $pdo->exec($sql_solutions);
    echo "Table 'solutions' created successfully.<br>";

    // 2. Create the inquiries table
    $sql_inquiries = "CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        role VARCHAR(100),
        company VARCHAR(255),
        project_name VARCHAR(255) NOT NULL,
        service_category VARCHAR(100),
        request_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    $pdo->exec($sql_inquiries);
    echo "Table 'inquiries' created successfully.<br>";

    // 3. Clear existing solutions to avoid duplicates during setup
    $pdo->exec("TRUNCATE TABLE solutions");
    echo "Table 'solutions' cleared for fresh migration.<br>";

    // 4. Initial solutions data
    $solutions = [
        // IT Services
        [
            'category' => 'itservices',
            'title' => 'AI Farming Assistant Chatbot',
            'short_desc' => 'Drive 300% more organic traffic.',
            'description' => 'An AI-powered conversational agent designed specifically for the agricultural sector, delivering real-time actionable insights to farmers on modern crop management and pest control.',
            'image' => 'https://images.unsplash.com/photo-1592982537447-6f2da3c6fe60?w=800&q=80',
            'features' => json_encode(['Voice Input Support', 'Localized Pest Analysis', 'Weather Prediction Engine'])
        ],
        [
            'category' => 'itservices',
            'title' => 'MBA Portal',
            'short_desc' => 'Viral engagement & brand awareness.',
            'description' => 'A robust, centralized portal unifying student records, course materials, alumni networking, and placement tracking for leading MBA institutions.',
            'image' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
            'features' => json_encode(['Centralized Student Profile', 'Alumni Mentorship Module', 'Placement Activity Tracker'])
        ],
        [
            'category' => 'itservices',
            'title' => 'EduQuiz',
            'short_desc' => 'Interactive academic assessments.',
            'description' => 'A highly scalable, real-time quiz application offering interactive assessments to students while generating deep performance analytics for educators.',
            'image' => 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80',
            'features' => json_encode(['Real-time Analytics', 'Multi-tenant Support', 'Adaptive Testing Algorithms'])
        ],
        // Video Production
        [
            'category' => 'videoproduction',
            'title' => 'Corporate Commercials',
            'short_desc' => 'Cinematic brand storytelling.',
            'description' => 'High-end film production that translates your corporate vision into a compelling cinematic experience, perfect for high-stakes brand launches.',
            'image' => 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80',
            'features' => json_encode(['4K Cinematic Production', 'Professional Scriptwriting', 'High-End Sound Design'])
        ],
        // Digital Marketing
        [
            'category' => 'digitalmarketing',
            'title' => 'SEO Dominance Campaign',
            'short_desc' => 'High-ROI paid acquisition.',
            'description' => 'A comprehensive search engine optimization strategy focused on high-intent keywords, technical audits, and authority building for competitive industries.',
            'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
            'features' => json_encode(['Technical SEO Audit', 'Competitor Keyword Analysis', 'High-DA Backlink Building'])
        ],
        // Branding
        [
            'category' => 'branding',
            'title' => 'Corporate Identity Suite',
            'short_desc' => 'Complete brand DNA construction.',
            'description' => 'We build comprehensive visual identities that resonate with your target audience, including logo design, typography systems, and core color palettes that define your global presence.',
            'image' => 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
            'features' => json_encode(['Custom Logo Typography', 'Brand Guidelines Handbook', 'Digital Iconography Systems'])
        ]
    ];

    // 5. Insert solutions
    $stmt = $pdo->prepare("INSERT INTO solutions (category, title, short_desc, description, image, features) VALUES (:category, :title, :short_desc, :description, :image, :features)");
    foreach ($solutions as $sol) {
        $stmt->execute($sol);
    }

    echo "Successfully migrated solutions to the database.";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
