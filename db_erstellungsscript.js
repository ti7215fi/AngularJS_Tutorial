// Auszuführen in Robomongo

db.getCollection('user').insert({
    _id : NumberInt(2),
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