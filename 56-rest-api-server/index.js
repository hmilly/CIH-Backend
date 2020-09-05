const express = require("express")
const fs = require("fs")

const app = express();
app.use(express.json());

app.get("/users", async (req, res)=> {

    const file = ".db/users.json";
    const users = JSON.parse(fs.readFileSync(file, "utf-8"))

    res.setHeader("Content-type" : "")
})