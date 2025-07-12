import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo: Accept any email/password, or add your own logic here
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/landing');
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 rounded shadow bg-white" style={{ width: '300px' }}>
        <div className="text-center mb-4">
          <div className="mx-auto rounded-circle bg-secondary" style={{ width: '80px', height: '80px' }}></div>
          <h5 className="mt-2">Login</h5>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </span>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-48">Login</button>
          </div>
          <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;