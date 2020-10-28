const express = require("express")
const bcrypt = require('bcrypt')
const fs = require("fs");
const saltRounds = 10;

const app = express();
app.use(express.json());

// Endpoint - /users/
// GET - Returns all users as a JSON object.
app.get("/users", (req, res) => {
    const users = JSON.parse(fs.readFileSync('./db.json', "utf-8"))
    res.status(200).send(users);
    return
})

// Endpoint - /user/signup
app.post("/user/signup", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if (password.match(paswd)) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                let fileData = JSON.parse(fs.readFileSync(`./db.json`))
                if (err) console.log(err)

                fileData = [...fileData, {
                    id: fileData.length + 1,
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                }]
                fs.writeFileSync(`./db.json`, JSON.stringify(fileData))
            });
        });
    } else {
        res.status(400).send("Password does not match requirements")
    }
})

// Endpoint - /user/login
app.post("/user/login", (req, res) => {
    const users = JSON.parse(fs.readFileSync('./db.json', "utf-8"))
    const user = users.find(u => { if (u.username == req.body.username) return u })

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) res.status(403).send("Invalid password or username")
        else
            res.status(200).send("Logged in successfully")
    })
})

app.listen(3000, () => console.log("ex 62 listening!"))