const express = require("express")
const fs = require("fs");
const db = require('./db')
const fetch = require("node-fetch");

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    db.getAllPokemon().then(pokemons => {

        res.send(pokemons)
    })
})

app.get("/:userId", (req, res) => {
    const id = req.params.id
    

})




app.listen(3000, () => console.log("ex 64 listening!"))