let expenseTable = document.querySelector("#expense-table");

let addExp = document.querySelector("#addExp");
let viewExp = document.querySelector("#viewExp");

addExp.addEventListener("click", addExpense);

function addExpense(e) {
  e.preventDefault();

  let amtValue = document.querySelector("#amt").value;
  let detValue = document.querySelector("#det").value;
  let category = document.querySelector("#dropdown-menu").value;

  let newRow = document.createElement("tr");
  let sno = document.createElement("td"); // S.NO
  let date = document.createElement("td"); // Date
  let detail = document.createElement("td"); // Detail
  let amount = document.createElement("td"); // Amount

  //date logic
  let d = new Date();
  let today = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  console.log(today);

  //serial no. logic
  let serialNo = expenseTable.rows.length;
  sno.innerText = serialNo;

  date.innerText = today;
  amount.innerText = amtValue;
  detail.innerText = detValue;

  newRow.append(sno); // S.NO
  newRow.append(date); // Date
  newRow.append(detail); // Detail
  newRow.append(amount); // Amount

  expenseTable.append(newRow);

  //storing in local storage
  let obj = {
    SNO: sno.innerText,
    Date: date.innerText,
    Detail: detail.innerText,
    Amount: amount.innerText,
    Category: category,
  };

  // Get existing data from localStorage (or empty array if none)
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  // Add new expense
  expenses.push(obj);
  // Save back to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.querySelector("form").reset();
}

viewExp.addEventListener("click", showExpense);

function showExpense() {
  window.open("showExpense.html", "_blank");
}
