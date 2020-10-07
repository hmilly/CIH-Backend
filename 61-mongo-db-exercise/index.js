const mongodb = require('mongodb');
// const {MongoClient} = mongodb;
const { userName, pWord } = require("./loginDetails")

// const uri = `mongodb+srv://${userName}:${pWord}@cluster0.milx3.mongodb.net/`;
// const dataBase = "coworking"

// MongoClient.connect(
//     uri, { useNewUrlParser: true },
//     (err, client) => {
//         if (err) console.log("error: ", err)
//         const db = client.db(dataBase)

//         db.collection('rooms').insertOne({
//             name: "test"
//         })
//     }
// )



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${userName}:${pWord}@cluster0.milx3.mongodb.net/coworking?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("rooms");
    console.log(1, "connected")

    collection.insertOne({
        name: "test"
    })

    // collection.find({
    //     category: "name"
    // })

    client.close();
});


/**
/api/rooms

id - ObjectId;
roomNumber - number;
equipment - array;
capacity - int;
isAvailable - boolean;

GET - select and return all rooms from rooms collection;
POST - add a new room to rooms collection;
 */


/**
/api/rooms/available

GET - select and return all available rooms from rooms collection;
*/


/**
/api/rooms?equipment=

GET - select and return all rooms with required equipment from rooms collection;
*/


/**
/api/room/:id

GET - get room by id;
PUT - update availability status;
*/


/**
/api/room/equipment/:id

PUT - update equipment in the room;
 */





/**
/api/companies

id - ObjectId;

name - string;

email - string;

GET - select and return all companies from companies collection;
POST - add a new company to companies collection;
 */


/**
/api/company/:id

GET - get company by id;
PUT - update company;
 */





/**
/api/bookings

id - ObjectId;

companyId: int;

roomId: int;

roomId: int;

GET - return all bookings;
 */


/**
/api/bookings?companyId=

GET - return all bookings for selected company;
DELETE - delete all bookings for selected company;
 */


/**
/api/booking/:id

GET - return booking by id;
DELETE - delete booking by id;
 */