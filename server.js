const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const filePath = "expenses.json";

// Get all expenses
app.get("/expenses", (req, res) => {
    const data = fs.readFileSync(filePath);
    const expenses = JSON.parse(data);
    res.json(expenses);
});

// Add expense
app.post("/addExpense", (req, res) => {

    const newExpense = req.body;

    const data = fs.readFileSync(filePath);
    const expenses = JSON.parse(data);

    expenses.push(newExpense);

    fs.writeFileSync(
        filePath,
        JSON.stringify(expenses, null, 2)
    );

    res.json({
        message: "Expense Added Successfully"
    });
});

// Delete expense
app.delete("/deleteExpense/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const data = fs.readFileSync(filePath);
    let expenses = JSON.parse(data);

    expenses.splice(id, 1);

    fs.writeFileSync(
        filePath,
        JSON.stringify(expenses, null, 2)
    );

    res.json({
        message: "Expense Deleted"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});