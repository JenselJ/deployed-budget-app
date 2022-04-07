import React, { useState } from 'react';
import { Button, Modal, Stack } from 'react-bootstrap'; 


export default function AddExpense({addExpenseCallback, budgetIndex, name}) {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const [expensesName, setExpensesName] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    setShow(false);
    console.log(addExpenseCallback);
    addExpenseCallback(budgetIndex, Number(amount), expensesName);
  }

  return (
    <>
      <Button variant="outline-primary" className="ms-auto" onClick={handleShow}>
        Add Expense
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Stack direction="horizontal" gap="2">
          <div>
            <label>
              Name:
              <input 
                type="text"
                onChange={(e) => setExpensesName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Amount:
              <input 
                type="number"
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Expenses
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
