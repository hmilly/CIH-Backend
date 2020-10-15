const mongodb = require('mongodb');
const { userName, pWord } = require("./loginDetails")
const { MongoClient, ObjectId } = mongodb;

const express = require('express');
const server = express();
server.use(express.json());

const uri = `mongodb+srv://${userName}:${pWord}@cluster0.milx3.mongodb.net/`;
const dataBase = "coworking"

MongoClient.connect(
    uri, { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
        if (err) console.log("error: ", err)
        const db = client.db(dataBase)
        console.log(1, "connected")

        // db.collection('bookings').insertOne({
        //  id : 1,
        // companyId : 2,
        //  roomId : 1,
        // })

        const showAll = async (endpoint, cName) => {
            server.get(endpoint, async (req, res) => {
                console.log("3")
                const query = await req.query
                if (query.equipment) {
                    const data = await db.collection(cName).find({ "equipment": query.equipment }).toArray()
                    res.send(JSON.stringify(data))
                } else {
                    if (query.companyId) {
                        const data = await db.collection(cName).find({ "companyId": parseInt(query.companyId) }).toArray()
                        res.send(JSON.stringify(data))
                    } else {
                        const data = await db.collection(cName).find().toArray()
                        res.send(JSON.stringify(data))
                    }
                }
            })
        }
        const newCollection = (endpoint, cName) => {
            server.post(endpoint, async (req, res) => {
                const newItem = req.body;
                await db.collection(cName).insertOne(newItem)
                res.send(`New object added to ${cName} collection`)
            })
        }
        const getById = (endpoint, cName) => {
            server.get(endpoint, async (req, res) => {
                const inputId = parseInt(req.params.id)
                if (req.params === "companyId") {
                    console.log("1")
                    const data = await db.collection(cName).find({ companyId: inputId }).toArray()
                    res.send(JSON.stringify(data))
                } else {
                    console.log("2")
                    const data = await db.collection(cName).find({ "id": inputId }).toArray()
                    res.send(JSON.stringify(data))
                }
            })
        }
        const updateStatus = (endpoint, cName, replace, to, to2) => {
            server.put(endpoint, async (req, res) => {
                const inputId = parseInt(req.params.id)
                db.collection(cName)
                if (replace === "avail") {
                    db.collection(cName).updateOne({ id: inputId }, { $set: { "isAvailable": to } })
                }
                else if (replace === "equip") {
                    db.collection(cName).updateOne({ id: inputId }, { $push: { "equipment": to } })
                }
                else {
                    db.collection(cName).updateOne({ id: inputId }, { $set: { "name": to, "email": to2 } })
                }
                res.send(JSON.stringify(`updated ${cName} with id: ${inputId} to ${to}`))
            })
        }

        // /api/rooms
        // /api/rooms?equipment= (works under /api/rooms)
        showAll('/api/rooms', 'rooms')
        newCollection('/api/rooms', 'rooms')
        ///api/rooms/available
        server.get('/api/rooms/available', async (req, res) => {
            const data = await db.collection('rooms').find({ "isAvailable": true }).toArray()
            res.send(JSON.stringify(data))
        })
        // /api/room/:id
        getById('/api/room/:id', 'rooms')
        updateStatus('/api/room/:id', 'rooms', "avail", true)
        // /api/room/equipment/:id
        updateStatus('/api/room/equipment/:id', "rooms", "equip", "tea set")

        // /api/company
        showAll('/api/company', 'company')
        newCollection('/api/company', 'company')
        // /api/company/:id
        getById('/api/company/:id', 'company')
        updateStatus('/api/company/:id', 'company', "other", "brah", "brah@gmail.com")

        // /api/bookings
        // /api/bookings?companyId= (works under /api/bookings)
        showAll('/api/bookings', 'bookings')

        server.delete('/api/bookings', async (req, res) => {
            const inputId = parseInt(req.query.companyId)
            console.log(inputId)
            await db.collection('bookings').deleteMany({ companyId: inputId })
            res.send(`All bookings with companyId: ${inputId} were deleted`)
        })

        // /api/booking/:id
        getById('/api/booking/:id', 'bookings')

        server.delete('/api/booking/:id', async (req, res) => {
            console.log("deleting")
            const inputId = parseInt(req.params.id)
            await db.collection('bookings').deleteOne({ id: inputId })
            res.send(`Booking with id: ${inputId} was deleted`)
        })
    })

server.listen(3000, () => {
    console.log("listening on port 3000")
});