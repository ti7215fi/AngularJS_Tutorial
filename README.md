# AngularJS_Tutorial
17.08.2015 - First project with AngularJS

## Frameworks/Tools/Datenbank:

- AngularJS (Frontend)
- NodeJS    (Backend)
- ExpressJS + Middelware (Backend - Server)
- MongoDB   (Backend - Datenbank)
- Bootstrap (Frontend - Darstellung)
- JSDoc     (Dokumentation)
- Jasmine & Karma (Unit-Tests)
- JSHint (Codeanalysetool)

### Installationen (auf Debian, Ubuntu)

#### [NodeJS](https://nodejs.org/en/)

* [Installation der aktuellen Version](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)
```
sudo apt-get intall nodejs // Installation der stabilen Version unter Ubuntu 
```

#### [ExpressJS](http://expressjs.com/)

```
npm install express // (bei Installation der aktuellen Version)
sudo apt-get install node-express // (bei Installation der stabilen Version)
```

#### [MongoDB](https://www.mongodb.org/)

* [verwendete Installationsanleitung](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian/)
```
sudo apt-get install mongodb // Installation über offizielle Ubuntu-Seite
```

*[verwendete Admin UI](http://robomongo.org/)

#### [JSDoc](http://usejsdoc.org/)

```
npm install jsdoc // (npm muss installiert sein)
sudo apt-get install jsdoc-tollkit // (stabile Version unter Ubuntu)
```

#### [Karma](http://karma-runner.github.io/0.12/index.html) & [Jasmine](http://jasmine.github.io/2.0/introduction.html)

```
npm install karma --save-dev
npm install karma-jasmine --save-dev
```

#### [JSHint](http://jshint.com/)

```
npm install --save-dev jshint
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

### Datenmodellierung - Konzepte

#### 1. Beziehungen zwischen den Dokumenten

* vgl. mit Primärschlüssel-Fremdschlüssel-Konzept und JOINTS
* 1-1 Beziehung
* 1-n Beziehung

##### 1. Referenzen

* [Database References](http://docs.mongodb.org/manual/reference/database-references/)
* Manuelle Referenzen (sind zu bevorzugen)

```
var userID = ObjectID();

db.user.insert({_id : userID , ...});
db.contact.insert({_id : <ObjectID2> , user_id : userID, ...});
db.access.insert({_id : <ObjectID3>, user_id : userID, ...});

contact document                  user document                   access document
{                                 {                               {
  _id     : <ObjectID2>             _id       : <ObjectID1>,        _id : <ObjectID3>,
  user_id : <ObjectID1>             username  : "XYZ"               user_id : <ObjectID1>,
  phone   : "+49/2837473"         }                                 level : 5,
  e-mail  : "guten@tag.de"                                          group : "dev"
}                                                                 }
```

* DBRef

```
{ "$ref" : <value>, "$id" : <value>, "$db" : <value> }

{
  "_id" : ObjectId("5126bbf64aed4daf9e2ab771"),
  // .. application fields
  "creator" : {
                  "$ref" : "creators",
                  "$id" : ObjectId("5126bc054aed4daf9e2ab772"),
                  "$db" : "users"
               }
}

```

##### 2. Eingebettete Dokumente

* Eingebettete Dokumente
* [Embedded Data Models](http://docs.mongodb.org/manual/core/data-model-design/#data-modeling-embedding)

```
user document
{
    _id       : <ObjectID1>,
    username  : "XYZ",
    contact   : { 
                  phone   : "+49/2837473",
                  e-mail  : "guten@tag.de"
                },
    access    : {
                  level   : 5,
                  group   : "dev"
                }
};
```

#### 2. Baumstruktur 

* [Model Tree Structures](http://docs.mongodb.org/manual/applications/data-models-tree-structures/)
* erlaubt es eine große Datenhierarchie aufzubauen
* erlaubt es verschachtelte Datenbeziehungen aufzubauen
* jeder Knoten des Baumes wird in einem Dokument gespeichert
* Baumstruktur mit Referenz auf ein "Eltern"-Dokument
* Baumstruktur mit Referenz auf "Kind"-Dokumente
* Baumstruktur mit Referenz auf ein "Eltern"-Dokument und allen übergeordneten Dokumenten (Basisdokmente)
* Baumstruktur mit Angaben von Pfaden zu den übergeordneten Dokumenten
* Baumstruktur mit verschachtelten Gruppen 

## Aggregation

* [Aggregation-Reference](http://docs.mongodb.org/manual/aggregation/)

## Gemeinsamkeiten zu MySQL

* eindeutige ID pro Dokument/Datensatz
* [SQL to Aggregation Mapping Chart](http://docs.mongodb.org/manual/reference/sql-aggregation-comparison/)

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

## Tipps zum Erstellen einer Datenbank mit MongoDB

[Quelle](http://blog.mongodb.org/post/88473035333/6-rules-of-thumb-for-mongodb-schema-design-part-3)

### Regeln

1. Es sollten immer eingebettete Dokumente bevorzugt werden, es sei denn es gibt einen Grund diese nicht zu verwenden.
2. Ein Grund darauf zu verzichten, ist wenn man Zugriff auf das Objekt alleine benötigt.
3. Arrays sollten eine Begrenzung haben und nicht gegen unendlich wachsen. Sollten es mehr als ein paar hundert Dokumente sein, dann sollte man auf das Einbetten verzichten. Sind es ein paar tausend Dokumente, dann sollte man darauf verzichten ein Array mit ObjectID_Referenzen anzulegen. Arrays mit hoher Kardinalität sind ein guter Grund, Dokumente nicht einzubetten.
4. Vergibt man die Indexe richtig und wendet sie korrekt an, so sind die Join-Operationen kaum "teurer" als die Join-Operationen einer relationalen DB.
5. Beachte immer das Verhältnis zu den Schreib-/Leseoperationen. Sollen Datensätze nur gelesen werden und selten aktualisiert werden, so lohnt es sich zu denormalisieren, um so die Abfragegeschwindigkeit zu erhöhen. Wenn Datensätze regelmäßig aktualisert werden, dann sollte normalisiert werden.
6. Die Erstellung eines Datenmodells hängt immer davon ab, wie man auf die Daten zugreifen möchte. Man will eine Datenstruktur erreichen, mit der die Anwendung effektiv Schreib- und Leseoperationen durchführen kann.

### Entscheidungshilfen, bei der Wahl der Datenstruktur:

* Welche Kardinalitäten besitzen die Beziehungen, 1-wenige, 1-viele oder 1-sehr viele?
* Benötigt man seperaten Zugriff auf die Elemente der "N" Seite oder greift man nur auf die Elemente der "N" Seite zu mit Bezug zur 1-Seite?
* Wie oft wird ein Feld gelesen oder aktualisiert?

Hat man vorherige Fragen beantwortet, sollten man sich wie folgt entscheiden:

* 1-wenige: Man sollte einen array von eingebetteten Dokumenten benutzen
* 1-N, oder die "N"-Seite muss alleine stehen: Man sollte einen array mit Referenzen verwenden. Es ist auch Möglich auf der "N"-Seite eine Referenz auf die 1-Seite zu sichern.
* 1-sehr viele: Man sollte auf der "N"-Seite eine Referenz zur 1-Seite haben.








