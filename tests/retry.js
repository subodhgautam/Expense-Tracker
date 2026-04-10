const balance = document.getElementById("balance");
const income_val = document.getElementById("income_val");
const expense_val = document.getElementById("expense_val");
const descriptionel = document.getElementById("description");
const amountel = document.getElementById("amount");
const add_btn = document.getElementById("add_btn");
const transaction_form = document.getElementById("transaction_form");
const transaction_list = document.getElementById("transaction_list");


// console.log(amountel);

let total_balance = 0
let income_amount = 0
let expense_amount = 0

let transactions = JSON.parse(localStorage.getItem("transactions")) || []


transaction_form.addEventListener("submit", addTransaction)

function addTransaction(e) {
    e.preventDefault()
    const desc = descriptionel.value.trim()
    const amount = parseFloat(amountel.value)

    transactions.push(
        {
            id: Date.now(),
            amount,
            desc
        }
    )
    // forgot the syntax of push???
    localStorage.setItem("transactions", JSON.stringify(transactions))
    updateTransactionList()
}

function updateTransactionList() {
    transaction_list.innerHTML = ""
    transactions.reverse()
    // let array = JSON.parse(localStorage.getItem("transactions"))
    transactions.forEach((transaction_obj) => {
        const el = generateTransactionitem(transaction_obj)
        transaction_list.appendChild(el)
    })

    transactions.forEach(transaction_obj => {
        const amt = transaction_obj.amount
        if (amt) {
            total_balance += amt
            if (amt > 0) {
                income_amount += amt
            }
            else {
                expense_val += amt
            }
        }
    });

    updateDashboard()
    transaction_form.reset()
}


function generateTransactionitem(transaction_obj) {

    const li = document.createElement("li")

    li.classList.add("transaction_item")
    li.id = transaction_obj.id
    if (!isNaN(transaction_obj.amount) && transaction_obj.amount !== 0) {
        li.classList.add(transaction_obj.amount > 0 ? "income" : "expense")
    }

    li.innerHTML = `
<span>${transaction_obj.desc}</span>
<span>${formatCurrency(transaction_obj.amount)} <button class="delete_btn" onclick="removeTransaction(${transaction_obj.id})">.X.</button></span>`
    return li
}



// not fine 
// total_balance += transaction_obj.amount;
// transaction_obj.amount > 0 ? income_amount+=transaction_obj.amount : expense_amount += transaction_obj.amount




function removeTransaction(id) {
    if (document.getElementById(id)) {
        document.getElementById(id).remove()
    }
    transactions = transactions.filter((t) => {
        t.id !== id
    })
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

function formatCurrency(number) {
    const formattedNumber = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number)
    return formattedNumber
}

function updateDashboard() {
    income_val.textContent = formatCurrency(income_amount)
    expense_val.textContent = formatCurrency(expense_amount)
    balance.textContent = formatCurrency(total_balance)
}

updateDashboard()

document.getElementById("Reset").addEventListener("click", () => {
    total_balance = 0
    income_amount = 0
    expense_amount = 0
    transaction_list.innerHTML =""
    updateDashboard()
    localStorage.clear();
})