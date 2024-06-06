import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import BBnavbar from "./components/navbar";


export default function TransactionAdd() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  async function handleAddTransaction(event) {
    event.preventDefault();
    try {
      const transactionData = {
        Description: description,
        Amount: parseFloat(amount),
        Date: date,
        Type: type,
        Category: category,
      };
      const docRef = await addDoc(collection(db, "transactions"), transactionData);
      console.log("Transaction added with ID: ", docRef.id);
      navigate("/TransactionPage"); // Navigate back to transaction list after adding
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  }

  return (
    <>
    <BBnavbar/>
    <Container>

      <h1 className="my-3">Add Transaction</h1>

      <Form onSubmit={handleAddTransaction}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step ="0.01"
            min = "0.01"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date.toISOString().split("T")[0]} // Format date for input (YYYY-MM-DD)
            onChange={(e) => setDate(new Date(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Transaction
        </Button>
      </Form>
    </Container>
    </>
  );
}
