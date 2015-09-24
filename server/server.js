/**
 * 
 * Setup ExpressJS + Middleware
 */

var bodyParser = require('body-parser');                    // read request bodies
var express = require('express');                           //import ExpressJS Drivers
var cookieParser = require('cookie-parser');

var server = express();


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

server.use(cookieParser());


// globals
var sessionStorage = {};
var sessionID = 0;
var SESSION_NAME = 'timSessionId';

function generateSessionId() {
    return ++sessionID;
}
;

server.use(function (req, res, next) {

    var sessionId = req.cookies[SESSION_NAME];

    if (!sessionStorage[sessionId]) {
        sessionId = generateSessionId();

        res.cookie(SESSION_NAME, sessionId);
        req.cookies[SESSION_NAME] = sessionId;

        sessionStorage[sessionId] = {};
    }

    req.currentTimSession = sessionStorage[sessionId];

    next();
});

server.get('/sessionCounter', function (req, res) {
    if (req.currentTimSession.counter) {
        ++req.currentTimSession.counter;
    } else {
        req.currentTimSession.counter = 1;
    }

    //res.status(200).send(sessionStorage[sessionId].counter);
    res.status(200).send('blub ' + req.currentTimSession.counter);
});




/**
 * This function read the "pizza"-collection and write the data into an array.
 * @param {type} param1
 * @param {type} param2
 * 
 */
server.get('/pizza', function (req, res) {

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

                    collection.aggregate([{$sort: {_id: 1}}]).toArray(function (err, docs) {

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

server.get('/pizza/:Id', function (req, res) {

    var db = req.db;
    var collectionPizza = db.collection('pizza');

    collectionPizza.find({_id: req.params.Id}).toArray(function (err, doc) {

        if (!err) {
            res.status(200).send(doc);
            db.close();
        } else {
            db.close();
            throw err;
        }

    });

});


server.put('/pizza/:Id', function (req, res) {

    var db = req.db;
    var collectionPizza = db.collection('pizza');
    var price = (req.body.price).substr(0, 4);
    price = parseFloat(price);

    collectionPizza.update({_id: req.body._id},
    {$set: {
            name: req.body.name,
            price: price
        }}, function (err, count, status) {

        if (!err) {
            console.log('OK!');
            res.status(200).send(status);
            db.close();

        } else {
            throw err;
        }

    });

});

server.delete('/pizza/:Id', function (req, res) {

    var db = req.db;
    var collectionPizza = db.collection('pizza');

    collectionPizza.deleteOne({_id: req.param.Id}, function (err, result) {

        if (!err) {
            res.status(200).send('Pizza was deleted!');
        } else {
            throw err;
        }

    });// end collectionPizza.delete()

});

/**
 * @description Get the order data and insert it to the database
 * @param {type} request
 * @param {type} response
 */
server.put('/user', function (req, res) {

    var db = req.db;
    var collection = db.collection('user');
    var collectionPizza = db.collection('pizza');

    collection.find({_id: req.currentTimSession.userData.ID}).toArray(function (err, docs) {

        if (!err)
        {

            var orderID = docs[0].order.length;
            var order = [];

            for (var Index = 0; Index < req.body.length; ++Index)
            {
                order.push({pizza_id: req.body[Index]._id,
                    quantity: req.body[Index].quantity});
            }

            collectionPizza.aggregate([{$sort: {_id: 1}}]).toArray(function (err, result) {

                if (!err) {

                    var sum = 0;

                    for (var itemIndex = 0; itemIndex < order.length; ++itemIndex) {

                        sum += order[itemIndex].quantity * result[order[itemIndex].pizza_id - 1].price;

                    }


                    insertOrderIntoDatabase(orderID, order, sum);
                    db.close();
                    console.log("sum", sum);

                } else {
                    throw err;
                }

            });
        }
        else
        {
            throw err;
        }
    });

    function insertOrderIntoDatabase(OrderID, order, sum)
    {
        collection.update(
                {_id: req.currentTimSession.userData.ID},
        {$push: {order: {ordernumber: OrderID + 1, date: Date(), sum: sum, items: order}}}
        );
    }
    ;

});

server.put('/user/:Id', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');
    var id = parseInt(req.params.Id);

    collectionUser.find({_id: id}).toArray(function (err, doc) {

        var currentAddress  = doc[0].address,
            currentUsername = doc[0].login.username,
            currentPassword = doc[0].login.password;

        var newPassword     = currentPassword, 
            newUsername     = currentUsername, 
            newAddress      = currentAddress;

        switch(req.body.update){
            case 'address':
                newAddress  = req.body.address;
                break;
            case 'username':
                newUsername = req.body.username;
                break;
            case 'password':
                if(req.body.newPassword === req.body.newPasswordConfirm){
                    newPassword = req.body.newPassword;
                }else{
                    res.status(200).send({ message : 'Passwords dont match!' });
                }
                break;
            default:
                break;
        } // end switch

        collectionUser.update(
                {
                    _id: req.currentTimSession.userData.ID
                },
        {
            $set: {
                'login.password': newPassword,
                'login.username': newUsername,
                'address' : newAddress
            }
        }

        , function (err, status) {

            if (!err) {
                req.currentTimSession.userData.address = newAddress;
                req.currentTimSession.userData.username = newUsername;
                res.status(200).send(status);
                db.close();
            } else {
                db.close();
                throw err;
            }

        }); //end update

    });

});

server.post('/sessionData', function (req, res) {


    var logout = req.body.delete;

    if (logout === false)
    {

        var db = req.db;
        var username = req.body.username;
        var password = req.body.password;
        var collectionUser = db.collection('user');



        collectionUser.find().toArray(function (err, docs) {

            if (!err) {

                collectionUser.aggregate([{$match:
                                {'login.username': username,
                                    'login.password': password}}]).toArray(function (err, result) {

                    if (!err) {

                        if (result.length === 1) {
                            console.log('User %s wurde gefunden', username);

                            var userData;

                            if (username !== 'admin') {

                                userData = {ID: result[0]._id,
                                    username : username,
                                    firstname: result[0].firstname,
                                    lastname: result[0].lastname,
                                    group: result[0].group,
                                    address: result[0].address,
                                    order: result[0].order
                                };
                            } else {

                                userData = {group: result[0].group};

                            }

                            req.currentTimSession.userData = userData;

                            res.status(200).send({message: 'User was found!'});
                            db.close();
                        } else {
                            res.status(401).send('Invalid user data!');
                            console.log('User %s wurde nicht gefunden bzw. fehlerhafte Daten', username);
                        }

                    } else {
                        throw err;
                    }

                });// end aggregate to Array

            } else {

                throw err;
            }
            ;

        });// end find to Array
    } else {
        delete req.currentTimSession.userData;
        res.status(200).send({message: 'Logout successful'});
    }
});

server.delete('/sessionData', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');

    collectionUser.update({_id: req.currentTimSession.userData.ID}, {
        $unset: {
            firstname: "",
            lastname: "",
            group: "",
            address: "",
            login: ""
        }

    }, function (err, result) {

        if (!err) {
            res.status(200).send(result);
            db.close();
        } else {
            db.close();
            throw err;
        }

    });

});

server.get('/sessionData', function (req, res) {

    res.status(200).send(req.currentTimSession.userData);

});

server.post('/user', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');
    var customerData = {};

    collectionUser.find().toArray(function (err, docs) {

        if (!err) {
            var customerId = docs.length;
            console.log(req.body);

            collectionUser.insert({
                _id: customerId,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                group: 'customer',
                address: {
                    zip: req.body.zip,
                    city: req.body.city,
                    street: req.body.street + ' ' + req.body.streetnumber

                },
                login: {
                    username: req.body.username,
                    password: req.body.password

                },
                order: []

            });

            res.status(200).send('User %s is now available!', req.body.username);

        } else {
            throw err;
        }

    });

});

server.get('/getOrders', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');

    collectionUser.aggregate([{$match: {group: 'customer'}}]).toArray(function (err, result) {

        if (!err) {

            var collectionPizza = db.collection('pizza');
            var orders = [];
            var customerOrder = {};

            for (var userIndex = 0; userIndex < result.length; ++userIndex) {

                customerOrder = {
                    id: result[userIndex]._id,
                    firstname: result[userIndex].firstname,
                    lastname: result[userIndex].lastname,
                    order: result[userIndex].order
                };

                orders.push(customerOrder);

            }

            //ToDo: Pizza auslesen
            collectionPizza.aggregate([{$sort: {_id: 1}}]).toArray(function (err, result) {

                if (!err) {

                    var pizza = [];

                    for (var pizzaIndex = 0; pizzaIndex < result.length; ++pizzaIndex) {

                        pizza.push({
                            id: result[pizzaIndex]._id,
                            name: result[pizzaIndex].name,
                            price: result[pizzaIndex].price

                        });

                    }

                    console.log("pizza", pizza);

                    for (var userIndex = 0; userIndex < orders.length; ++userIndex) {

                        for (var orderIndex = 0;
                                orderIndex < orders[userIndex].order.length;
                                ++orderIndex) {

                            for (var itemIndex = 0;
                                    itemIndex < orders[userIndex].order[orderIndex].items.length;
                                    ++itemIndex) {

                                var item1 = orders[userIndex].order[orderIndex].items[itemIndex];

                                if (typeof pizza[item1.pizza_id - 1] !== 'undefined') {
                                    item1.name = pizza[item1.pizza_id - 1].name;
                                    item1.price = pizza[item1.pizza_id - 1].price;
                                }

                                console.log('item1', item1);

                            }

                        }

                    }

                    var responseOrder = [];
                    var date;

                    var item = "";
                    var customerId;


                    for (userIndex = 0; userIndex < orders.length; ++userIndex) {

                        customerId = orders[userIndex].id;

                        for (orderIndex = 0; orderIndex < orders[userIndex].order.length; ++orderIndex) {

                            date = orders[userIndex].order[orderIndex].date;
                            date = new Date(date);

                            for (itemIndex = 0; itemIndex < orders[userIndex].order[orderIndex].items.length; ++itemIndex) {

                                var item2 = orders[userIndex].order[orderIndex].items[itemIndex];

                                console.log("item2", item2);

                                item += item2.quantity + 'x ' + item2.name + ', ';

                            }


                            responseOrder.push({
                                id: customerId,
                                date: date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear(),
                                time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                                sum: orders[userIndex].order[orderIndex].sum,
                                items: item
                            });
                            item = '';

                        }

                    }
                    ;


                    res.status(200).send(responseOrder);

                } else {
                    throw err;
                }

            });// end collectionPizza.find();



        } else {
            throw err;
        }

    });// end collectionUser.aggregate

});

server.get('/user', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');


    collectionUser.find().toArray(function (err, docs) {

        if (!err) {

            var customers = [];

            for (var userIndex = 0; userIndex < docs.length; ++userIndex) {

                if (docs[userIndex].group !== 'admin') {

                    customers.push({
                        id: docs[userIndex]._id,
                        firstname: docs[userIndex].firstname,
                        lastname: docs[userIndex].lastname,
                        address: docs[userIndex].address,
                        order: docs[userIndex].order
                    });
                }

            }

            res.status(200).send(customers);

        } else {
            throw err;
        }

    }); // end collectionUser.find()



});

server.get('/user/:Id', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');

    collectionUser.aggregate([{$match: {_id: parseInt(req.params.Id)}}]).toArray(function (err, result) {

        if (!err) {
            console.log(req.params.Id);
            console.log(typeof req.params.Id);

            var date = new Date(result[0].order[result[0].order.length - 1 ].date);

            res.status(200).send({
                id: result[0]._id,
                lastname: result[0].lastname,
                firstname: result[0].firstname,
                address: result[0].address,
                orderCount: result[0].order.length,
                lastOrder: date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear() + ', ' +
                        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            });
        } else {
            throw err;
        }
    });

});

server.get('/getCurrentCustomer', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');

    collectionUser.find({_id: req.currentTimSession.userData.ID}).toArray(function (err, doc) {

        if (!err) {

            console.log(doc);

            var responseData = {
                firstname: doc[0].firstname,
                lastname: doc[0].lastname,
                address: doc[0].address,
                login: doc[0].login

            };

            res.status(200).send(responseData);
            db.close();

        } else {
            db.close();
            throw err;
        }

    });


});

server.post('/updateUsername', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');

    collectionUser.find().toArray(function (err, docs) {

        if (!err) {

            var userExist = false;

            for (var docIndex = 0; docIndex < docs.length; ++docIndex) {

                if (docs[docIndex].login !== undefined) {
                    if (docs[docIndex].login.username === req.body.username) {

                        userExist = true;
                        break;

                    }
                }
            }
            ;

            if (userExist === true) {
                res.status(403).send('Username already exist!');
            } else {

                collectionUser.update(
                        {_id: req.currentTimSession.userData.ID},
                {$set: {'login.username': req.body.username}}

                , function (err, status) {

                    if (!err) {
                        res.status(200).send(status);
                        db.close();
                    } else {
                        db.close();
                        throw err;
                    }

                }); //end update

            }

        } else {
            db.close();
            throw err;
        }

    }); // end collectionUser.find()

});

server.post('/updateAddress', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');

    collectionUser.update({_id: req.currentTimSession.userData.ID}, {
        $set: {'address.zip': req.body.address.zip,
            'address.street': req.body.address.street,
            'address.city': req.body.address.city
        }

    }, function (err, result) {

        if (!err) {
            res.status(200).send(result);
            db.close();
        } else {
            db.close();
            throw err;
        }

    });

});

server.post('/updatePassword', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');

    collectionUser.find({_id: req.currentTimSession.userData.ID}).toArray(function (err, doc) {

        if (!err) {

            if (doc[0].login.password === req.body.oldPassword &&
                    req.body.newPassword === req.body.newPasswordConfirm) {

                collectionUser.update({_id: req.currentTimSession.userData.ID}, {
                    $set: {'login.password': req.body.newPassword}

                }, function (err, result) {

                    if (!err) {
                        res.status(200).send(result);
                        db.close();
                    } else {
                        db.close();
                        throw err;
                    }

                });

            }

        } else {
            db.close();
            throw err;
        }


    }); // end collectionUser.find


});

server.get('/deleteCustomer', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');

    collectionUser.update({_id: req.currentTimSession.userData.ID}, {
        $unset: {
            firstname: "",
            lastname: "",
            group: "",
            address: "",
            login: ""
        }

    }, function (err, result) {

        if (!err) {
            res.status(200).send(result);
            db.close();
        } else {
            db.close();
            throw err;
        }

    });

});

server.get('/getCustomerOrder', function (req, res) {

    var db = req.db;
    var collectionUser = db.collection('user');

    collectionUser.find({_id: req.currentTimSession.userData.ID}).toArray(function (err, docs) {

        if (!err) {

            var responseOrder = [];
            var date;

            for (var orderIndex = 0; orderIndex < docs[0].order.length; ++orderIndex) {

                date = new Date(docs[0].order[orderIndex].date);

                responseOrder.push({
                    ordernumber: docs[0].order[orderIndex].ordernumber,
                    date: date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear() + ', ' +
                            date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                    sum: docs[0].order[orderIndex].sum,
                    items: docs[0].order[orderIndex].items

                });
            }

            res.status(200).send(responseOrder);
            db.close();
        } else {
            db.close();
            throw err;
        }

    });

});

server.post('/pizza/:Id', function (req, res) {
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
                        res.status(200).send('Add pizza successful!');
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

server.post('/location', function (req, res) {

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

server.get('/location', function (req, res) {
    var db = req.db;
    var collectionLocation = db.collection('location');

    collectionLocation.find().toArray(function (err, docs) {
        if (!err) {

            var locations = [];

            for (var index = 0; index < docs.length; ++index) {
                locations.push(docs[index].city);
            }

            console.log("Locations: ", docs);

            res.status(200).send(docs);

            db.close();
        } else {
            throw err;
            db.close();
        }
    });
});

server.get('/location/:name', function (req, res) {
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
                            coordinates: result.results[index].obj.geoData.coordinates});
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