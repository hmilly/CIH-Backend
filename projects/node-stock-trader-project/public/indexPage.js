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

socket.once("printUsers", (userData) => {

    userData.map((user, i) => {
        select("users-main").innerHTML +=
            `<div class="user user${i}">
        <h3 class="username">${user.firstName} ${user.lastName}</h3>
        <p class="user-balance">${user.balance}</p>
        <div class="users-shares"></div>
        <button class="user-btn">Select user</button>
    </div>`
        userData[i].transactions.map((data, j) => {
            select("users-shares").innerHTML +=
                `<div class="shares-div">
            <h3 class="company-name">${data.shareName}</h3>
            <h5 class="quantity">${data.quantity}</h5>
            </div>`
        })
    })
})



const addBtns = document.querySelectorAll(".add1")
const minusBtns = document.querySelectorAll(".minus1")

addBtns.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.path[1].querySelector(".quantity").value++
}))
minusBtns.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.path[1].querySelector(".quantity").value--
}))


const buyBtns = document.querySelectorAll(".buy-btn")
buyBtns.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputVal = e.path[1].querySelector(".quantity").value
    if (inputVal > 0) {
        e.path[1].querySelector(".quantity").value = 0
    }
}))

const sellBtn = document.querySelectorAll(".sell-btn")
sellBtn.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputVal = e.path[1].querySelector(".quantity").value
    if (inputVal < 0) {
        e.path[1].querySelector(".quantity").value = 0
    }
}))


let currentUser


setTimeout(() => {
    const userbutton = document.querySelectorAll(".user-btn")

    userbutton.forEach(btn => btn.addEventListener("click", (e) => {
        e.preventDefault();
        const userDiv = e.path[1]
        let shareObj = []
        const userShares = userDiv.querySelectorAll(".shares-div")
        userShares.forEach(s => {
            const companyName = s.querySelector(".company-name").innerText
            const quantity = s.querySelector(".quantity").innerText
            shareObj.push({ companyName, quantity })
        })

        const userName = userDiv.querySelector(".username").innerText
        const userBalance = parseInt(userDiv.querySelector(".user-balance").innerText)
        currentUser = { userName: userName, userBalance: userBalance, userShares: shareObj }

        userDiv.classList.add('active')
        btn.innerText = "Current User"

    }))


}, 500)



