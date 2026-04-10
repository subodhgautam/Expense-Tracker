const balance = document.getElementById("balance");
const income_val = document.getElementById("income_val");
const expense_val = document.getElementById("expense_val");
const descriptionel = document.getElementById("description");
const amountel = document.getElementById("amount");
const add_btn = document.getElementById("add_btn");
const transaction_form = document.getElementById("transaction_form");
const transaction_list = document.getElementById("transaction_list");

let total_balance = 0
let income_amount = 0
let expense_amount = 0

const transactions = JSON.parse(localStorage.getItem("transactions")) || []




// 
transaction_form.addEventListener("submit", (e) => {
    console.log(submitted);
    addTransaction(e)
})







function addTransaction(e) {
    e.preventDefault()

    const description = descriptionel.value.trim();
    const amount = parseFloat(amountel.value);

    transactions.push(
        {
            id: Date.now,
            amount,
            description
        }
    )
    localStorage.setItem("transactions", JSON.stringify(transactions))

    total_balance += amount

    if (amount) {
        amount>0?income_amount+=amount:expense_amount+=amount
    }
    updateTransactionList()

    // transaction_form.reset()
}

function updateTransactionList() {

    // might want to clear all the transactions from the ul

    const stored_transactions = JSON.parse(localStorage.getItem("transactions"))
    let sortedTransactions = [...stored_transactions].reverse()
    sortedTransactions.forEach((transaction_obj) => {
        const el = generateTransactionitem(transaction_obj)
        transaction_list.appendChild(el)
    })
}

function generateTransactionitem(transaction_obj) {
    let transaction_item = document.createElement("li")
    transaction_item.classList.add("transaction_item")
    // todo: make transaction item styling
    if (transaction_obj.amount) {
        transaction_item.classList.add(transaction.amount > 0 ? "income" : "expense")
    }

    transaction_item.innerHTML = `
    
<span>{transaction_obj.description}</span>
<span>{formatcurrency(transaction_obj.amount)} <button class="delete_btn" onclick="removeTransaction"> </button></span>
`
}
























function updateDashboard() {
    balance.textContent = formatcurrency(total_balance)
    income_val.textContent = formatcurrency(income_amount)
    expense_val.textContent = formatcurrency(expense_amount)
    updateTransactionList()

}
function formatcurrency(number) {
    let formatted = new Intl.NumberFormat
        ("en-US",
            { style: "currency", currency: "USD" })
        .format(number)
    console.log(formatted);
    return formatted;
}

updateDashboard()
// hackatime