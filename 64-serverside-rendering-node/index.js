const express = require("express")
const db = require('./db.json')

const app = express();

app.set("view engine", "pug");
app.use(express.static('scripts'));

app.get("/", (req, res) => {
  res.render("users", {
    db
  })
})

app.get("/user/:id", (req, res) => {
  db.map(u => {
    if (u.id === parseInt(req.params.id))
      res.render("user", u)
  })
});


app.listen(3000, () => console.log("ex 64 listening!"))