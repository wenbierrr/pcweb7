//import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import TransactionPage from "./views/TransactionPage";
import LandingPage from "./views/LandingPage";
import GoalsPage from "./views/GoalsPage";
import SignUpPage from "./views/SignUpPage";
import TransactionAdd from "./views/TransactionAdd"
import TransactionDetails from "./views/TransactionDetails";
import TransactionUpdate from "./views/TransactionUpdate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/transactionpage" element={<TransactionPage />} />
        <Route path="/goalspage" element={<GoalsPage />} />
        <Route path="/update/:id" element={< TransactionUpdate/>} />
        <Route path="/transaction/:id" element={< TransactionDetails/>} />
        <Route path="/addtransaction" element={< TransactionAdd/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



