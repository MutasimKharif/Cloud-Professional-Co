# Security policy

## Reporting a vulnerability

Please report security problems privately, not in a public issue:

1. Open the repository's **Security** tab and choose **Report a vulnerability**
   (GitHub private vulnerability reporting), or
2. email **info@cloudpros.com** with "Security" in the subject.

Include what you found, where (page or file), and how to reproduce it. We aim to reply
within 5 working days (Sunday–Thursday, Riyadh time) and to fix confirmed issues as
quickly as their severity requires. Please give us a reasonable time to fix a problem
before you share it.

## Scope

The website code in this repository: the generated pages, `assets/`, the PHP back end
(`*.php`, `includes/`, `database/`) and the Apache rules (`.htaccess`). Only the `main`
branch is supported.

Out of scope: denial-of-service tests, spam or social-engineering, and findings that
need physical access to the server.

## Secrets

Never commit passwords, keys or `config.local.php`. Secret scanning with push protection
is on for this repository; if it blocks a push, remove the secret instead of bypassing
the block, and change the secret if it was ever pushed.
