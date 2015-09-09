/**
 * 
 * Setup ExpressJS
 */
var express = require('express');                           //import ExpressJS Drivers
var server = express();
var bodyParser = require('body-parser');                    // read request bodies
var cookieParser = require('cookie-parser');                // handle cookies
var csrf = require('csurf');


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
server.use(bodyParser.json({limit: '50mb'}));   // to support JSON encoded bodies
server.use(cookieParser());

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

server.use(csrf());

/**
 * This function read the "pizza"-collection and write the data into an array.
 * @param {type} param1
 * @param {type} param2
 * 
 */
server.get('/pizzen', function (req, res) {

    var db = req.db;
    var collection = db.collection('pizza');
    var collectionFiles = db.collection('fs.files');
    var collectionChunks = db.collection('fs.chunks');
    var ObjectIDs = [];
    var BinaryImageData = [];

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
    var collection = db.collection('user');

    collection.find({_id : 1}).toArray(function (err, docs) {

        if (!err)
        {
            
            var orderID = docs[0].order.length;
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
        collection.update(
            {_id : 1 },
            {$push : { order : { ordernumber : OrderID + 1, date : Date(), items :  order }}}
    );
    };

});

server.post('/login', function (req, res) {
    var db = req.db;
    var username = req.body.username;
    var password = req.body.password;
    var userID = 0;
    var collectionUser = db.collection('user');
    
    collectionUser.find().toArray(function(err, docs) {
        
       if(!err){
           
            collectionUser.aggregate([{ $match : 
                                        { 'login.username' : username, 
                                          'login.password' : password } }]).toArray(function(err, result){
              
            if(!err){
                  
                if(result.length === 1){
                    console.log('User %s wurde gefunden', username);
                    res.cookie('XSRF-TOKEN', req.csrfToken());
                    res.status(200).send('OK');
                    db.close();
                }else{
                    console.log('User %s wurde nicht gefunden bzw. fehlerhafte Daten', username);
                }
                  
            }else{
            throw err;
            }
              
            });// end aggregate to Array
       } else{
           
           throw err;
       };
        
    });// end find to Array
    

   
});

server.post('/saveImage', function (req, res) {
    var db = req.db;
    var collectionPizza = db.collection('pizza');

    collectionPizza.find().toArray(function (err, docs) {
        if (!err) {

            collectionPizza.aggregate([{$match: {name: req.body.name}}]).toArray(function (err, result) {

                if (!err) {

                    if (result.length !== 0) {
                        console.log("Pizza existiert bereits!!");
                    } else {
                        // cut the string, that you have only the image data (without meta-data)
                        var imageStringLength = (req.body.image).length;
                        var imageData = (req.body.image).substr(23, imageStringLength);

                        // convert base64 string into binary data (buffer)
                        var binaryImageData = new Buffer(imageData, 'base64');

                        collectionPizza.insert(
                                {
                                    _id: ++docs.length,
                                    name: req.body.name,
                                    price: req.body.price,
                                    image: binaryImageData
                                }
                        );

                        console.log("Pizza hinzugefügt!");
                        db.close();
                    }
                    ;

                } else {
                    db.close();
                    throw err;
                }

            }); // end collectionPizza.aggregate

        } else {
            db.close();
            throw err;
        }
    }); // end collectionPizza.find()

});

server.post('/saveLocation', function (req, res) {

    var db = req.db;
    var collectionLocations = db.collection('location');

    collectionLocations.find().toArray(function (err, docs) {

        if (!err) {

            collectionLocations.aggregate([{$match: {city: req.body.location}}]).toArray(function (err, result) {

                if (!err) {

                    if (result.length !== 0) {
                        console.log("result: ", result);
                        console.log("Filiale %s existiert bereits!", req.body.location);
                    } else {

                        var locationName = req.body.location;
                        var coordinates = [parseFloat(req.body.coordinates[0]),
                            parseFloat(req.body.coordinates[1])];
                        var ID = docs.length + 1;

                        console.log(req.body);
                        console.log(coordinates);

                        collectionLocations.insert(
                                {
                                    _id: ID,
                                    city: locationName,
                                    geoData: {
                                        type: "Point",
                                        coordinates: coordinates
                                    }
                                }
                        );

                        console.log("Filiale hinzugefügt: ", locationName);

                        db.close();
                    }
                    ;
                } else {

                    db.close();
                    throw err;

                }

            }); // end collectionLocation.aggregate

        } else {
            db.close();
            throw err;
        }
    }); // end collectionLocations.find();

});

server.get('/locations', function (req, res) {
    var db = req.db;
    var collectionLocation = db.collection('location');

    collectionLocation.find().toArray(function (err, docs) {
        if (!err) {

            var locations = [];

            for (var index = 0; index < docs.length; ++index) {
                locations.push(docs[index].city);
            }

            console.log("Locations: ", locations);

            res.status(200).send(locations);

            db.close();
        } else {
            db.close();
        }
    })
})

server.post('/getLocation', function (req, res) {
    var db = req.db;
    var collectionLocation = db.collection('location');
    var location = req.body.location;
    var coordinates = [];
    var distance = 0;

    console.log("req.body ", req.body);

    collectionLocation.find({city: location}).toArray(function (err, docs) {
        if (!err) {

            console.log("coordinates: ", docs[0].geoData.coordinates);
            coordinates = docs[0].geoData.coordinates;

            db.command(
                    {
                        geoNear: 'location',
                        near: {type: "Point", coordinates: coordinates},
                        spherical: true,
                        distanceMultiplier: 0.001,
                    }, function (err, result) {

                if (!err) {
                    var distances = [];

                    for (var index = 0; index < result.results.length; ++index)
                    {
                        console.log("coordinates: ", result.results[index].obj.geoData.coordinates);

                        distances.push({distance: result.results[index].dis,
                            city: result.results[index].obj.city,
                            coordinates : result.results[index].obj.geoData.coordinates});
                    }

                    console.log("distances: ", distances);

                    res.status(200).send(distances);
                    db.close();
                } else {
                    db.close();
                    throw err;
                }

            });

        } else {
            db.close();
            throw err;
        }
    });






});



server.listen(3000);
console.log('Server running on port 3000');

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

/*
 * collection user
 * {
 *      _id         : 1, 
 *      firstname   : "Max",
 *      lastname    : "Mustermann"
 *      address     : {
 *                          zip     : 99085,
 *                          city    : "Erfurt",
 *                          street  : "Musterweg 2"
 *                    },
 *      login       : {
 *                          username : "MaMu",
 *                          password : "123123"
 *                    },  
 *      order       : [{
 *                          ordernumber : 1,
 *                          orderdate   : 2012-12-03,
 *                          orderitems  : [{
 *                                              pizza_id : 1,
 *                                              quantity : 2      
 *                                        },
 *                                        {
 *                                              pizza_id : 2,
 *                                              quantity : 3
 *                                        }]  
 *                    }]      
 * }
 */