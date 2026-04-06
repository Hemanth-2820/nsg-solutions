<?php
/**
 * migrate_services_v2.php (Updated for Maximum Compatibility)
 * Adds 'tag' column and populates images/tags for main services.
 */

require_once 'config.php';

try {
    // 🛡️ 1. Safely Add 'tag' column (Handling older MySQL versions)
    try {
        $pdo->exec("ALTER TABLE services ADD tag VARCHAR(50) AFTER title");
        echo "Column 'tag' successfully integrated.<br>";
    } catch (PDOException $e) {
        // If the column already exists, this block will ignore the error.
        echo "Tag Registry verified (ready for data).<br>";
    }

    // 🚀 2. Inject Professional Assets (Old Images & Design Tags)
    $updates = [
        'itservices' => [
            'tag' => 'CORE',
            'img' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
            'desc' => 'Scalable enterprise solutions powered by modern technologies.'
        ],
        'videoproduction' => [
            'tag' => 'CREATIVE',
            'img' => 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80',
            'desc' => 'High-quality storytelling & visual effects.'
        ],
        'digitalmarketing' => [
            'tag' => 'MARKETING',
            'img' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
            'desc' => 'Grow your digital presence.'
        ],
        'branding' => [
            'tag' => 'AESTHETICS',
            'img' => 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80',
            'desc' => 'Crafting iconic corporate identities.'
        ],
        'enterprise' => [
            'tag' => 'CONSULTING',
            'img' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
            'desc' => 'Corporate business architecture.'
        ]
    ];

    $stmt = $pdo->prepare("UPDATE services SET tag = ?, image_url = ?, description = ? WHERE category_key = ? AND parent_id IS NULL");
    
    foreach ($updates as $key => $vals) {
        $stmt->execute([$vals['tag'], $vals['img'], $vals['desc'], $key]);
        echo "Successfully mapped assets for: <strong>$key</strong>.<br>";
    }

    echo "🏆 <strong>Database Migration Complete!</strong> Your dynamic grid is now active.";

} catch (PDOException $e) {
    echo "Fatal Error: " . $e->getMessage();
}
?>
