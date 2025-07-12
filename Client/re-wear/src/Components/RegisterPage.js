import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        // Add login logic here if needed
        navigate('/landing');
    };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 rounded shadow bg-white" style={{ width: '300px' }}>
        <div className="text-center mb-4">
          <div className="mx-auto rounded-circle bg-secondary" style={{ width: '80px', height: '80px' }}></div>
          <h5 className="mt-2">Register</h5>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Enter e-mail" required/>
          </div>
          <div className="mb-3">
            <input type="number" className="form-control" placeholder="Phone Number" required/>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Create Username" required/>
          </div>
          <div className="mb-3 position-relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Set Password"
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
            <button type="submit" className="btn btn-primary w-48">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;