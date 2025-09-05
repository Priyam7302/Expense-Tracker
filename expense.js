let expenseTable = document.querySelector("#expense-table");
let addExp = document.querySelector("#addExp");
let viewExp = document.querySelector("#viewExp");

let editingIndex = null; // track which expense is being edited

addExp.addEventListener("click", addExpense);

function addExpense(e) {
  e.preventDefault();

  let amtValue = document.querySelector("#amt").value;
  let detValue = document.querySelector("#det").value;
  let category = document.querySelector("#dropdown-menu").value;

  if (!amtValue || !detValue || category === "select") {
    alert("Please fill all fields!");
    return;
  }

  //date logic
  let d = new Date();
  let today = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  // Get existing data from localStorage (or empty array if none)
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  if (editingIndex !== null) {
    // update existing expense
    expenses[editingIndex] = {
      SNO: editingIndex + 1,
      Date: today,
      Detail: detValue,
      Amount: amtValue,
      Category: category,
    };
    editingIndex = null;
  } else {
    // add new expense
    let obj = {
      SNO: expenses.length + 1,
      Date: today,
      Detail: detValue,
      Amount: amtValue,
      Category: category,
    };
    expenses.push(obj);
  }

  // Save back to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // refresh table
  renderTable(expenses);

  document.querySelector("form").reset();
}

viewExp.addEventListener("click", showExpense);
function showExpense() {
  window.open("showExpense.html", "_blank");
}

// render table with action buttons
function renderTable(expenses) {
  expenseTable.innerHTML = `
    <tr>
      <th>S.NO</th>
      <th>Date</th>
      <th>Detail</th>
      <th>Amount</th>
      <th>Action</th>
    </tr>
  `;

  expenses.forEach((exp, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${exp.Date}</td>
      <td>${exp.Detail}</td>
      <td>${exp.Amount}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </td>
    `;

    expenseTable.append(row);
  });

  // add event listeners for buttons
  document
    .querySelectorAll(".delete-btn")
    .forEach((btn) => btn.addEventListener("click", deleteExpense));

  document
    .querySelectorAll(".edit-btn")
    .forEach((btn) => btn.addEventListener("click", editExpense));
}

function deleteExpense(e) {
  let index = e.target.dataset.index;
  if (confirm("Are you sure you want to delete this expense?")) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderTable(expenses);
  }
}

function editExpense(e) {
  let index = e.target.dataset.index;
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let exp = expenses[index];

  document.querySelector("#amt").value = exp.Amount;
  document.querySelector("#det").value = exp.Detail;
  document.querySelector("#dropdown-menu").value = exp.Category;

  editingIndex = index; // mark this expense for editing
}

// load saved expenses on page load
window.onload = function () {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  renderTable(expenses);
};
