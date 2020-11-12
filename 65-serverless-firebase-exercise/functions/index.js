const functions = require("firebase-functions")
const admin = require("firebase-admin")
const express = require("express")
const fba = admin.initializeApp(functions.config().firebase)


const app = express();

const getdata = (endpoint, dbName) => {
  app.get(endpoint, async (req, res) => {
    const ref = fba.database().ref(dbName)
    if (req.params.id === undefined) {
      const data = await ref.once('value')
        .then(snap => snap.val())
      res.json(data)
    } else {
      const ide = parseInt(req.params.id)
      const data = await ref.once('value')
        .then(snap => snap.val()[ide])
      res.json(data)
    }
  })
}

const writedata = (endpoint, dbName, fname, lname, numOrTitle = null, bal = null) => {
  app.post(endpoint, async (req, res) => {
    const ref = fba.database().ref(dbName)
    let data = await ref.once('value').then(snapshot => snapshot.val())

    const obj = data.concat({ ...req.body })
    ref.set(obj)

    res.send(`New data added to ${dbName}`)
  })
}

const deleteData = (endpoint, dbName) => {
  app.delete(endpoint, async (req, res) => {
    const ide = parseInt(req.params.id)
    fba.database().ref(dbName).child(ide).remove()
    res.send(`${dbName} database edited, id ${ide} deleted`)
  })
}

const update = (endpoint, dbName) => {
  app.patch(endpoint, async (req, res) => {
    const ide = parseInt(req.params.id)
    fba.database().ref(dbName).child(ide).update({
      ...req.body
    })
    res.send(`${dbName} database edited, item with id ${ide} changed`)
  })
}

//res.set("Cache-Control", "public, max-age=300, s-maxage=600");

// GET - returns a list of all clients;
// POST - creates a new client;
getdata("/api/clients", "clients")
writedata("/api/clients", "clients")

// GET - returns a client by ID;
// PATCH - update an existing client;
// DELETE - remove a client by ID;
getdata("/api/client/:id", "clients")
update("/api/client/:id", "clients")
deleteData("/api/client/:id", "clients")

// GET - returns a list of all employees;
// POST - creates a new employee;
getdata("/api/employees", "employees")
writedata("/api/employees", "employees")

// /api/employee/:id
// GET - returns a employee by ID;
// PATCH - update an existing employee;
// DELETE - remove a employee by ID;
getdata("/api/employee/:id", "employees")
update("/api/employee/:id", "employees")
deleteData("/api/employee/:id", "employees")

// / - return HTML file with 2 lists:
// employees
// clients
app.get("/", async (req, res) => {

  
})

// /client/:id - return HTML with client's details;
app.get("/client/:id", async (req, res) => {
  const ref = fba.database().ref("clients")
  const ide = parseInt(req.params.id)
  const data = await ref.once('value')
    .then(snap => snap.val()[ide])
  res.sendFile(`${data}`)
})

// /employee/:id - return HTML with employee's details;

app.get("/employee/:id", async (req, res) => {
  const ref = fba.database().ref(dbName)
  const ide = parseInt(req.params.id)
  const data = await ref.once('value')
    .then(snap => snap.val()[ide])
  res.json(data)
})

exports.app = functions.https.onRequest(app)