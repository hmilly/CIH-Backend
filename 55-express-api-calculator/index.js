const express = require("express")
const app = express();
const fs = require("fs")

app.get(`/double/:num`, (req, res) => {
    const num = parseInt(req.params.num) * 2;
    res.setHeader("Content-Type", "application/json")
    res.status(200).send({ result: num });
    return
});

app.get(`/square/:num`, (req, res) => {
    const n = parseInt(req.params.num)
    const sq = n * n;

    res.setHeader("Content-Type", "application/json")
    res.status(200).send({ result: sq });
    return
});

app.get(`/:num1/:operation/:num2`, (req, res) => {
    const n1 = parseInt(req.params.num1)
    const n2 = parseInt(req.params.num2)
    const op = req.params.operation

    let t
    if (op === "add") t = n1 + n2
    if (op === "subtract") t = n1 - n2
    if (op === "multiply") t = n1 * n2
    if (op === "divide") t = n1 / n2

    if (isNaN(t)) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send("not found");
        return;
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).send({ result: t });
    return
});

//app.listen(3000)