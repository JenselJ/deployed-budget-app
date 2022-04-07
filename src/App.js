import { Container } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import React, {useState} from 'react';
import { v4 as uuidV4 } from 'uuid';
import AddBudget from './Components/AddBudget';
import BudgetCard from './Components/BudgetCard';
import Example from './Components/BudgetCard'

function App() {
  
  const [budgets, setBudgets] = useState(newBudgets)

  function addBudget(name, amount, max) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
        return [...prevBudgets, {name, amount, max, expenses: []}]
    })
  }

  function addExpense(budgetIndex, amount, expenseName) {
    const budgetsList = JSON.parse(JSON.stringify(budgets))

    console.log( budgetIndex, amount, expenseName, budgetsList)

    budgetsList[budgetIndex].expenses.push({
      amount: amount,
      name: expenseName,
      id: uuidV4()
    })  
    setBudgets(budgetsList)

    console.log(budgetsList[budgetIndex].expenses.id)

  }

  function deleteExpense(expenseid, budgetIndex) {
    const budgetsList = JSON.parse(JSON.stringify(budgets))

    // const filteredExpenses = expenses.filter(expense => expense.id !== expenseid)
    // console.log(filteredExpenses)
    // expenses.filter(expense => expense.id !== expenseid)
    console.log(expenseid)
    console.log(budgetIndex)
    budgetsList[budgetIndex].expenses =  budgetsList[budgetIndex].expenses.filter(expense => expense.id !== expenseid)
    setBudgets(budgetsList)
  }

  // function recallDOM() {
  //   const expensesList = JSON.parse(JSON.stringify(expenses))
  //   setExpenses(expensesList)
  // }

  // function deleteExpensesHandler(id) {
  //   deleteExpense(id);
  //   recallDOM();
  // }
  
  // function deleteExpense(budgetIndex, amount, expenseName) {
  //   const budgetsList = JSON.parse(JSON.stringify(budgets))

  //   console.log( budgetIndex, amount, expenseName, budgetsList)

  //   budgetsList[budgetIndex].expenses.filter({
  //     amount: amount,
  //     name: expenseName
  //   })  
  //   setBudget(budgetsList)
  // }

  return (
  <Container className="my-4">
    <Stack direction='horizontal' gap='2' className='mb-4'>
      <h1 className="me-auto">Budgets</h1>
      <AddBudget addBudgetCallback={addBudget}/>
      {/* <Button variant="outline-primary">Add Expense</Button> */}
    </Stack>
    <div 
      style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "1rem", 
        alignItems: "flex-start"
        }}
      >
        {/* <BudgetCard 
          name="Entertainment" 
          gray
          amount={200} 
          max={1000} /> */}

  {budgets.map((budget, index) => (
    <BudgetCard 
            name={budget.name}
            addExpenseCallback={addExpense}
            deleteExpenseCallback={deleteExpense}
            budgetIndex={index}
            expenses={budget.expenses}
            expenseName={budget.expenses.name}
            expenseAmount={budget.expenses.amount}
            gray
            amount={
              budget.expenses.length > 0 ?
                budget.expenses.map(expense => expense.amount).reduce((a,b) => a + b) :
                0
            } 
            max={budget.max} />
  ))}
    </div>
  </Container>
  )
}


const newBudgets = [
  {
    name: "Entertainment",
    max: 1000,
    expenses: [{name:"lunch", amount: 20, id:'1'}, {name: "dinner", amount: 50, id:'2'}, {name: "haircut", amount: 30, id:'3'}]
  }
]




export default App;
