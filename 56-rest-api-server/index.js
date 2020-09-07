const express = require("express")
const fs = require("fs")

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {

    const userFile = ".db/users.json";
    const users = JSON.parse(fs.readFileSync(userFile, "utf-8"))

    res.setHeader("Content-type", "application/json")
    res.status(200).send({ result: users });
    return
})



// app.post("/users", async (req, res) => {

//     const userFile = ".db/users.json";
//     const users = JSON.parse(fs.readFileSync(userFile, "utf-8"))
    

//     res.setHeader("Content-type", "application/json")
//     res.status(200).send({ result: users });
//     return
// })




app.get("/user/id", async (req, res) => {

    const u = ".db/users/id.json";
    const user = JSON.parse(fs.readFileSync(u, "utf-8"))

    res.setHeader("Content-type", "application/json")
    res.status(200).send({ result: user });
    return
})

// app.patch("/user/id", async (req, res) => {

//     const u = ".db/users/id.json";
//     const user = JSON.parse(fs.readFileSync(u, "utf-8"))

//     res.setHeader("Content-type", "application/json")
//     res.status(200).send({ result: user });
//     return
// })

// app.delete("/user/id", async (req, res) => {

//     const u = ".db/users/id.json";


//     res.setHeader("Content-type", "application/json")
//     res.status(200).send({ result: user.id });
//     return
// })





app.get("/orders", async (req, res) => {

    const o = ".db/orders.json";
    const orders = JSON.parse(fs.readFileSync(o, "utf-8"))

    res.setHeader("Content-type", "application/json")
    res.status(200).send({ result: orders });
    return
})

// app.post("/orders", async (req, res) => {

//     const o = ".db/orders.json";
//     const orders = JSON.parse(fs.readFileSync(o, "utf-8"))

//     res.setHeader("Content-type", "application/json")
//     res.status(200).send({ result: orders });
//     return
// })



// app.get("/orders?userId=:id", async (req, res)=> {

//     const o = ".db/orders.json";
//     const orders = JSON.parse(fs.readFileSync(o, "utf-8"))

//     res.setHeader("Content-type", "application/json")
//     res.status(200).send({ result: orders });
//     return
// })


// app.get("/order:id", async (req, res)=> {

//     const o = ".db/orders/id.json";
//     const orders = JSON.parse(fs.readFileSync(o, "utf-8"))

//     res.setHeader("Content-type", "application/json")
//     res.status(200).send({ result: orders });
//     return
// })

// app.patch("/order:id", async (req, res)=> {

//     const o = ".db/orders/id.json";
//     const orders = JSON.parse(fs.readFileSync(o, "utf-8"))

//     res.setHeader("Content-type", "application/json")
//     res.status(200).send({ result: orders });
//     return
// })

// app.delete("/orders:id, async (req, res)=> {

//     const o = ".db/orders/id.json";
//     const orders = JSON.parse(fs.readFileSync(o, "utf-8"))

//     res.setHeader("Content-type", "application/json")
//     res.status(200).send({ result: orders });
//     return
// })