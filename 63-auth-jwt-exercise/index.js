const express = require("express")
const bcrypt = require('bcrypt')
const fs = require("fs");
const saltRounds = 10;
const jwt = require('jwt-simple');
const SECRET_KEY = 'veryimportantsecrets123'

const app = express();
app.use(express.json());

const findUser = (user) => {
    const users = JSON.parse(fs.readFileSync('./db.json', "utf-8"))
    return users.find(u => { if (u.username == user) return u })
}

// Endpoint - /users/
// GET - Returns all users as a JSON object.
app.get("/users", (req, res) => {
    const users = JSON.parse(fs.readFileSync('./db.json', "utf-8"))
    res.status(200).send(users);
    return
})

// Endpoint - /user/signup
app.post("/user/signup", (req, res) => {
    const password = req.body.password;
    const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if (password.match(paswd)) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                let fileData = JSON.parse(fs.readFileSync('./db.json', "utf-8"))
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
        res.status(200).send({ message: `${req.body.username} added to db` })
    } else {
        res.status(400).send({ status: 400, message: "Password does not match requirements" })
    }
})

// Endpoint - /user/login
app.post("/user/login", (req, res) => {
    const user = findUser(req.body.username)
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !result) res.status(403).send({ status: 403, message: "Invalid password or username" })
        else
            res.status(200).send({ status: 200, token: jwt.encode(user, SECRET_KEY) })
    })
})

// /user/authenticate
app.post("/user/authenticate", (req, res) => {
    const user = jwt.decode(req.body.token, SECRET_KEY)
    const userinDb = findUser(user.username)

    if (!userinDb) { res.status(403).send({ status: 403, message: "Unauthorised" }) }
    else {
        res.status(200).send({ status: 200, message: `Permission granted to: ${user.username}` })
    }
})


app.listen(3000, () => console.log("ex 63 listening!"))