import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AddOrderPage from "./pages/AddOrderPage";
import GetOrdersPage from "./pages/GetOrdersPage";
import UserPage from "./pages/UserPage";

function App() {
  // Use a state variable to track authentication status
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token')); // Initialize based on token presence
  console.log(authenticated);
 
  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token); // Update state based on token presence
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Redirect to add-order if authenticated, otherwise signup */}
          <Route
            path="/"
            element={
              authenticated ? <Navigate to="/add-order" replace /> : <SignupPage />
            }
          />

          {/* Redirect to add-order if authenticated, otherwise login */}
          <Route
            path="/login"
            element={
              !authenticated ? <LoginPage /> : <Navigate to="/add-order" replace />
            }
          />

          {/* Protected routes */}
          <Route
            path="/add-order"
            element={authenticated ? <AddOrderPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/get-orders"
            element={authenticated ? <GetOrdersPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/user-data"
            element={authenticated ? <UserPage /> : <Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
