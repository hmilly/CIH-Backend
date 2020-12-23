const socket = io();
const select = (item) => this.document.querySelector(`.${item}`)
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
    e.path[1].querySelector(".quantity").value--
}))






const buyBtns = document.querySelectorAll(".buy-btn")
buyBtns.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    const company = btn.parentElement.querySelector(".stock-name").innerText
    const inputVal = e.path[1].querySelector(".quantity").value



    const currentPrice = e.path[1].querySelector(".stock-price").innerText
    console.log(currentPrice)
    // currentprice.split(".")
    // curentprice[0]



console.log(currentPrice)
if (inputVal > 0) {
    e.path[1].querySelector(".quantity").value = 0
    const buyInput = { company, inputVal }
    console.log(currentUser, buyInput)
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
