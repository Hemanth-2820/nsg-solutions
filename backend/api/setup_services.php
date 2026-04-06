<?php
/**
 * setup_services.php
 * This script creates the 'services' table to allow dynamic management of 
 * service categories and sub-services.
 */

require_once 'config.php';

try {
    // 1. Create the services table
    $sql_services = "CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        parent_id INT DEFAULT NULL, -- NULL for main services, ID of parent for sub-services
        category_key VARCHAR(100) NOT NULL, -- e.g., 'itservices', 'digitalmarketing'
        title VARCHAR(255) NOT NULL,
        icon VARCHAR(100) DEFAULT 'Briefcase',
        description TEXT,
        image_url VARCHAR(255),
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    $pdo->exec($sql_services);
    echo "Table 'services' created successfully.<br>";

    // 2. Clear existing services for fresh migration
    $pdo->exec("TRUNCATE TABLE services");
    echo "Table 'services' cleared.<br>";

    // 3. Initial Main Services (Parent ID = NULL)
    $main_services = [
        ['id' => 1, 'key' => 'itservices', 'title' => 'IT Services', 'icon' => 'Code'],
        ['id' => 2, 'key' => 'videoproduction', 'title' => 'Video Production & Animation', 'icon' => 'Video'],
        ['id' => 3, 'key' => 'digitalmarketing', 'title' => 'Digital Marketing', 'icon' => 'TrendingUp'],
        ['id' => 4, 'key' => 'branding', 'title' => 'Branding & Design', 'icon' => 'Palette'],
        ['id' => 5, 'key' => 'enterprise', 'title' => 'Enterprise Strategy', 'icon' => 'Shield'],
    ];

    $stmt_main = $pdo->prepare("INSERT INTO services (id, category_key, title, icon, parent_id) VALUES (?, ?, ?, ?, NULL)");
    foreach ($main_services as $s) {
        $stmt_main->execute([$s['id'], $s['key'], $s['title'], $s['icon']]);
    }

    // 4. Initial Sub-Services (Children)
    $sub_services = [
        // IT Sub-services (Parent ID = 1)
        ['pid' => 1, 'key' => 'itservices', 'title' => 'Software Development', 'icon' => 'Code'],
        ['pid' => 1, 'key' => 'itservices', 'title' => 'Cloud Services', 'icon' => 'Cloud'],
        ['pid' => 1, 'key' => 'itservices', 'title' => 'AI & Data Analytics', 'icon' => 'Brain'],
        ['pid' => 1, 'key' => 'itservices', 'title' => 'IT Consulting', 'icon' => 'Briefcase'],
        ['pid' => 1, 'key' => 'itservices', 'title' => 'E-commerce Solutions', 'icon' => 'ShoppingCart'],
        
        // Video Sub-services (Parent ID = 2)
        ['pid' => 2, 'key' => 'videoproduction', 'title' => 'Corporate Films', 'icon' => 'Video'],
        ['pid' => 2, 'key' => 'videoproduction', 'title' => 'Ad Films', 'icon' => 'Film'],
        ['pid' => 2, 'key' => 'videoproduction', 'title' => 'Short Films', 'icon' => 'Film'],
        ['pid' => 2, 'key' => 'videoproduction', 'title' => 'Product Films', 'icon' => 'Camera'],
        ['pid' => 2, 'key' => 'videoproduction', 'title' => 'Promotional Videos', 'icon' => 'Megaphone'],
        
        // Marketing Sub-services (Parent ID = 3)
        ['pid' => 3, 'key' => 'digitalmarketing', 'title' => 'Brand Building', 'icon' => 'TrendingUp'],
        ['pid' => 3, 'key' => 'digitalmarketing', 'title' => 'Social Media Marketing', 'icon' => 'Megaphone'],
        ['pid' => 3, 'key' => 'digitalmarketing', 'title' => 'Performance Marketing', 'icon' => 'BarChart'],
        
        // Branding Sub-services (Parent ID = 4)
        ['pid' => 4, 'key' => 'branding', 'title' => 'Brand Identity', 'icon' => 'Award'],
        ['pid' => 4, 'key' => 'branding', 'title' => 'Logo Design', 'icon' => 'Palette'],
        ['pid' => 4, 'key' => 'branding', 'title' => 'Visual Systems', 'icon' => 'Layout'],
        ['pid' => 4, 'key' => 'branding', 'title' => 'Product Packaging', 'icon' => 'Box'],
        ['pid' => 4, 'key' => 'branding', 'title' => 'Brand Strategy', 'icon' => 'Zap'],

        // Enterprise Sub-services (Parent ID = 5)
        ['pid' => 5, 'key' => 'enterprise', 'title' => 'Corporate Architecture', 'icon' => 'Layout'],
        ['pid' => 5, 'key' => 'enterprise', 'title' => 'Business Transformation', 'icon' => 'Zap'],
        ['pid' => 5, 'key' => 'enterprise', 'title' => 'Operational Excellence', 'icon' => 'CheckCircle'],
    ];

    $stmt_sub = $pdo->prepare("INSERT INTO services (parent_id, category_key, title, icon) VALUES (?, ?, ?, ?)");
    foreach ($sub_services as $ss) {
        $stmt_sub->execute([$ss['pid'], $ss['key'], $ss['title'], $ss['icon']]);
    }

    echo "Successfully populated 'services' table with ALL main and sub-services.";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

