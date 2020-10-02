const mysql = require('mysql');
const express = require('express')
const app = express()
app.use(express.json());

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
   database: 'my_db'
});


// show databases
const showDatabase = () => {
    con.query(`SHOW DATABASES`, (err, result, fields) => {
        if (err) throw err;
        let databases = result.map(x => ` ` + JSON.stringify(x.Database))
        console.log(`All databases: ${databases}`);
    })
}
//showDatabase()

//create if it doesnt exist 
const createDatabase = (dbName) => {
    con.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err, result, fields) => {
        if (err) throw err;
        console.log(`DATABASE named: ${dbName} created`);
    })
}
//createDatabase(my_db)

// show table
const showTable = () => {
    con.query(`SHOW TABLES`, (err, result, fields) => {
        if (err) throw err;
        let tables = result.map(x => ` ` + JSON.stringify(x.Tables_in_my_db))
        console.log(`All tables: ${tables}`);
    })
}
//showTable()
// create if it doesnt exist
const createTable = (tableName, input) => {
    con.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${input})`, (err, result, fields) => {
        if (err) throw err;
        console.log(`TABLE named: ${tableName} created`);
    })
}
//createTable(users, "id INT AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(255), lastName VARCHAR(255), age INT")

// -- --- /api/users --- -- //
//get all users 

app.get("/api/users", async (req, res) => {
    let name = req.query.name
    if (!req.query.name) {
        con.query(`SELECT * FROM users`, (err, result, fields) => {
            if (err) throw err
            res.setHeader("Content-Type", "application/json")
            res.status(200).send(result);
        })
    } else {
        con.query(`SELECT * FROM users WHERE firstName = "${name}"`, (err, result, fields) => {
            if (err) throw err
            res.setHeader("Content-Type", "application/json")
            res.status(200).send(result);
        })
    }

})

// POST - add new user to users table
app.post("/api/users", async (req, res) => {
    con.query(`INSERT INTO users(firstName, lastName, age) VALUES ("ryan", "jams", 35)`, (err, result, fields) => {
        if (err) throw err
        res.setHeader("Content-Type", "application/json")
        res.status(200).send(result);
    })
})


// -- --- /api/user/:id --- -- //
app.get("/api/user/:id", async (req, res) => {
    let n = parseInt(req.params.id)
    con.query(`SELECT * FROM users WHERE id = ${n}`, (err, result, fields) => {
        if (err) throw err
        res.setHeader("Content-Type", "application/json")
        res.status(200).send(result);
    })
})

// // // PATCH - updates an existing user by id. As a response returns new user.
app.patch("/api/user/:id", async (req, results) => {
    let n = parseInt(req.params.id)
    con.query(`UPDATE users SET age = 27 WHERE id = ${n}`,
        (err, res, f) => {
            if (err) throw err
            con.query(`SELECT * FROM users WHERE id = ${n}`, (err, result, fields) => {
                if (err) throw err
                results.setHeader("Content-Type", "application/json")
                results.status(200).send(result);
            })
        })
})

// // // DELETE - removes an existing user by id. As a response returns id of removed user.
app.delete("/api/user/:id", async (req, res) => {
    let n = parseInt(req.params.id)
    con.query(`DELETE FROM users WHERE id = ${n}`,
        (err, result, f) => {
            if (err) throw err
            res.setHeader("Content-Type", "application/json")
            res.status(200).send({ id: n });
        })
})

app.listen(3000, () => {
    console.log("Express working on port 3000")
})
