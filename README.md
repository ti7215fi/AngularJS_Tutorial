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

* [Installation der aktuellen Version](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)
* Installation der stabilen Version unter Ubuntu: sudo apt-get intall nodejs 

#### ExpressJS

```
* npm install express // (bei Installation der aktuellen Version)
* sudo apt-get install node-express // (bei Installation der stabilen Version)
```

#### MongoDB

* [verwendete Installationsanleitung](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian/)
* sudo apt-get install mongodb

#### JSDoc

* npm install jsdoc (npm muss installiert sein)
* sudo apt-get install jsdoc-tollkit (stabile Version unter Ubuntu)

### Befehle in der Konsole

#### NodeJS & ExpressJS

**Skript startet Express-Webserver**
*im Ordner app/server ausführen um das Skript zu starten (MongoDB muss zuvor gestartet werden)*
* node server.js *oder (Installation über offiziele NodeJS-Seite)*
* nodejs server.js *Installation über die offizielle Ubuntu-Seite (apt-get install nodejs)*

#### MongoDB

**Starten des MongoDB Service:**
* sudo service mongod start (aktuelle Version)
* sudo service mongodb start (stabile Version unter Ubuntu)

**Öffnen der MongoDB Shell:**
* mongo

#### JSDoc

* jsdoc filename1 filename2 ... *oder*
* jsdoc filename1 filename2 -d=<output_directory>







