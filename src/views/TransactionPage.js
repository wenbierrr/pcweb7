import "../styles/TransactionPage.css";
import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import BBnavbar from "./components/navbar";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netCashflow, setNetCashflow] = useState(0);
  const navigate = useNavigate();

  const handleAddTransaction = () => {
    navigate("/addtransaction");
  };

  async function getAllTransactions() {
    try {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      let incomeTotal = 0;
      let expensesTotal = 0;

      const transactions = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        if (data.Date && data.Date.seconds) {
          data.Date = new Date(data.Date.seconds * 1000);
        }
        if (data.Type === "income") {
          incomeTotal += data.Amount;
        } else if (data.Type === "expense") {
          expensesTotal += data.Amount;
        }
        return { id: doc.id, ...data };
      });

      transactions.sort((a, b) => b.Date - a.Date);

      const netCashflowValue = parseFloat(incomeTotal) - parseFloat(expensesTotal);

      setTransactions(transactions);
      setTotalIncome(incomeTotal);
      setTotalExpenses(expensesTotal);
      setNetCashflow(netCashflowValue);
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    }
  }

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <>
      <BBnavbar />
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="mb-3" class = "summary">
                <strong>Net Cashflow: </strong>
                <span style={{ textDecoration: 'underline', color: 'purple' }}>
                    ${netCashflow.toFixed(2)}
                </span>
            </div>

            <div className="mb-3" class = "summary">
                <strong>Total Income: </strong>
                <span style={{ textDecoration: 'underline', color: 'green' }}>
                    ${totalIncome.toFixed(2)}
                </span>
            </div>
            <div className="mb-3" class = "summary">
                <strong>Total Expenses: </strong>
                <span style={{ textDecoration: 'underline', color: 'red' }}>
                    ${Math.abs(totalExpenses).toFixed(2)}
                </span>
            </div>
            <Button onClick={handleAddTransaction} variant="primary">
                Add Transaction
            </Button>
        </div>

        <br />
        <br />

        <Table striped bordered hover responsive className="transaction-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  <Link to={`/transaction/${transaction.id}`} className="transaction-link">
                    {transaction.Description}
                  </Link>
                </td>
                <td className={`transaction-amount ${transaction.Type}`}>
                  ${transaction.Amount.toFixed(2)}
                </td>
                <td>
                  {transaction.Date instanceof Date ? transaction.Date.toLocaleDateString('en-GB') : ""}
                </td>
                <td>{transaction.Type}</td>
                <td>{transaction.Category}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
