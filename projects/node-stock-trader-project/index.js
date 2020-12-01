const express = require("express")
const { token } = require('./loginDetails')
const app = express();
var request = require('request');
const path = require("path")
const data = require('./users.json')
const users = require('./users.json')
console.log(users)

app.use(express.static(path.join(__dirname, 'public')));

//var WebSocket = require('ws');
//var ws = new WebSocket('wss://api.tiingo.com/iex');



app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html', {
        headers: {
          'data': data
        }
    })
});

// setInterval(() => {
//     var requestOptions = {
//         'url': `https://api.tiingo.com/iex/?tickers=spy,tsla,amzn,wmt,dis&token=${token}`,
//         'headers': {
//             'Content-Type': 'application/json'
//         }
//     };
//     request(requestOptions,
//         function (error, response, body) {
//             let obj = []
//             JSON.parse(body).map((item, i) => {
//                 if (item.bidPrice) {
    
//                     obj.push({
//                         "id": i + 1,
//                         "stockName": item.ticker,
//                         "currentPrice": item.bidPrice
//                     })
//                 } else {
//                     obj.push({
//                         "id": i + 1,
//                         "stockName": item.ticker,
//                         "lastPrice": item.prevClose
//                     })
//                 }
//             })
//             console.log(obj)
//         })
// }, 5000);


// connect to tingo websockets for test with updates: 

// var subscribe = {
//     'eventName': 'subscribe',
//     'eventData': {
//         'authToken': '8bb100914ed95302f4fa8bb650140bc974970703'
//     }
// }
// ws.on('open', function open() {
//     ws.send(JSON.stringify(subscribe));
// });

// ws.on('message', function (data, flags) {
//     console.log(data)
// });



// websockets updates realtime prices
// var subscribe = {
//     'eventName':'subscribe',
//     'authorization':`${token}`,
//     'eventData': {
//         'thresholdLevel': 5,
//         'tickers': ['spy', 'tsla']
//     }
// }
// ws.on('open', function open() {
//     ws.send(JSON.stringify(subscribe));
// });

// ws.on('message', (data, flags) => {
//     data = data.split(",")
//     const obj = {
//         "shareName" : data[3],
//         "currentPrice" : data[9]
//     }
//     console.log(obj)
// });




app.listen(3000, () => console.log("project listening!"))