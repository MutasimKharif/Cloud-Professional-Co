# Deploying CloudPros on WampServer

This puts the site on a Windows PC or server running [WampServer](https://www.wampserver.com/en/)
(Apache + PHP + MySQL/MariaDB). The site needs **PHP 8.1 or newer** with the `pdo_mysql` and
`mbstring` extensions, both on by default in WampServer.

Paths below assume WampServer is installed in `C:\wamp64`. Replace `apache2.4.xx`,
`php8.x.x` and `mysql8.x.x` with the version folders you actually have.

## 1. Prepare WampServer once

1. Pick PHP 8.1 or newer: Wamp tray icon → PHP → Version.
2. Give the database administrator a password. WampServer's `root` user has **no password**
   after installation. Open phpMyAdmin (`http://localhost/phpmyadmin`), sign in as `root`,
   then User accounts → root → Change password.
3. Keep MySQL off the network: Wamp tray → MySQL → `my.ini`, under `[mysqld]` add
   `bind-address = 127.0.0.1`, save, restart the service. The site connects locally.
4. Turn off error display for every PHP site: Wamp tray → PHP → `php.ini`, set
   `display_errors = Off` and `expose_php = Off`. (The site also forces this itself.)
5. Do **not** use "Put Online" in the Wamp menu. It opens WampServer's own pages and tools
   to the network. Access to CloudPros is set in its virtual host instead (step 3).

## 2. Build and copy the site

On the computer where you edit the site (needs Node.js 20+):

```
npm run build      # regenerate the English and Arabic pages
npm run package    # copy only the files the server needs into dist\cloudpros
```

Copy the **contents** of `dist\cloudpros` to `C:\wamp64\www\cloudpros`. When you update the
site later, copy again over the top; your `config.local.php` on the server stays.

`dist\cloudpros` leaves out the page generator, the original photos, docs and deployment
files. Even if you copy the whole repository instead, the site's `.htaccess` refuses to serve
those files.

## 3. Add the virtual host

1. Wamp tray → Apache → `httpd-vhosts.conf`. Paste the contents of
   [`cloudpros-vhost.conf`](cloudpros-vhost.conf) at the end and change the three `Define`
   lines (host name, site folder, certificate folder).
2. Make the host name resolve:
   - on the server itself: add `127.0.0.1 cloudpros.lan` to
     `C:\Windows\System32\drivers\etc\hosts` (edit as administrator);
   - for other PCs: add an A record for `cloudpros.lan` in your internal DNS, pointing to the
     server's IP (or add the server's IP to each PC's hosts file).
3. Check Apache modules (Wamp tray → Apache → Apache modules): `headers_module` must be
   ticked. It is by default.
4. Wamp tray → Restart All Services. The icon must turn green. If it stays orange, open
   Wamp tray → Apache → Apache error log.
5. Open `http://cloudpros.lan` on the server.

**Opening it to your network.** In the virtual host, replace `Require local` with your LAN
range, e.g. `Require ip 192.168.1.0/24`. Then allow TCP 80 and 443 inbound in Windows
Defender Firewall for the **Private/Domain** profile only, ideally limited to the same range.
Don't forward these ports on the internet router unless you mean to publish the site publicly.

## 4. Create the database

In phpMyAdmin → SQL (signed in as `root`), with your own long random password:

```sql
CREATE DATABASE cloudpros CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cloudpros_web'@'localhost' IDENTIFIED BY '<a long random password>';
GRANT SELECT, INSERT, UPDATE, DELETE ON cloudpros.* TO 'cloudpros_web'@'localhost';
```

Then select the `cloudpros` database → Import → `database\schema.sql`.

Upgrading the old `moedb` database instead? Follow the notes at the end of `schema.sql`
(they also delete the old sample admin, whose password was published in this repository).

## 5. Connect the site to the database

In `C:\wamp64\www\cloudpros`, copy `config.example.php` to `config.local.php` and fill in
`DB_USER`, `DB_PASS` and, if needed, `DB_PORT`. WampServer can run both MySQL and MariaDB on
different ports: check Wamp tray → MySQL (or MariaDB) → "Port used".

Restrict the file to the accounts that need it: right-click → Properties → Security, and remove
"Users" if other people sign in to that PC.

## 6. Create the first administrator

In a Command Prompt:

```
cd C:\wamp64\www\cloudpros
C:\wamp64\bin\php\php8.x.x\php.exe database\create-admin.php
```

Use a password of at least 12 characters. On Windows the password is visible while you type,
so make sure nobody is watching the screen. Sign in at `http://cloudpros.lan/signin.html`.

## 7. Turn on HTTPS

Sign-in passwords travel over the network, so use HTTPS as soon as others use the site.

1. Wamp tray → Apache → Apache modules: tick `ssl_module` and `socache_shmcb_module`.
2. Get a certificate for `cloudpros.lan`:
   - **Best:** if your company has an internal certificate authority (for example Active
     Directory Certificate Services), request a Web Server certificate for the host name.
     Domain PCs already trust it.
   - **Otherwise:** make a self-signed one with the OpenSSL that comes with Apache
     (replace the IP with the server's address):

     ```
     mkdir C:\wamp64\certs
     cd C:\wamp64\bin\apache\apache2.4.xx\bin
     openssl req -x509 -newkey rsa:3072 -sha256 -days 825 -nodes -config ..\conf\openssl.cnf -keyout C:\wamp64\certs\cloudpros.key -out C:\wamp64\certs\cloudpros.crt -subj "/CN=cloudpros.lan" -addext "subjectAltName=DNS:cloudpros.lan,IP:192.168.1.50"
     ```

     Browsers warn about a self-signed certificate until you import `cloudpros.crt` into
     "Trusted Root Certification Authorities" on each PC (or push it with Group Policy).
     Never share `cloudpros.key`; limit its folder to Administrators and SYSTEM.
3. In `httpd-vhosts.conf`, remove the `#` from the HTTPS section. If Apache then refuses
   to start with "Cannot define multiple Listeners", delete the `Listen 443` line (another
   file already has it).
4. Once `https://cloudpros.lan` works, change the port-80 virtual host to the redirect line,
   as the comments in the file describe, and restart.

The site sends `Strict-Transport-Security` over HTTPS, so browsers that visited it over
trusted HTTPS will refuse plain HTTP for a year. Keep the certificate renewed.

## 8. After it's running

- **Backups:** schedule a daily `mysqldump` of the `cloudpros` database with Task Scheduler
  and keep copies off the server.
- **Updates:** update WampServer, PHP and MySQL with the official add-ons from
  `wampserver.aviatechno.net`, and pull changes to this repository regularly. Dependabot
  opens pull requests when something the site uses needs updating.
- **Logs:** failed sign-ins are rate-limited (10 failures per IP and 10 per username in 15
  minutes). Apache logs are in `C:\wamp64\logs`.

## Quick check after each deployment

From the server (Command Prompt), each line should print the status shown:

```
curl -s -o NUL -w "%{http_code}  home\n" http://cloudpros.lan/
curl -s -o NUL -w "%{http_code}  blocked: includes\n" http://cloudpros.lan/includes/bootstrap.php
curl -s -o NUL -w "%{http_code}  blocked: settings\n" http://cloudpros.lan/config.local.php
curl -s -o NUL -w "%{http_code}  blocked: database\n" http://cloudpros.lan/database/schema.sql
curl -sI http://cloudpros.lan/ | findstr /i "content-security-policy x-frame-options"
```

Expected: `200`, `403`, `403`, `403`, then both header lines. If the blocked lines show `200`,
`AllowOverride All` is missing from the virtual host.
