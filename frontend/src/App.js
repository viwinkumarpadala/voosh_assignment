import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AddOrderPage from "./pages/AddOrderPage";
import GetOrdersPage from "./pages/GetOrdersPage";
import UserPage from "./pages/UserPage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Home page and redirect */}
          <Route path="/" element={authenticated ? <Navigate to="/add-order" /> : <SignupPage />} />
          <Route path="/login" element={authenticated ? <Navigate to="/add-order" /> : <LoginPage />} />


          {/* Protected routes */}
          <Route
            path="/add-order"
            element={authenticated ? <AddOrderPage /> : <Navigate to="/" />}
          />
          <Route
            path="/get-orders"
            element={authenticated ? <GetOrdersPage /> : <Navigate to="/" />}
          />
          <Route
            path="/user-data"
            element={authenticated ? <UserPage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
