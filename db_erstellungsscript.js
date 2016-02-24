// Auszuführen in Robomongo

db.createCollection('user');
db.createCollection('pizza');
db.getCollection('pizza').createIndex( { name : "text" } );
db.createCollection('location');
db.getCollection('location').createIndex( { geoData : "2dsphere" } );

db.getCollection('user').insert({
    _id : NumberInt(1),
    firstname : "Maria",
    lastname : "Musterfrau",
    address : {
                zip : NumberInt(99086),
                city : "Erfurt",
                street : "Musterstrasse 2"
               },
    login : {
                username : "MarMu",
                password : "123123"
            },
    order : [
                {
                    ordernumber : NumberInt(1),
                    date : Date(),
                    items : [
                                {
                                    pizza_id : Number(1),
                                    quantity : NumberInt(3)
                                },
                                {
                                    pizza_id : Number(2),
                                    quantity : NumberInt(1)
                                }
                            ]
                },
                {
                    ordernumber : NumberInt(2),
                    date : Date(),
                    items : [
                                {
                                    pizza_id : NumberInt(3),
                                    quantity : NumberInt(2)
                                },
                                {
                                    pizza_id : NumberInt(4),
                                    quantity : NumberInt(1)
                                }
                            ]
                }
            ]
            })
            
/////////////////////////////////////////////////////////////////// 2

db.getCollection('user').insert({
    _id : NumberInt(2),
    firstname : "Max",
    lastname : "Mustermann",
    address : {
                zip : NumberInt(99085),
                city : "Erfurt",
                street : "Musterweg 1"
               },
    login : {
                username : "MaxMu",
                password : "123123"
            },
    order : [
                {
                    ordernumber : NumberInt(1),
                    date : Date(),
                    items : [
                                {
                                    pizza_id : Number(2),
                                    quantity : NumberInt(1)
                                },
                                {
                                    pizza_id : Number(3),
                                    quantity : NumberInt(2)
                                }
                            ]
                },
                {
                    ordernumber : NumberInt(2),
                    date : Date(),
                    items : [
                                {
                                    pizza_id : NumberInt(1),
                                    quantity : NumberInt(2)
                                },
                                {
                                    pizza_id : NumberInt(2),
                                    quantity : NumberInt(1)
                                }
                            ]
                }
            ]
            })
            
/////////////////////////////////////////////////////////// 3

db.getCollection('user').insert({
    _id : NumberInt(3),
    firstname : "Dirk",
    lastname : "Doenermann",
    address : {
                zip : NumberInt(99974),
                city : "Muehlhausen",
                street : "Fleischweg 5"
               },
    login : {
                username : "DirDoe",
                password : "123123"
            },
    order : [
                {
                    ordernumber : NumberInt(1),
                    date : Date(),
                    items : [
                                {
                                    pizza_id : Number(4),
                                    quantity : NumberInt(4)
                                },
                                {
                                    pizza_id : Number(5),
                                    quantity : NumberInt(1)
                                }
                            ]
                },
                {
                    ordernumber : NumberInt(2),
                    date : Date(),
                    items : [
                                {
                                    pizza_id : NumberInt(1),
                                    quantity : NumberInt(3)
                                },
                                {
                                    pizza_id : NumberInt(2),
                                    quantity : NumberInt(1)
                                }
                            ]
                }
            ]
            })
            
/////////////////////////////////////////////////////////// pizza

db.getCollection('pizza').insert({
    
    _id     : 1,
    name    : 'Salami',
    price   : 5.0
    
});

db.getCollection('pizza').insert({
    
    _id     : 2,
    name    : 'Pilze',
    price   : 5.5
    
});

db.getCollection('pizza').insert({
    
    _id     : 3,
    name    : 'Gyros',
    price   : 6.0
    
});

db.getCollection('pizza').insert({
    
    _id     : 4,
    name    : 'Mafia',
    price   : 7.5
    
});

db.getCollection('pizza').insert({
    
    _id     : 5,
    name    : 'Hawaii',
    price   : 5.5
    
});

///////////////////////////////////////////////////////// location

db.getCollection('location').insert({
    
    _id     : 1,
    city    : 'Erfurt',
    geoData : {
                type : 'Point',
                coordinates : [11.603400, 50.943000]
               }
    
});