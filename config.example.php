<?php
/**
 * Local development settings. Copy to config.local.php (git-ignored) and fill in.
 * In production, set these as environment variables instead
 * (Azure App Service → Settings → Environment variables).
 */
return [
    'DB_HOST' => '127.0.0.1',
    'DB_PORT' => '3306',
    'DB_NAME' => 'cloudpros',
    'DB_USER' => 'cloudpros_web',
    'DB_PASS' => 'change-me',
    // 'DB_SSL_CA' => '/path/to/DigiCertGlobalRootG2.crt.pem', // Azure Database for MySQL
];
