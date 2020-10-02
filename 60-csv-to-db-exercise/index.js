const express = require('express')
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const app = express();

app.use(express.json())

app.get("/", async (req, res) => {
    const recieveData = []
    fs.createReadStream(path.resolve("./csv/visitors.csv"))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', data => recieveData.push(data))
    .on('end', data => res.status(200).json(recieveData))
})

app.listen(3000);
