import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
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
      const res = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.message || 'Registration failed. Please try again.');
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
        @keyframes gradientBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Keyframes for form animations */
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        /* Page container styling with animated background */
        .page-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px; /* Added padding for better responsiveness */
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientBackground 15s ease infinite;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Form container styling */
        .form-container {
          background-color: rgba(255, 255, 255, 0.85);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 500px; /* Increased max-width for a wider form */
          animation: fadeIn 1s ease-in-out;
          box-sizing: border-box; /* Ensure padding doesn't affect width */
          position: relative;
          overflow: hidden;
        }

        /* Form title styling */
        .form-title {
          margin-bottom: 20px;
          font-size: 2em;
          color: #333;
          text-align: center;
          animation: slideIn 0.5s ease-in-out forwards;
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
          box-sizing: border-box; /* Ensure padding doesn't affect width */
          animation: slideIn 0.5s ease-out forwards;
        }
        .input-field:focus {
          border-color: #4caf50;
          box-shadow: 0 0 10px rgba(76, 175, 80, 0.2);
        }

        /* Password toggle styling */
        .password-toggle {
          position: absolute;
          top: 55px;
          right: 40px;
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
          animation: slideIn 0.5s ease-out forwards 0.3s;
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
          animation: fadeInUp 0.5s ease-in-out forwards;
        }

        /* Animations */
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Adjustments for small screens */
        @media (max-width: 768px) {
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
            top: 45px;
            right: 30px;
          }
        }
      `}</style>

      <div className="form-container">
        <h2 className="form-title">Register</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? '🙈' : '👁️'}
          </span>
          {isSubmitting ? (
            <div className="loading-spinner"></div>
          ) : (
            <button type="submit" className="submit-button">
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
