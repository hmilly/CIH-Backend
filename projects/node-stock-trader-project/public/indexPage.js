const socket = io();
const select = (item) => document.querySelector(`.${item}`)
const stockMain = select("stock-main")
const usersMain = select("users-main")


socket.on("updateStock", (stockData) => {
    console.log(stockData)
    stockData.map((stock, i) => {
        const stockNum = select(`stock${i +1}`)
        stockNum.innerText =
        `${stock.currentPrice ? stock.currentPrice : stock.lastPrice}`
    })
})