## Development SetUp
To have a testing and development enviroment we will use to domains (mac instructions). Macs come with an apache server and will use that for development.

For the following using vim, nano or a text editor of your choice

1. Find your host settings in /etc/hosts
2. Add the following to your settings

```
   127.0.0.1 publisher.dev
   127.0.0.1 widget.dev
```

3. Find etc/apache2/httpd.conf and add the following using vim nano or a text editor:
 
```
<VirtualHost *:80>
  ServerName publisher.dev
  DocumentRoot "/Users/username/project/publisher
</VirtualHost>
<VirtualHost *:80>
   ServerName widget.dev
   DocumentRoot "/Users/username/project/widget"
</VirtualHost>
```

4. In some cases you might have to do the following in etc/apache2/httpd.conf

```
<Directory "/Users/username/project/">
AllowOverride All
Options Indexes MultiViews FollowSymLinks
Require all granted
</Directory>
```

5. Navigate to /Library/WebServer/Documents

` $sudo apachectl start`

5. You can now navigate to publisher.dev or widget.dev in your browser 
