import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BBnavbar from "./components/navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HomePage() {
  const [transactionData, setTransactionData] = useState({ income: {}, expenses: {} });

  useEffect(() => {
    async function fetchTransactionData() {
      try {
        const querySnapshot = await getDocs(collection(db, "transactions"));
        let income = {};
        let expenses = {};

        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.Date && data.Date.seconds) {
            data.Date = new Date(data.Date.seconds * 1000);
          }
          const dateString = data.Date.toISOString().split('T')[0];  //[0] retrieves the date part in the format yyyy/mm/dd
          //console.log(dateString);
          if (data.Type === "income") {
            income[dateString] = (income[dateString] || 0) + data.Amount; // check if date exist in income obj. If inside, extract the value and add
          } else if (data.Type === "expense") {
            expenses[dateString] = (expenses[dateString] || 0) + data.Amount; //same thing for expenses
          }
        });

        setTransactionData({ income, expenses });
      } catch (error) {
        console.error("Error fetching transactions: ", error);
      }
    }

    fetchTransactionData();
  }, []);

  const formatDateString = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  const allDates = Array.from(new Set([
    ...Object.keys(transactionData.income),
    ...Object.keys(transactionData.expenses)
  ])).sort((a, b) => new Date(a) - new Date(b));

  const recentDates = allDates.slice(-5); // get recent 5 days w activity
  const labels = recentDates.map(date => formatDateString(date));

  const mapDataToLabels = (data, labels) => {
    return labels.map(label => {
      const date = new Date(label.split('/').reverse().join('-')).toISOString().split('T')[0];
      return data[date] || 0;
    });
  };

  const incomeData = mapDataToLabels(transactionData.income, recentDates);
  const expenseData = mapDataToLabels(transactionData.expenses, recentDates);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <BBnavbar />
      <Container>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Transaction Overview of recent 5 days (With Activity)' }
            }
          }}
        />
      </Container>
    </div>
  );
}
