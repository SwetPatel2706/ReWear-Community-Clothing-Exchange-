import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import LandingPage from './Components/LandingPage';
import ProfilePage from './Components/ProfilePage';
import AdminPannel from './Components/AdminPannel';
import AdminLogin from './Components/AdminLogin';
import Checkout from './Components/Checkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/admin&key=73495" element={<AdminPannel />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;