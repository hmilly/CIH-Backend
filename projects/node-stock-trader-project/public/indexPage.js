const socket = io();
const select = (item) => document.querySelector(`.${item}`)
const stockMain = select("stock-main")
const usersMain = select("users-main")


socket.on("updateStock", (stockData) => {
    //console.log(stockData)
    stockData.map((stock, i) => {
        const stockNum = select(`stock${i + 1}`)

        stockNum.innerText =
            `${stock.currentPrice ? stock.currentPrice : stock.lastPrice}`
    })
})

let currentUser
socket.once("printUsers", (userData) => {
    userData.map((user, i) => {
        select("users-main").innerHTML +=
            `<div class="user">
        <h3 class="username">${user.firstName} ${user.lastName}</h3>
        <p class="user-balance">${user.balance}</p>
        <div class="users-shares us${i}"></div>
        <button class="user-btn">Select user</button>
    </div>`
        userData[i].transactions.map(data => {
            select(`us${i}`).innerHTML +=
                `<div class="shares-div">
            <h3 class="company-name">${data.shareName}</h3>
            <h5 class="quantity">${data.quantity}</h5>
            </div>`
        })
    })

    const userbutton = document.querySelectorAll(".user-btn")
    userbutton.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            // removes prev user
            userbutton.forEach(b => {
                b.parentElement.classList.remove("active")
                b.innerText = "Select user"
            })
            const userDiv = e.path[1]

            //sets current user
            userDiv.classList.add('active')
            btn.innerText = "Current User"

            let shareObj = []
            const userShares = userDiv.querySelectorAll(".shares-div")
            userShares.forEach(s => {
                const companyName = s.querySelector(".company-name").innerText
                const quantity = s.querySelector(".quantity").innerText
                shareObj.push({ companyName, quantity })
            })

            currentUser = {
                userDiv: userDiv,
                name: userDiv.querySelector(".username").innerText,
                balance: parseInt(userDiv.querySelector(".user-balance").innerText),
                shares: shareObj
            }
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
    if (e.path[1].querySelector(".quantity").value > 0) {
        e.path[1].querySelector(".quantity").value--
    }

}))


const buyBtns = document.querySelectorAll(".buy-btn")
const sellBtn = document.querySelectorAll(".sell-btn")

const buySell = (bs) => bs.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    const stockName = btn.parentElement.querySelector(".stock-name").innerText
    const buttonName = e.path[0].className
    //reset form to 0 after selection

    let inputVal = e.path[1].querySelector(".quantity").value
    inputVal = Number(inputVal)
    let currentPrice = e.path[1].querySelector(".stock-price").innerText
    currentPrice = Number(currentPrice)
    e.path[1].querySelector(".quantity").value = 0

    let buyInput = { stockName, inputVal, currentPrice }
    //console.log(currentUser, buyInput)

    const equation = inputVal * currentPrice
    const selectedUser = document.querySelector(".active")
    const usersStock = selectedUser.querySelectorAll(".shares-div")

    const updateShares = (sign) =>
        usersStock.forEach(div => {

            if (div.firstElementChild.innerText.includes(stockName)) {
                let num = Number(div.lastElementChild.innerText)
                //console.log(num, inputVal, num - inputVal)
                if (sign === "m" && num - inputVal >= 0) {
                    currentUser.balance += equation
                    num -= inputVal
                    div.lastElementChild.innerText = num
                } else if (sign === "p") {
                    currentUser.balance -= equation
                    num += inputVal
                    div.lastElementChild.innerText = num
                }
                selectedUser.querySelector("p").innerText = (currentUser.balance).toFixed(2)
            }
        })

    if (inputVal > 0 && buttonName === "buy-btn") {
        equation <= currentUser.balance
            ? updateShares("p")
            : console.log("Balance too low to purchase stock!")
    } else if (inputVal > 0 && buttonName === "sell-btn") {
        updateShares("m")
    }
}))

buySell(buyBtns)
buySell(sellBtn)