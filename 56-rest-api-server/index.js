const express = require("express")
const fs = require("fs");

const app = express();
app.use(express.json());


// Endpoint - /users/

// GET - Returns all users as a JSON object.

app.get("/users", (req, res) => {
    const users = JSON.parse(fs.readFileSync(`./db/users.json`, "utf-8"))
    res.status(200).send(users);
    return
})

// POST - adds a new user. As a response returns new user.

app.post("/users", (req, res) => {
    let users = JSON.parse(fs.readFileSync(`./db/users.json`, "utf-8"))
    try {
        users = [...users, { id: (users.length + 2), ...req.body }]
        fs.writeFileSync(`./db/users.json`, JSON.stringify(users))
    }
    catch (error) {
        console.log(error)
    }
    res.status(200).send(req.body);
    return
})

// Endpoint - /user/:id

// // GET - Returns a user.

app.get("/user/:id", (req, res) => {
    const addr = `./db/users.json`
    const allUsers = JSON.parse(fs.readFileSync(addr, "utf-8"))
    const user = allUsers.find(u => u.id === parseInt(req.params.id))
    res.status(200).send(user);
    return
})

// // PATCH - updates an existing user by id. As a response returns new user.

app.patch("/user/:id", (req, res) => {
    const allUsers = JSON.parse(fs.readFileSync(`./db/users.json`, "utf-8"))
    let edited = allUsers.splice(allUsers
        .indexOf(allUsers
            .find(u => u.id === parseInt(req.params.id)
            )), 1)
    edited = { id: (allUsers.length + 2), ...req.body }
    fs.writeFileSync(`./db/users.json`, JSON.stringify([...allUsers, edited]))
    res.status(200).send(edited)
    return
})

// // DELETE - removes an existing user by id. As a response returns id of removed user.

app.delete("/user/:id", (req, res) => {
    const addr = `./db/users.json`
    let allUsers = JSON.parse(fs.readFileSync(addr, "utf-8"))
    allUsers.splice(allUsers
        .indexOf(allUsers
            .find(u => u.id === parseInt(req.params.id)
            )), 1)
    fs.writeFileSync(addr, JSON.stringify([...allUsers]))
    res.status(200).send(req.params.id);
    return
})

// // Endpoint - /orders

// // GET - Returns all orders.

// // Endpoint - /orders?userId=:id

// GET - Returns all orders by user id.

app.get("/orders", (req, res) => {
    let allOrders = JSON.parse(fs.readFileSync("./db/orders.json", "utf-8"))
    if (!req.query.userId) {
        res.status(200).send(allOrders);
        return
    } else {
        let orders = allOrders.filter(o => o.userId.match(req.query.userId))
        res.status(200).send(orders);
        return
    }
})

app.get("/orders", (req, res) => {
    const orders = fs.readFileSync("./db/orders.json", "utf-8")
    res.status(200).send(orders);
    return
})

// // POST - adds a new order. As a response returns a new order.

app.post("/orders", (req, res) => {
    let orders = JSON.parse(fs.readFileSync("./db/orders.json", "utf-8"))
    try {
        orders = [...orders, { id: (orders.length + 1), ...req.body }]
        fs.writeFileSync("./db/orders.json", JSON.stringify(orders))
    } catch (err) {
        console.log(err)
    }
    res.status(200).send(req.body);
    return
})

// // Endpoint - /order/:id

// // GET - Returns an order.

app.get("/order/:id", async (req, res) => {
    const oAddr = `./db/orders.json`;
    const allOrders = JSON.parse(fs.readFileSync(oAddr, "utf-8"))
    const order = allOrders.find(o => o.id === parseInt(req.params.id))
    res.status(200).send(order);
    return
})

// // PATCH - updates an existing order by id. As a response returns modified order.

app.patch("/order/:id", (req, res) => {
    const orders = JSON.parse(fs.readFileSync(`./db/orders.json`, "utf-8"))
    let edited = orders.splice(orders
        .indexOf(orders
            .find(o => o.id === parseInt(req.params.id)
            )), 1)
    edited = { id: (orders.length + 1), ...req.body }
    fs.writeFileSync(`./db/orders.json`, JSON.stringify([...orders, edited]))
    res.status(200).send(edited)
    return
})

// // DELETE - removes an existing order by id. As a response returns id of deleted order.

app.delete("/order/:id", (req, res) => {
    const oAddr = `./db/orders.json`;
    let orders = JSON.parse(fs.readFileSync(oAddr, "utf-8"))
    orders.splice(orders
        .indexOf(orders
            .find(o => o.id === parseInt(req.params.id)
            )), 1)
    fs.writeFileSync(oAddr, JSON.stringify([...orders]))
    res.status(200).send(req.params.id);
    return
})

app.listen(3001, () => console.log("ex 56 listening!"))