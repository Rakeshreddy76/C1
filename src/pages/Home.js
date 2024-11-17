import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Inline CSS Styles */}
      <style>{`
        /* Keyframes for background animation */
        @keyframes gradientBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Keyframes for button hover effect */
        @keyframes buttonHover {
          0% { transform: scale(1); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); }
          50% { transform: scale(1.05); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); }
          100% { transform: scale(1); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); }
        }

        /* Keyframes for fade-in-up animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Container styling with animated background */
        .home-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientBackground 15s ease infinite;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #fff;
          text-align: center;
        }

        /* Heading styling */
        .home-title {
          font-size: 3em;
          margin-bottom: 40px;
          animation: fadeInUp 1s ease forwards;
        }

        /* Button container */
        .button-group {
          display: flex;
          flex-direction: row;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeInUp 1s ease forwards 0.5s;
        }

        /* Button styling */
        .home-button {
          position: relative;
          display: inline-block;
          padding: 15px 30px;
          font-size: 1em;
          color: #fff;
          background: linear-gradient(90deg, #ff758c, #ff7eb3);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          overflow: hidden;
          z-index: 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        /* Overlay effect on hover */
        .home-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -50%;
          width: 200%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transform: skewX(-45deg);
          transition: all 0.5s ease;
          z-index: -1;
        }

        /* Slide the overlay on hover */
        .home-button:hover::before {
          left: 150%;
        }

        /* Button scaling and shadow animation on hover */
        .home-button:hover {
          animation: buttonHover 0.6s infinite;
        }

        /* Button press effect */
        .home-button:active {
          transform: scale(0.95);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .home-title {
            font-size: 2.5em;
            margin-bottom: 30px;
          }
          .home-button {
            width: 100%;
            padding: 12px 25px;
          }
          .button-group {
            flex-direction: column;
            gap: 15px;
          }
        }

        /* Accessibility: Focus outline */
        .home-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
        }

        /* Additional Styling for Visual Appeal */
        .home-button {
          transition: all 0.3s ease;
        }

        .home-button:hover {
          background: linear-gradient(90deg, #ff7eb3, #ff758c);
        }
      `}</style>

      <h1 className="home-title">Welcome to Car Management App</h1>
      <div className="button-group">
        <button className="home-button" onClick={handleRegisterClick} aria-label="Register">
          Register
        </button>
        <button className="home-button" onClick={handleLoginClick} aria-label="Login">
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
