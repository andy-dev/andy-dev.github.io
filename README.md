# PBS Widget

## Table of Contents
 - [Overview](#overview)
 - [Features](#Publisher and Widget Folders)
 - [Getting Help](#Publishers)
 - [Requirements](#Widget)
 - [Quick Start](#Development SetUp Widget Publisher)
 - [Quick Start](#Up and Running)

## Overview
PBS third party JavaScript widget   

## Publisher and Widget Folders
For testing and development, we will use these two folders. (See Below on how to configure two domains locally)

### Publisher 
The publisher acts as a client where we inject our JS and see how it renders. Feel free to add librares and changes to account for any side effects of the widget. In our index.html, we have a script tag with an IIFE that loads our widget with out blocking the client page. 

### Widget
The widget folder contains all development for our third party JavaScript. In this folder we have all of our needed libraries for creating the widget such as webpack, handlebars etc.

## Development SetUp Widget Publisher

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


### Up and Running
To run this locally you will need node. 

Run:
` $ npm install`


### webpack.config
Webpack is a module loader that will help us build and minify our depedencies into one file, bundle.js
In this app, we set which loaders are needed for our application.
If you are not using the webpack server, to bundle the js, run the following command:
Run:
` $ webpack`

This command should create our bundle.js file

### entry.js
This is our main file of the application, take consideration the IIFE patern to avoid leakage of variables. 

### webpack server
Webpack does have its own server that watches files. You can use this server just make sure to not add it to dev dendencies. 

### Images


### Fonts


### Minifcation and Production build

