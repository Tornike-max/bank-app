import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/authPages/LoginPage";
import AppLayout from "./ui/AppLayout";
import GoalPage from "./pages/goalsPage/GoalPage";
import LoansPage from "./pages/loansPage/LoansPage";
import UserPage from "./pages/userPage/UserPage";
import RegisterPage from "./pages/authPages/RegisterPage";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import SettingsPage from "./pages/settingsPage/SettingsPage";
import CustomersPage from "./pages/customersPage/CustomersPage";
import CustomerProfile from "./features/customers/CustomerProfile";
import PaymentsPage from "./pages/transactions/PaymentsPage";
import HomePage from "./pages/settingsPage/homePage/HomePage";
import CurrencyConvertionPage from "./pages/transactions/CurrencyConvertionPage";
import TransferPage from "./pages/transactions/TransferPage";
import TransferOnPhonePage from "./pages/transactions/TransferOnPhonePage";
import AllTransactionsPage from "./pages/transactions/AllTransactionsPage";
import AboutUs from "./pages/about/AboutUsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/goals" element={<GoalPage />} />
          <Route path="/loans" element={<LoansPage />} />

          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transactions/payments" element={<PaymentsPage />} />
          <Route path="/transactions/loan" element={<LoansPage />} />
          <Route
            path="/transactions/transfer/:userId?"
            element={<TransferPage />}
          />
          <Route
            path="/transactions/currencyConvertion"
            element={<CurrencyConvertionPage />}
          />
          <Route path="/transactions/phone" element={<TransferOnPhonePage />} />

          <Route path="/transctions/all" element={<AllTransactionsPage />} />

          <Route path="/about" element={<AboutUs />} />

          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/customer/:customerId" element={<CustomerProfile />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
