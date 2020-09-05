const fs = require('fs');
/**
 * Exercise 1
 *
 * create a function {createJsonFileWithContent} that will take
 * {data} and {fileName} as arguments, stringify {data}
 * and store it in the json file {./data/[fileName].json}
 * synchronously.
 *
 * NOTES:
 * 1. if {filename} not provided, log an error "File name is missing"
 * 2. if path is incorrect, log an error "No such file or directory"
 */

const createJsonFileWithContent = (data, fileName) => {
    const filePath = `./data/${fileName}.json`
    if (!fileName) {
        console.log("File name is missing");
    }
    try {
        fs.writeFileSync(filePath, JSON.stringify(data))
    } catch (error) {
        console.log(error, "No such file or directory")
    }
}

/**
 * Exercise 2
 *
 * create a function {readJsonFile} that will take a {fileName} that
 * exist in {./data/} as an argument,
 * read, parse it and return file content as an object synchronously.
 * If file does not exist, return
 *
 * NOTES:
 * 1. if path is incorrect, log an error "No such file or directory"
 */
const readJsonFile = (fileName) => {
    try {
        return JSON.parse(fs.readFileSync(`./data/${fileName}.json`, 'utf8'))
        
    } catch (error) {
        console.log(error, "No such file or directory")
        return null
    }
}
/**
 * Exercise 3
 *
 * create a function {updateFileWithContent} that will take
 * {data} that need to be added/modified and {fileName} as arguments,
 * and add it the file {./data/[fileName].json} synchronously.
 */

const updateFileWithContent = (data, fileName) => {
    try {
        let fileData = JSON.parse(fs.readFileSync(`./data/${fileName}.json`))
        fileData = {...fileData, ...data}
        fs.writeFileSync(`./data/${fileName}.json`, JSON.stringify(fileData))
    } catch (error) {
        console.log(error, "updated")
    }
}

/**
 * Exercise 4
 *
 * create a function {getFileSize} that will take {fileName} as argument and return
 * file size in bytes.
 */

const getFileSize = (fileName) => {
   return fs.statSync(`./data/${fileName}.json`).size;;
}
/**
 * Exercise 5
 *
 * create a function {cloneJsonFile} which will take a {src} and {destination}
 * as arguments and create a clone file.
 *
 * NOTE:
 *
 * if you get an error, log error message
 */

const cloneJsonFile = (src, destination) => {
    fs.copyFileSync(src, destination, (err) =>
        console.log(err, "Oh no, cloning error!")
    )
    console.log("ex5 'cloneJsonFile', ran")
}

/**
 * Exercise 6
 *
 * create a function {deleteFile} which will take a {src}
 * as an argument and delete a file.
 *
 * NOTE:
 *
 * if you get an error, log error message
 */

const deleteFile = (src) => {
    fs.unlinkSync(src, (err) => {
        if (err) throw err
        console.log("Oh no, deletion error!")
    })
    console.log("ex6 'deleteFile', ran")
}
// createJsonFileWithContent({ "name": "m" }, "tester")
// readJsonFile("tester")
// updateFileWithContent({ "data": "Updated Data" }, "tester")
// getFileSize("./data/tester.json")
// cloneJsonFile("./data/tester.json", "./data/testfile2.json")
// deleteFile("./data/tester.json")
