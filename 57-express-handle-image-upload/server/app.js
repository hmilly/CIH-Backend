const express = require("express")
const fileUpload = require('express-fileupload')
const app = express();
app.use(fileUpload());

app.get('/', (req, res) => {
    const directory = __dirname.replace('server', 'index.html')
    res.sendFile(directory)
})

app.post('/', function (req, res) {
    if (req.files) {
        const file = req.files.file
        const today = new Date().toJSON().slice(0, 10)
        const fn = file.name.split(".")
        const fileName = fn[0] + "_" + today + "." + fn[1]

        if (fn[1] === "jpeg" || fn[1] === "jpg" || fn[1] === "png" || fn[1] === "gif") {
            file.size <= 2097152 ?
                file.mv('../images/' + fileName, (err) => {
                    res.status(200).send("File Uploaded")
                })
                : res.status(400).send("File size should be less than 2mb.")
        } else {
            res.status(400).send("File type needs to be image only.")
        }
    } else {
        res.status(400).send("Bad request")
    }
});

app.listen(3001, () => console.log("ex 57 listening!"))