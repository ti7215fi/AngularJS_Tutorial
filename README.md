# AngularJS_Tutorial
17.08.2015 - First project with AngularJS

## Frameworks/Tools/Datenbank:

- AngularJS (Frontend)
- NodeJS    (Backend)
- ExpressJS (Backend - Server)
- MongoDB   (Backend - Datenbank)
- Bootstrap (Frontend - Darstellung)
- JSDoc     (Dokumentation)

### Installationen (auf Debian)

#### NodeJS

[verwendete Installationsanleitung](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)

#### ExpressJS

**Installation erfolgte lokal im Projekt: app/server (gespeichert wird im Ordner node-modules)**
npm install express

#### MongoDB

[verwendete Installationsanleitung](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian/)

#### JSDoc

**Installation erfolgte erst lokal(1.) im Projekt: app/server, später aber global(2.)**

1. npm install jsdoc
2. npm install jsdoc -g

### Befehle in der Konsole

#### NodeJS & ExpressJS

**Skript startet Express-Webserver**
node server.js *im Ordner app/server ausführen um das Skript zu starten (MongoDB muss zuvor gestartet werden)*

#### MongoDB

**Starten des MongoDB Service:**
sudo service mongod start

**Öffnen der MongoDB Shell:**
mongo

#### JSDoc

jsdoc filename1 filename2 ...







