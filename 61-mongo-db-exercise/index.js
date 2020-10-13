const mongodb = require('mongodb');
const { userName, pWord } = require("./loginDetails")

const express = require('express');
const server = express();


const { MongoClient } = mongodb;
const uri = `mongodb+srv://${userName}:${pWord}@cluster0.milx3.mongodb.net/`;
const dataBase = "coworking"

MongoClient.connect(
  uri, { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) console.log("error: ", err)
    const db = client.db(dataBase)
    console.log(1, "connected")

    // db.collection('rooms').insertOne({
    //   id: 3,
    //   roomNumber: 8,
    //   equipment: ["bed"],
    //   capacity: 2,
    //   isAvailable: false
    // })

    server.get('/api/rooms', async (req, res) => {
      const data = await db.collection('rooms').find().toArray()
      res.send(JSON.stringify(data))
    })

    server.post('/api/rooms', async (req, res) => {
      const newRoom = req.body;
      await db.collection('rooms').insertOne(newRoom)
      res.send('Added room')
    })
  })





server.listen(3000, () => {
  console.log("listening on port 3000")
})
//


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