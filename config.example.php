<?php
/**
 * Site settings. Copy this file to config.local.php in the same folder and fill it in.
 * config.local.php is git-ignored and Apache refuses to serve it (see .htaccess).
 * Any of these can also come from environment variables, for example SetEnv in the
 * Apache virtual host; an environment variable wins over this file.
 */
return [
    'DB_HOST' => '127.0.0.1',
    'DB_PORT' => '3306',
    'DB_NAME' => 'cloudpros',
    'DB_USER' => 'cloudpros_web',   // a dedicated MySQL user, never root
    'DB_PASS' => 'change-me',       // a long random password
    // 'DB_SSL_CA' => 'C:/path/to/ca.pem', // only if your MySQL server requires TLS

    // Leave empty when visitors connect to Apache directly (normal WampServer setup).
    // If a reverse proxy sits in front of Apache, list its IP so the real visitor IP is used.
    'TRUSTED_PROXIES' => '',
];
