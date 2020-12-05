const express = require("express")
const app = express();
const http = require('http')
const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server)
const path = require("path")

var request = require('request');
const { token } = require('./loginDetails')
const users = require("./users.json")

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

var requestOptions = {
  'url': `https://api.tiingo.com/iex/?tickers=spy,tsla,amzn,wmt,dis&token=${token}`,
  'headers': {
    'Content-Type': 'application/json'
  }
};

const int = () => {
  request(requestOptions,
    function (error, response, body) {
      let obj = []
      JSON.parse(body).map((item, i) => {
        if (item.bidPrice) {
          obj.push({
            "id": i + 1,
            "stockName": item.ticker,
            "currentPrice": item.bidPrice
          })
        } else {
          obj.push({
            "id": i + 1,
            "stockName": item.ticker,
            "lastPrice": item.prevClose
          })
        clearInterval(interval)
        }
      })
      io.on("connection", (socket) => {
        console.log("running!")
      })
      io.sockets.emit("updateStock", obj)
    })
}

int()
const interval = setInterval(() => {
  int()
}, 5000);


io.on("connection", (socket) => {
  console.log("running!")
  io.emit("printUsers", users)
})




server.listen(3000, () => console.log("project listening!"))