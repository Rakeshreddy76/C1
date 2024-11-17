import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(''); // State to handle error messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(''); // Reset error message
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/cars');
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="page-container">
      {/* Inline CSS Styles */}
      <style>{`
        /* Keyframes for background animation */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Keyframes for fade-in animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Keyframes for slide-in animation */
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Keyframes for shake animation */
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }

        /* Page container with animated background */
        .page-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Form container styling */
        .form-container {
          background-color: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
          animation: fadeIn 1s ease forwards;
          position: relative;
          overflow: hidden;
        }

        /* Form title styling */
        .form-title {
          margin-bottom: 20px;
          font-size: 2em;
          color: #333;
          text-align: center;
        }

        /* Input field styling */
        .input-field {
          width: 100%;
          padding: 15px 20px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 30px;
          font-size: 1em;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
          box-sizing: border-box;
          animation: slideIn 0.5s ease-out forwards;
        }

        .input-field:focus {
          border-color: #4caf50;
          box-shadow: 0 0 10px rgba(76, 175, 80, 0.2);
        }

        /* Password toggle icon */
        .password-toggle {
          position: absolute;
          top: 50%;
          right: 35px;
          transform: translateY(-50%);
          cursor: pointer;
          color: #777;
          transition: color 0.3s;
        }

        .password-toggle:hover {
          color: #4caf50;
        }

        /* Submit button styling */
        .submit-button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 30px;
          font-size: 1em;
          color: #fff;
          background: linear-gradient(90deg, #4caf50, #81c784);
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }

        .submit-button:hover {
          background: linear-gradient(90deg, #388e3c, #66bb6a);
          transform: scale(1.02);
        }

        .submit-button:active {
          transform: scale(0.98);
        }

        /* Loading spinner styling */
        .loading-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4caf50;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        /* Error message styling */
        .error-message {
          color: #f44336;
          margin-bottom: 20px;
          text-align: center;
          animation: shake 0.3s;
        }

        /* Responsive adjustments */
        @media (max-width: 500px) {
          .form-container {
            padding: 30px 20px;
          }
          .form-title {
            font-size: 1.8em;
          }
          .input-field {
            padding: 12px 15px;
          }
          .submit-button {
            padding: 12px;
          }
          .password-toggle {
            right: 25px;
          }
        }
      `}</style>

      <div className="form-container">
        <h2 className="form-title">Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <span
            className="password-toggle"
            onClick={togglePasswordVisibility}
            title={showPassword ? 'Hide Password' : 'Show Password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
          {isSubmitting ? (
            <div className="loading-spinner"></div>
          ) : (
            <button type="submit" className="submit-button">
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
