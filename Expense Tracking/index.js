const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  {id: 1, text: "Flower", amount: -50},
  {id: 2, text: "Book", amount: -20},
  {id: 3, text: "Salary", amount: 500},
  {id: 4, text: "Camera", amount: -100}
];

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorageTransactions ?? []; 
//dummyTransactions;
console.log("xacts:", transactions);

function addTransactionToDOM(transaction){
  const sign = transaction.amount<0 ? "-" : "+";
  const signClass = transaction.amount<0 ? "minus" : "plus";

  const item = document.createElement("li");
  item.classList.add(signClass);
  item.innerHTML=`${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

  list.appendChild(item);

}

function removeTransaction(id){
  transactions = transactions.filter(tran => tran.id != id);
  saveTransactionsToLocalStorage();
  
  init();
}

function saveTransactionsToLocalStorage(){
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateSummaryValues(){
  const amounts = transactions.map(xact =>xact.amount);
  console.log(amounts);
  const total = amounts
    .reduce((acc,item) => (acc += item), 0)
    .toFixed(2);
  console.log(total);

  const income = amounts
    .filter(item=>item>0)
    .reduce((acc,item) => acc += item, 0)
    .toFixed(2);

  const expense =  (amounts
    .filter(item=>item<0)
    .reduce((acc,item) => acc += item, 0)  * -1 ).toFixed(2);
  console.log(expense);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}


form.addEventListener("submit", addTransaction);

function addTransaction(e){
  e.preventDefault();

  if(text.value.trim()==="" || amount.value.trim()===""){
    alert("Please add a text and amount");
    return;
  }

  const transaction = {
    id: generateId(),
    text: text.value,
    amount: +amount.value
  }
  text.value="";
  amount.value="";
  //console.log(transaction);
  transactions.push(transaction);
  addTransactionToDOM(transaction);
  updateSummaryValues();
  saveTransactionsToLocalStorage();



}

function generateId(){
  return Math.floor(Math.random()*1000000000);
}

function init(){
  list.innerHTML = "";
  transactions.forEach(xact => addTransactionToDOM(xact));
  updateSummaryValues();
}

init();