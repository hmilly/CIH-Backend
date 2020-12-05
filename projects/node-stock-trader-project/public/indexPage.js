const socket = io();
const select = (item) => document.querySelector(`.${item}`)
const stockMain = select("stock-main")
const usersMain = select("users-main")


socket.on("updateStock", (stockData) => {
    stockData.map((stock, i) => {
        const stockNum = select(`stock${i + 1}`)
        stockNum.innerText =
            `${stock.currentPrice ? stock.currentPrice : stock.lastPrice}`
    })
})

socket.on("printUsers", (userData) => {

    userData.map((user, i) => {
        select("users-main").innerHTML +=
            `<div class="user user${i}">
        <h3 class="username">${user.firstName} ${user.lastName}</h3>
        <p class="user-balance">${user.balance}</p>
        <div class="users-shares"></div>
    </div>`
        userData[i].transactions.map((data, j) => {
            select("users-shares").innerHTML =
        `   <h3 class="company-name">${data.shareName}</h3>
            <h5 class="quantity">${data.quantity}</h5>`
        })
    })



})



