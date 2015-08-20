/**
 * 
 * Setup ExpressJS
 */
var express = require('express');
var app     = express();


/**
 * 
 * Setup MongoDB: (Source: http://blog.modulus.io/mongodb-tutorial)
 * 1. Load the MongoDB Module (mongoDB driver for NodeJS)
 * 2. Defining the URL to we need connect to (location of mongoDB server, URL containts the databasename)
 * 3. Connect to the database (Callback: DB-Object or Error)
 */
var Mongodb     = require('mongodb');                           //import MongoDB Drivers
var MongoClient = Mongodb.MongoClient;                          //MongoClient interface to connect to the database
var url         = 'mongodb://localhost:27017/pizzaservice';     //URL of the mongodb server 

MongoClient.connect(url, ConnectFunction);                      //try to connect to the mongoDB server        = 

app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(3000);
console.log('Server running on port 3000');


function ConnectFunction(err, db)
{
    if(err)
    {
        console.log('Unable to connect to the mongoDB server. Error', err);
    }
    else
    {
        //some work with the database
        console.log('MongoDB server running on', url);
        
           
        db.close();
    }
};


//--------------------------------------------------------------------------------------------------------------
/**
 * MongoDB Informations:
 * - Data stores data in JSON format
 * - collections = tables
 * - query = specifiy collection of documents
 * 
 * -> Create Data: db.COLLECTION_NAME.insert( data in JSON-format )
 * -> Update Data: db.COLLECTION_NAME.update( criteria, action, option )
 * -> Delete Data: db.COLLECTION_NAME.remove( remove )
 * 
 * Data Models
 * -> Normalized Data: references from one document to another (SQL PrimaryKey = _id : "number or string")
 * -> Embedded Data:   one document with sub-documents 
 * 
 *  References
 *  1. 1-n (document reference)
 *      example (2 books, 1 publisher), 
 *      publisher with _id: "name" and books with publisher_id : "name of publisher" 
 *  2. 1-1 (embedded data) 
 *      example (1 person, 1 adress) , 
 *      embedded data (person in JSON format and the adress embedded in person in JSON format too)
 *  3. 1-n (embedded data)
 *      exmple (1 person, 2 addresses)
 *      embedded data(person in JSON format and the addresses embedded in person in JSON format too [array])
 *  
 */

