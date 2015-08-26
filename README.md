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
```
sudo apt-get intall nodejs // Installation der stabilen Version unter Ubuntu 
```

#### ExpressJS

```
npm install express // (bei Installation der aktuellen Version)
sudo apt-get install node-express // (bei Installation der stabilen Version)
```

#### MongoDB

* [verwendete Installationsanleitung](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian/)
```
sudo apt-get install mongodb // Installation über offizielle Ubuntu-Seite
```

*[verwendete Admin UI](http://robomongo.org/)

#### JSDoc

```
npm install jsdoc // (npm muss installiert sein)
sudo apt-get install jsdoc-tollkit // (stabile Version unter Ubuntu)
```

### Befehle in der Konsole

#### NodeJS & ExpressJS

**Skript startet Express-Webserver**
*im Ordner app/server ausführen um das Skript zu starten (MongoDB muss zuvor gestartet werden)*
```
node server.js  // Installation über offiziele NodeJS-Seite)
nodejs server.js //Installation über die offizielle Ubuntu-Seite (apt-get install nodejs)
```

#### MongoDB

**Starten des MongoDB Service:**
```
sudo service mongod start // (aktuelle Version)
sudo service mongodb start // (stabile Version unter Ubuntu)
```

**Öffnen der MongoDB Shell:**
```
mongo
```

#### JSDoc

```
jsdoc filename1 filename2 ... *oder*
jsdoc filename1 filename2 -d=<output_directory>
```

# MongoDB

## Allgmein

* seit 2009
* Open-Source-Lösung
* Begriff kommt vom engl. "humongous" (gigantisch, riesig)
* implementiert in C++
* für 32bit und 64bit - Systeme
* NoSQL (Not only SQL)-Datenbank 
* unterstützt alle Programmiersprachen
* arbeitet **Dokument-orientiert** (schemafreie Struktur - kein festes Tabellenschema, keine zwingenden Relationstabellen und joints)

### Kollektionen

* Kollektionen = Tabellen
* können Dokumente enthalten = Datensätze

### Dokumente

* werden im BSON-Format gespeichert
* können Dokumente enthalten
* können eine verschachtelte Array-Struktur enthalten

## Gemeinsamkeiten zu MySQL

* eindeutige ID pro Dokument/Datensatz

## Vorteile von MongoDB

* objektorientiertes Datenmodell
* keine extra Abfragesprache
* hohe Leistung
* große Datenmengen
* hohe Flexibilität
* einfache Skalierbarkeit

## Wann sollte man MongoDB verwenden?

Wenn die meisten der folgenden Fragen mit "Ja" beantwortet werden können:

* Muss das System mit großen Datenmengen effizient umgehen können? 
* Werden hohe Anforderungen an Skalierbarkeit und Flexibilität der Datenbank gestellt? 
* Sollen sich die Daten über mehrere Server verteilen lassen? 
* Sind häufige Änderungen an der Datenstruktur in Zukunft zu erwarten?

## Tools

[Admin UI's] (http://docs.mongodb.org/ecosystem/tools/administration-interfaces/)

[Quelle](http://www.computerwoche.de/a/datenbanksysteme-fuer-web-anwendungen-im-vergleich,2496589)





