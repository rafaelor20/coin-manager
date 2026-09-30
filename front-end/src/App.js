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
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <UserProvider>
        <Router>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRouteGuard>
                  <Home />
                </ProtectedRouteGuard>
              }
            />

            <Route
              path="/moneyIn"
              element={
                <ProtectedRouteGuard>
                  <MoneyIn />
                </ProtectedRouteGuard>
              }
            />

            <Route
              path="/moneyOut"
              element={
                <ProtectedRouteGuard>
                  <MoneyOut />
                </ProtectedRouteGuard>
              }
            />

            <Route
              path="/credit"
              element={
                <ProtectedRouteGuard>
                  <Credit />
                </ProtectedRouteGuard>
              }
            />

            <Route
              path="/debt"
              element={
                <ProtectedRouteGuard>
                  <Debt />
                </ProtectedRouteGuard>
              }
            />

            <Route
              path="/creditPayment/:creditId"
              element={
                <ProtectedRouteGuard>
                  <CreditPayment />
                </ProtectedRouteGuard>
              }
            />

            <Route
              path="/debtPayment/:debtId"
              element={
                <ProtectedRouteGuard>
                  <DebtPayment />
                </ProtectedRouteGuard>
              }
            />

            <Route
              path="/listCredits"
              element={
                <ProtectedRouteGuard>
                  <ListCredits />
                </ProtectedRouteGuard>
              }
            />

            <Route
              path="/listDebts"
              element={
                <ProtectedRouteGuard>
                  <ListDebts />
                </ProtectedRouteGuard>
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
