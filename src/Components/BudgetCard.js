import { Card, ProgressBar, Stack, Button, Modal } from 'react-bootstrap';
import { currencyFormatter } from './utils';
import AddExpense from './AddExpense';
import { useState } from 'react';

export default function BudgetCard({ name, amount, max, gray, addExpenseCallback, deleteExpenseCallback, budgetIndex, expenses, expenseName, expenseAmount, expense }) {
  const classNames = []
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }


  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">
            {name}
          </div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)} 
            <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)}</span>
          </div>
        </Card.Title>
        <ProgressBar 
          className="rounded-pill" 
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
        <Stack direction="horizontal" gap="2" className="mt-4">
        <AddExpense addExpenseCallback={addExpenseCallback} budgetIndex={budgetIndex} name={name}/>
        <ViewExpensesModal expenses={expenses} name={name} deleteExpenseCallback={deleteExpenseCallback} budgetIndex={budgetIndex}/>
        {/* <Button variant="outline-secondary">View Expenses</Button> */}
        </Stack>
      </Card.Body>
    </Card>
  )
}

function ViewExpensesModal({expenses, name, deleteExpenseCallback, expense, budgetIndex}) {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false)
  }



  return (
    <>
    
    <Button variant="outline-secondary" className="ms-auto" onClick={handleShow}>
        View Expense
      </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.name}</div>
              <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
              <Button size="sm" variant="outline-danger" onClick={() => deleteExpenseCallback(expense.id, budgetIndex)}>
                &times;
              </Button>
            </Stack>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>

    </>
  )
}




function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) return "primary"
  if (ratio < 0.75) return "warning"
  return "danger"
}