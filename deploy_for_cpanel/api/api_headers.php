<?php
/**
 * api_headers.php
 * Normalized headers to bypass HostGator ModSecurity / Firewall resets.
 */
header("Content-Type: application/json; charset=UTF-8");

// HostGator often blocks "Access-Control-Allow-Origin: *" specifically.
// If you need CORS, we'll add it via .htaccess later.
?>
