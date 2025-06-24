# My Project

Here’s a screenshot of the app:
![Dashboard Screenshot](/Finance_Dashboard.JPG)

![Login Page](/Finance_Login.JPG)

![Transactions List Page](/Finance_Transactions.JPG)

![Add Transactions Page](/Finance_addTransactions.JPG)

![Edit Transactions Page](/Finance_EditTransaction.JPG)

Created a personal finance management system where users can track their income and expenses, categorize them.
Backend (Node.js + Express + MongoDB)
Features:

1. User Authentication
   • Register / Login using JWT
   • Hash passwords using bcrypt
   • Auth middleware to protect routes
2. Expense Management
   • Add a transaction: (title, amount, type: income/expense, category, date)
   • Get all transactions (user-specific)
   • Update a transaction
   • Delete a transaction
   • Filter by date range or category

Frontend (React + Tailwind + Axios) of finance management system.
Pages:

1.         Register / Login
2.         Dashboard
    o Shows balance summary (total income, total expense)
3.         Transactions Page
    o List of transactions
    o Filter/search by category/date
    o Buttons to edit/delete a transaction
4.         Add Transaction Page
    o Form with title, amount, type, category, date

Used Chart.js to show :
• Category-wise breakdown (Pie Chart)
• Monthly spend trend (Bar Chart)
