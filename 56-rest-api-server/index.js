const express = require("express")
const fs = require("fs");
const { query } = require("express");

const app = express();
app.use(express.json());



// Endpoint - /users/

// GET - Returns all users as a JSON object.

app.get("/users", (req, res) => {
    const users = JSON.parse(fs.readFileSync(`./db/users.json`, "utf-8"))
    res.setHeader("Content-type", "application/json")
    res.status(200).send( users );
    return
})


// POST - adds a new user. As a response returns new user.

app.post("/users", async(req, res) => {
    let users = JSON.parse(fs.readFileSync(`./db/users.json`, "utf-8"))

    try {
    users = [...users, {...req.body}]
    fs.writeFileSync(`./db/users.json`, JSON.stringify(users))  
    }
    catch (error) {
        console.log(error)
    }

    res.setHeader("Content-type", "application/json")
    res.status(200).send( req.body );
    return
})



// Endpoint - /user/:id

// GET - Returns a user.
app.get("/user/:id", (req, res) => {
    const addr = `./db/users.json`
    let user = JSON.parse(fs.readFileSync(addr, "utf-8"))
    let us = user.find(u => u.id === req.param.id)
    console.log("user", )
    res.setHeader("Content-type", "application/json")
    res.status(200).send( user );
    return
})

// PATCH - updates an existing user by id. As a response returns new user.

app.patch("/user/:id", (req, res) => {
    const addr = `./db/users.json`;
    let user = JSON.parse(fs.readFileSync(addr, "utf-8"))
    user = {
        id: 6,
        firstName: "owen",
        lastName: "pring",
        email: "op@gmial.com"
    }
    fs.writeFileSync(addr, JSON.stringify(user))
    res.setHeader("Content-type", "application/json")
    res.status(200).send(user );
    return
})

// DELETE - removes an existing user by id. As a response returns id of removed user.

app.delete("/user/:id", (req, res) => {

    const user = `./db/orders.json`;

    res.setHeader("Content-type", "application/json")
    res.status(200).send(req.params.id);
    return
})


// Endpoint - /orders

// GET - Returns all orders.

app.get("/orders", (req, res) => {
    const orders = fs.readFileSync("./db/orders.json", "utf-8")

    res.setHeader("Content-type", "application/json")
    res.status(200).send( JSON.parse(orders) );
    return
})

// POST - adds a new order. As a response returns a new order.

app.post("/orders", (req, res) => {
    const orders = JSON.parse(fs.readFileSync("./db/orders.json", "utf-8"))
    const newOrder = {
        id: 1,
        userId: 4,
        productName: "orange",
        quantity: 2
    }
    orders = [...orders, newOrder]
    fs.writeFileSync("./db/orders.json", JSON.stringify(orders))
    res.setHeader("Content-type", "application/json")
    res.status(200).send( newOrder );
    return
})



// Endpoint - /orders?userId=:id

// GET - Returns all orders by user id.

app.get("/orders?userId=:id", (req, res) => {

    const oAddr = `./db/orders.json`;
    const orders = JSON.parse(fs.readFileSync(oAddr, "utf-8"))

    res.setHeader("Content-type", "application/json")
    res.status(200).send( orders );
    return
})




// Endpoint - /order/:id

// GET - Returns an order.

app.get("/order:id", (req, res) => {
    const oAddr = `./db/orders.json`;
    const order = fs.readFileSync(oAddr, "utf-8")

    res.setHeader("Content-type", "application/json")
    res.status(200).send( JSON.parse(order ));
    return
})

// PATCH - updates an existing order by id. As a response returns modified order.

app.patch("/order:id", (req, res) => {

    const oAddr = `./db/orders.json`;
    let order = JSON.parse(fs.readFileSync(oAddr, "utf-8"))
    order = {
        id: 1,
        userId: 4,
        productName: "orange",
        quantity: 2
    }
   fs.writeFileSync(oAddr, JSON.stringify(order))
    res.setHeader("Content-type", "application/json")
    res.status(200).send(order );
    return
})


// DELETE - removes an existing order by id. As a response returns id of deleted order.

app.delete("/orders:id", (req, res) => {

    const oAddr = `./db/orders.json`;
    res.setHeader("Content-type", "application/json")
    res.status(200).send(req.params.id);
    return
})

app.listen(3001)


// router.delete('/:id', function (req, res) {
//     User.findByIdAndRemove(req.params.id, function (err, user) {
//       if (err) return res.status(500).send("There was a problem deleting the user.");
//       res.status(200).send("User: "+ user.name +" was deleted.");
//     });
//   });