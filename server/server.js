/**
 * 
 * Setup ExpressJS
 */
var express = require('express');                           //import ExpressJS Drivers
var server = express();
var bodyParser = require('body-parser');


/**
 * 
 * Setup MongoDB
 * databasename:    pizzaservice
 * port:            27017
 */
var Mongodb = require('mongodb');                           //import MongoDB Drivers
var MongoClient = Mongodb.MongoClient;                          //MongoClient interface to connect to the database
var url = 'mongodb://localhost:27017/pizzaservice';     //URL of the mongodb server

server.use('/static', express.static('../client'));
server.use(bodyParser.json({limit : '50mb'}));                                      // to support JSON encoded bodies
/**
 * This function is to connect with the database.
 * You can use req.db (running database) in every server function.
 */
server.use(function (req, res, next)
{
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error', err);
        }
        else {
            console.log('MongoDB server running on', url);
            req.db = db;
            next();
        }
    });
});

/**
 * This function read the "pizza"-collection and write the data into an array.
 * @param {type} param1
 * @param {type} param2
 * 
 */
server.get('/pizzen', function (req, res) {
    
    var db                  = req.db;
    var collection          = db.collection('pizza');
    var collectionFiles     = db.collection('fs.files');
    var collectionChunks    = db.collection('fs.chunks');
    var ObjectIDs           = [];
    var BinaryImageData     = [];

    collectionFiles.find().toArray(function (err, docs) {
        if (!err) {

            for (var Index = 0; Index < docs.length; ++Index) {
                ObjectIDs.push(docs[Index]._id);
            }
           
            collectionChunks.find().toArray(function (err, docs) {

                if (!err) {

                    for (var Index = 0; Index < docs.length; ++Index) {
                        BinaryImageData.push(docs[Index].data.buffer);
                    }

                    collection.find().toArray(function (err, docs) {

                        if (!err) {

                            for (var Index = 0; Index < docs.length; ++Index) {

                                if (BinaryImageData.length > Index) {
                                    docs[Index].image = BinaryImageData[Index].toString('base64');
                                }
                                docs[Index].price = (docs[Index].price).toFixed(2);
                                (docs[Index].price).toString();
                                docs[Index].price += "€";  
                            }
                            res.status(200).send(docs);

                        } else {
                            throw err;
                        }
                    }); // end CollectionsPizza

                } else {
                    throw err;
                }
            }); // end CollectionsChunks

        } else {
            throw err;
        }
    }); // end CollectionsFind
});

/**
 * @description Get the order data and insert it to the database
 * @param {type} request
 * @param {type} response
 */
server.post('/orderFood', function (req, res) {
    var db = req.db;
    var collection = db.collection('order');

    collection.find().toArray(function (err, docs) {

        if (!err)
        {
            var orderID = docs.length;
            var order = [];

            for (var Index = 0; Index < req.body.length; ++Index)
            {
                order.push({pizza_id: req.body[Index]._id,
                    quantity: req.body[Index].quantity});

            }

            insertOrderIntoDatabase(orderID, order)

            db.close();
        }
        else
        {
            throw err;
        }
    });

    function insertOrderIntoDatabase(OrderID, order)
    {
        collection.insert(
                {
                    _id: OrderID,
                    customer_id: 1,
                    order: order,
                    date: Date()
                });
    }
    ;

});

server.post('/login', function (req, res) {
    var db = req.db;
    var collectionLogin = db.collection('login');
    var collectionUser = db.collection('customer');
    var username = req.body.username;
    var password = req.body.password;
    var userID = 0;
    var userFound = false;
    var userData = {};

    /**
     * try to find the user with the recieved data
     */
    collectionLogin.find().toArray(function (err, docs) {

        if (!err) {
            for (var Index = 0; Index < docs.length; ++Index)
            {
                if (docs[Index].username === username &&
                        docs[Index].password === password)
                {
                    userFound = true;
                    userID = docs[Index].customer_id;
                    break;
                }
            }

        } else {
            throw err;
        }
    });

    /**
     * if the user was found
     * get the user data from the database and store it in an array
     */
    if (userFound === true)
    {
        collectionUser.find().toArray(function (err, docs) {

            if (!err)
            {
                for (var Index = 0; Index < docs.length; ++Index)
                {
                    if (docs[Index]._id === userID)
                    {
                        userData = {firstname: docs[Index].firstname,
                            lastname: docs[Index].lastname,
                            address: docs[Index].address};
                        break;
                    }
                }

            } else {
                throw err;
            }

        });
    }

    res.send(userData);
});

server.post('/saveImage', function(req, res){
    var db = req.db;
    var collectionPizza = db.collection('pizza');
    
    collectionPizza.find().toArray(function(err, docs){
        if(!err){
            
            var imageBuffer = new Buffer(req.body[0].image, 'base64'); //ToDO
            
            collectionPizza.insert(
                    
                    {
                        _id     : ++ docs.length,
                        name    : req.body[0].name,
                        price   : req.body[0].price,
                        image   : imageBuffer
                    }
                    );
            console.log("Pizza hinzugefügt!");
            
        } else{
            throw err;
        }
    });
    
});

server.listen(3000);
console.log('Server running on port 3000');


function storeImageFileInDB(Image){
    var fs = require('fs');
    
    fs.readFile(Image, function(err, original_data){
        var base64Image = original_data.toString('base64');
    })
}



//--------------------------------------------------------------------------------------------------------------

/**
 * 
 * Setup MongoDB: (Source: http://blog.modulus.io/mongodb-tutorial)
 * 1. Load the MongoDB Module (mongoDB driver for NodeJS)
 * 2. Defining the URL to we need connect to (location of mongoDB server, URL containts the databasename)
 * 3. Connect to the database (Callback: DB-Object or Error)
 */
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

