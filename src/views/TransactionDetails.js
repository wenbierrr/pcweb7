import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function TransactionDetails() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const docRef = doc(db, "transactions", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTransaction(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "transactions", id);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
      navigate("/transactionpage"); // Redirect to transaction list page after deletion
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  if (!transaction) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h1 className="my-4">Transaction Details</h1>
      <Card>
        <Card.Body>
          <Card.Title>{transaction.Description}</Card.Title>
          <Card.Text>
            <strong>Amount:</strong> ${transaction.Amount.toFixed(2)}
            <br />
            <strong>Date:</strong>{" "}
            {transaction.Date.toDate().toLocaleDateString('en-GB')}
            <br />
            <strong>Type:</strong> {transaction.Type}
            <br />
            <strong>Category:</strong> {transaction.Category}
          </Card.Text>
          <Link to={`/update/${id}`}>
            <Button variant="primary" className="me-2">
              Edit
            </Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
