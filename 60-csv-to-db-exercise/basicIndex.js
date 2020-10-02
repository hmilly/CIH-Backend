const mysql = require('mysql')
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "my_db"
})

// create if it doesnt exist
const createTable = (tableName, input) => {
    con.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${input})`
        , (err, result, fields) => {
            if (err) throw err;
        })
}
//createTable(`visitors`, "id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255), "
//+ "Sex VARCHAR(255), Age INT, `Height (in)` INT, `Weight (lbs)` INT")

const insertData = (d) => {
    con.query("INSERT INTO visitors (Name, Sex, Age, `Height (in)`, `Weight (lbs)`)"
        + `VALUES ('${d.Name}', '${d.Sex}', ${d.Age}, ${d["Height (in)"]}, ${d["Weight (lbs)"]})`
        , (err, result, fields) => {
            if (err) throw err;
            console.log("user added to table")
        })
}

// call data function to 'pipe' all users to table via insertData f
const data = () => {
    fs.createReadStream(path.resolve("./csv/visitors.csv"))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', data => insertData(data))
}
//data()

module.exports = {createTable, insertData}