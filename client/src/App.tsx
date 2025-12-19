import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardLayout from './layouts/dashboard';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (in ms)
      once: true,     // whether animation should happen only once
    });
  }, []);
  return (
    <div>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          {/* AUTH ROUTES */}
          {/* DASHBOARD ROUTES */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* DASHBOARD ROUTES */}
        </Routes>
      </Router>
    </div>
  )
}

export default App