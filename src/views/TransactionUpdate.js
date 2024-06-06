import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import BBnavbar from "./components/navbar";

export default function TransactionUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function fetchTransaction() {
      try {
        const docRef = doc(db, "transactions", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTransaction(data);
          setDescription(data.Description);
          setAmount(data.Amount);
          setDate(new Date(data.Date.seconds * 1000));
          setType(data.Type);
          setCategory(data.Category);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching transaction: ", error);
      }
    }
    fetchTransaction();
  }, [id]);

  async function handleEditTransaction(event) {
    event.preventDefault();
    try {
      const docRef = doc(db, "transactions", id);
      const updatedTransaction = {
        Description: description,
        Amount: parseFloat(amount),
        Date: date,
        Type: type,
        Category: category,
      };
      await updateDoc(docRef, updatedTransaction);
      console.log("Transaction updated with ID: ", id);
      navigate("/TransactionPage"); 
    } catch (error) {
      console.error("Error updating transaction: ", error);
    }
  }

  if (!transaction) return <div>Loading...</div>;

  return (
    <>
    <BBnavbar/>
    <Container>

      <h1 className="my-3">Edit Transaction</h1>

      <Form onSubmit={handleEditTransaction}>
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
          Update Transaction
        </Button>
      </Form>
    </Container>
    </>
  );
}
