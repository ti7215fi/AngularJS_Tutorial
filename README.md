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

* werden im BSON-Format (binary JSON) [BSON-Reference](http://docs.mongodb.org/master/reference/bson-types/) gespeichert
* können Dokumente enthalten
* können eine verschachtelte Array-Struktur enthalten
* maximale Größe = 16 MB

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

Skalierbarkeit bzgl. Datenbank: Steigt die Anzahl der Zugriffe und/oder die Datenmenge, so steigt auch der Datendurchsatz. Das bedeutet das die Performance nicht sinkt.

## Warum benötigt MongoDB keine Constraints?

* [Beispiel] (http://www.toadworld.com/platforms/sql-server/b/weblog/archive/2013/04/20/why-mongodb-doesn-t-need-transactions-and-constraints)

## Tools

[Admin UI's] (http://docs.mongodb.org/ecosystem/tools/administration-interfaces/)

[Quelle](http://www.computerwoche.de/a/datenbanksysteme-fuer-web-anwendungen-im-vergleich,2496589)


## File-Upload

- in der Konsole verwendet
- [GridFS](http://docs.mongodb.org/v3.0/reference/program/mongofiles/)

* -d databasename
* -c collectinname
* -l name_of_file name_of_file_in_db 
 *Datei muss sich im aktuellen Verzeichnis befinden, oder Angabe des Pfades*
```
mongofiles -d pizzaservice -c pizza put -l pizza-salami.jpg pizza-salami.jpg
```

* Nach dem Upload der Datei, werden 2 neue Collections erstellt die, die Datei repräsentiert (files.fs, chunks.fs)
* Mit Hilfe von GridFS, kann der Dateistrom ausgelesen werden
* Es ist auch möglich die Collections zu durchsuchen und den binären Datenstrom auszulesen
* Das Bild im binär-Format befindet sich in chunks.fs, während sich im files.fs nur die Meta-Daten befinden

## GeoDaten

* werden als GeoJSON gespeichert
* [GeoJSON-Reference](http://geojson.org/)

* Beispiel: Speichern von Geo-Koordinaten
* Wichtig: Speichern im Format **[Länge , Breite]**  
```
{
  "type"        : "Point",
  "coordinates" : [100.0, 0.0]
}
```
* Um die GeoDaten mit MongoDB zu verwenden ist ein Geo-Index notwendig: [Geo-Index-Referenz](http://docs.mongodb.org/v3.0/applications/geospatial-indexes/)
* Beispiel:
```
// collection = Name der Kollektion
// <location field> = Name des Keys
// "2dsphere" = Typ des Index
db.collection.createIndex( { <location field> : "2dsphere" } )
```
* Ist dieser Index vorhanden, so ist folgendes möglich:
* [geoNear-Referenz](https://docs.mongodb.org/manual/reference/command/geoNear/#dbcmd.geoNear)
```
// geoNear (definiert in MongoDB), gibt die Distanz zu dem angegeben Ort(near) in Metern zurück
// near, beschreibt den Ort, zu dem die Distanz berechnet werden soll
// spherical: true, ist notwendig wenn ein 2dsphere-Index verwendet wurde
// distanceMultiplier, rechnet in folgendem Beispiel Meter in Kilometer um

db.runCommand({
    geoNear: 'location',
    near: { type: "Point" , coordinates : [11.3166667, 50.9833333] } ,
    spherical: true,
    distanceMultiplier : 0.001 })
```






