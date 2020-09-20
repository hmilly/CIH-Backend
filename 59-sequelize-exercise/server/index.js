const { request } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const express = require('express')

const app = express()
app.use(express.json());

const seq = new Sequelize('my_db', 'root', 'rootroot', {
    host: 'localhost',
    dialect: 'mysql'
});



const Order = seq.define("order", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
}, { timestamps: false })

//Create table if it doesn't exist
//Order.sync();

const addOrder = async (order) => {
    try {
        await Order.create(order)
    } catch (err) {
        console.log(err)
    }
}


const getAllOrders = async (idx) => {
    try {
        if (!idx) {
            return await Order.findAll({ raw: true })
        } else {
            return await Order.findAll({
                where: {
                    id: idx
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}



const getAllCustOrders = async (idx) => {
    try {
        return await Order.findAll({
            where: {
                userId: idx
            }
        })
    } catch (err) {
        console.log(err)
    }
}

const updateOrder = async (name, id) => {
    try {
        return await Order.update({ productName: name },
            { where: { id: id } })
    } catch (err) {
        console.log(err)
    }
}

const deleteOrder = async (id) => {
    try {
        return await Order.destroy({ where: { id: id } })
    } catch (err) {
        console.log(err)
    }
}


const start = async () => {
    try {
        await seq.authenticate();
        console.log('Connection successful');
    } catch (error) {
        console.error('Unable to connect:', error);
    }
}
start()



// // -- ---/api/orders --- -- //
// //get all orders 

app.get("/api/orders", async (req, res) => {
    let orders = await getAllOrders()
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(orders);
})

// // POST - add new user to orders table
app.post("/api/orders", async (req, res) => {
    await addOrder({ productName: "whoas", quantity: 100, userId: 3 })
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(JSON.stringify("added item"));
})


// // -- --- /api/order/?userId= --- -- //
// request parameters for orders for user id
app.get("/api/order", async (req, res) => {
    let userId = parseInt(req.query.userId)
    let order = await getAllCustOrders(userId)
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(order);
})


// // -- --- /api/order/:id --- -- //
// request parameters for order id
app.get("/api/order/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let order = await getAllOrders(id)
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(order);
})

// // // PATCH - updates an existing user by id. As a response returns new user.
app.patch("/api/order/:id", async (req, res) => {
    let idx = parseInt(req.params.id)
    await updateOrder("grapes", idx)
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(JSON.stringify(`order ${idx} Updated!`))
})

// // // // DELETE - removes an existing user by id. As a response returns id of removed user.
app.delete("/api/order/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    await deleteOrder(id)
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(JSON.stringify(`id of deleted item: ${id}`))

})


app.listen(3000, () => {
    console.log("Express working on port 3000")
})
