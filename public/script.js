async function loadExpenses() {

    const response =
        await fetch("/expenses");

    const expenses =
        await response.json();

    const expenseList =
        document.getElementById(
            "expenseList"
        );

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(
        (expense, index) => {

        total += expense.amount;

        const li =
            document.createElement("li");

        li.innerHTML = `
        ${expense.title}
        - ₹${expense.amount}
        - ${expense.category}
        - ${expense.date}

        <button
        onclick="deleteExpense(${index})">
        Delete
        </button>
        `;

        expenseList.appendChild(li);
    });

    document.getElementById(
        "total"
    ).innerText = total;
}

async function addExpense() {

    const title =
        document.getElementById(
            "title"
        ).value;

    const amount =
        document.getElementById(
            "amount"
        ).value;

    const category =
        document.getElementById(
            "category"
        ).value;

    const date =
        document.getElementById(
            "date"
        ).value;

    if(
        !title ||
        !amount ||
        !category ||
        !date
    ){
        alert(
            "Fill all fields"
        );
        return;
    }

    await fetch(
        "/addExpense",
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                title,
                amount:
                parseInt(amount),
                category,
                date
            })
        }
    );

    document.getElementById(
        "title"
    ).value = "";

    document.getElementById(
        "amount"
    ).value = "";

    document.getElementById(
        "category"
    ).value = "";

    document.getElementById(
        "date"
    ).value = "";

    loadExpenses();
}

async function deleteExpense(id){

    await fetch(
        `/deleteExpense/${id}`,
        {
            method:"DELETE"
        }
    );

    loadExpenses();
}

window.onload =
    loadExpenses;