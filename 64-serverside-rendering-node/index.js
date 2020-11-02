const express = require("express")
const fs = require("fs");

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    const users = JSON.parse(fs.readFileSync('./db.json', "utf-8"))

})

app.get("/:userId", (req, res) => {
    const id = req.params.id
    

})




app.listen(3000, () => console.log("ex 64 listening!"))