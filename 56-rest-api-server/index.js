const express = require("express")
const fs = require("fs");

const app = express();
app.use(express.json());


// Endpoint - /users/

// GET - Returns all users as a JSON object.

app.get("/users", (req, res) => {
    const users = JSON.parse(fs.readFileSync(`./db/users.json`, "utf-8"))
    res.send(users);
    return
})


// POST - adds a new user. As a response returns new user.

app.post("/users", async (req, res) => {
    let users = JSON.parse(fs.readFileSync(`./db/users.json`, "utf-8"))
    try {
        users = [...users, { ...req.body }]
        fs.writeFileSync(`./db/users.json`, JSON.stringify(users))
    }
    catch (error) {
        console.log(error)
    }
    res.send(req.body);
    return
})

// Endpoint - /user/:id

// // GET - Returns a user.

app.get("/user/:id", (req, res) => {
    const addr = `./db/users.json`
    const allUsers = JSON.parse(fs.readFileSync(addr, "utf-8"))
    const user = allUsers.find(u => u.id === parseInt(req.params.id))
    res.send(user);
    return
})

// // PATCH - updates an existing user by id. As a response returns new user.

app.patch("/user/:id", (req, res) => {
    const addr = `./db/users.json`
    const allUsers = JSON.parse(fs.readFileSync(addr, "utf-8"))
    let updatedUser
    allUsers.map(u => {
        if (u.id === parseInt(req.params.id)){
        u = { ...req.body }
        updatedUser = u
    }})
    console.log("updatedU", updatedUser)
    const updateDb = [...allUsers]
    fs.writeFileSync(addr, JSON.stringify(updateDb))
    res.setHeader("Content-type", "application/json")
    res.status(200).send(updatedUser);
    return
})

// // DELETE - removes an existing user by id. As a response returns id of removed user.

app.delete("/user/:id", (req, res) => {
    let allUsers = JSON.parse(fs.readFileSync(addr, "utf-8"))
    allUsers.map(u => {
        if (u.id === parseInt(req.params.id)){
            destroyDirectory(req.params.id)
    }})
    fs.writeFileSync(addr, JSON.stringify(allUsers))
    res.setHeader("Content-type", "application/json")
    res.status(200).send(req.params.id);
    return
})


// // Endpoint - /orders

// // GET - Returns all orders.

app.get("/orders", (req, res) => {
    const orders = fs.readFileSync("./db/orders.json", "utf-8")
    res.send( orders );
    return
})

// // POST - adds a new order. As a response returns a new order.

app.post("/orders", (req, res) => {
    const orders = JSON.parse(fs.readFileSync("./db/orders.json", "utf-8"))

    try {
    orders = [...orders, req.body]
    fs.writeFileSync("./db/orders.json", JSON.stringify(orders))
    } catch (err) {
        console.log(err)
    }
    res.send( newOrder );
    return
})




// // Endpoint - /orders?userId=:id

// // GET - Returns all orders by user id.

// app.get("/orders?userId=:id", (req, res) => {

//     const oAddr = `./db/orders.json`;
//     const orders = JSON.parse(fs.readFileSync(oAddr, "utf-8"))

//     res.setHeader("Content-type", "application/json")
//     res.status(200).send( orders );
//     return
// })




// // Endpoint - /order/:id

// // GET - Returns an order.

app.get("/order:id", (req, res) => {
    const oAddr = `./db/orders.json`;
    const allOrders = JSON.parse(fs.readFileSync(oAddr, "utf-8"))
    const order = allOrders.find(o => o.id === parseInt(req.params.id))
    res.send( order);
    return
})

// // PATCH - updates an existing order by id. As a response returns modified order.

// app.patch("/order:id", (req, res) => {

//     const oAddr = `./db/orders.json`;
//     let order = JSON.parse(fs.readFileSync(oAddr, "utf-8"))
//     order = {
//         id: 1,
//         userId: 4,
//         productName: "orange",
//         quantity: 2
//     }
//    fs.writeFileSync(oAddr, JSON.stringify(order))
//     res.setHeader("Content-type", "application/json")
//     res.status(200).send(order );
//     return
// })


// // DELETE - removes an existing order by id. As a response returns id of deleted order.

// app.delete("/orders:id", (req, res) => {

//     const oAddr = `./db/orders.json`;
//     res.setHeader("Content-type", "application/json")
//     res.status(200).send(req.params.id);
//     return
//})

app.listen(3001)


// router.delete('/:id', function (req, res) {
//     User.findByIdAndRemove(req.params.id, function (err, user) {
//       if (err) return res.status(500).send("There was a problem deleting the user.");
//       res.status(200).send("User: "+ user.name +" was deleted.");
//     });
//   });