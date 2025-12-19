import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import MoneyIn from './pages/Register/MoneyIn';
import MoneyOut from './pages/Register/MoneyOut';
import Credit from './pages/Register/Credit';
import Debt from './pages/Register/Debt';
import ListCredits from './pages/Lists/ListCredits';
import ListDebts from './pages/Lists/ListDebts';
import CreditPayment from './pages/payment/creditPayment';
import DebtPayment from './pages/payment/debtPayment';

import { UserProvider } from './contexts/UserContext';

import useToken from './hooks/useToken';

export default function App() {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            <Route
              path="/home"
              element={
                <ProtectedRouteGuard>
                  <Home />
                </ProtectedRouteGuard>
              }>
            </Route>

            <Route
              path="/moneyIn"
              element={
                <ProtectedRouteGuard>
                  <MoneyIn />
                </ProtectedRouteGuard>
              }>
            </Route>
            
            <Route
              path="/moneyOut"
              element={
                <ProtectedRouteGuard>
                  <MoneyOut />
                </ProtectedRouteGuard>
              }>
            </Route>

            <Route
              path="/credit"
              element={
                <ProtectedRouteGuard>
                  <Credit />
                </ProtectedRouteGuard>
              }>
            </Route>

            <Route
              path="/debt"
              element={
                <ProtectedRouteGuard>
                  <Debt />
                </ProtectedRouteGuard>
              }>
            </Route>

            <Route
              path="/creditPayment/:creditId"
              element={
                <ProtectedRouteGuard>
                  <CreditPayment />
                </ProtectedRouteGuard>
              }>
            </Route>

            <Route
              path="/debtPayment/:debtId"
              element={
                <ProtectedRouteGuard>
                  <DebtPayment />
                </ProtectedRouteGuard>
              }>
            </Route>

            <Route
              path="/listCredits"
              element={
                <ProtectedRouteGuard>
                  <ListCredits />
                </ProtectedRouteGuard>
              }>
            </Route>

            <Route
              path="/listDebts"
              element={
                <ProtectedRouteGuard>
                  <ListDebts />
                </ProtectedRouteGuard>
              }>
            </Route>

          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}
