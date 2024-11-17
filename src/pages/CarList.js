import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa'; // Using react-icons for better visuals

function CarList() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(''); // State to handle error messages
  const [isLoading, setIsLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cars', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setCars(res.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch cars. Please login again.');
        // Handle error (e.g., redirect to login)
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect after 3 seconds
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, [navigate]);

  const handleAddCar = () => {
    navigate('/create-car');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(search.toLowerCase()) ||
      car.description.toLowerCase().includes(search.toLowerCase()) ||
      car.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="car-list-page">
      {/* Inline CSS Styles */}
      <style>{`
        /* Keyframes for background animation */
        @keyframes gradientBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Keyframes for card animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        /* Keyframes for button hover effect */
        @keyframes buttonHover {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        /* Keyframes for fade-in-up animation */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Page container styling with animated background */
        .car-list-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientBackground 15s ease infinite;
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Header styling */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 40px;
          animation: fadeInUp 1s ease-in-out;
        }

        /* Search input styling */
        .search-input {
          padding: 12px 20px;
          border: none;
          border-radius: 30px;
          font-size: 1em;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          outline: none;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .search-input:focus {
          box-shadow: 0 6px 8px rgba(0,0,0,0.15);
          transform: translateY(-2px);
        }

        /* Header buttons styling */
        .header-buttons {
          display: flex;
          gap: 10px;
        }
        .header-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 30px;
          font-size: 1em;
          color: #fff;
          background: linear-gradient(90deg, #ff758c, #ff7eb3);
          cursor: pointer;
          background-size: 200% 200%;
          transition: background-position 0.5s, transform 0.3s;
          outline: none;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header-button:hover {
          animation: buttonHover 0.5s forwards;
          transform: scale(1.05);
        }
        .header-button:active {
          transform: scale(0.95);
        }

        /* Car card styling */
        .car-card {
          background-color: #fff;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 25px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 800px;
          animation: fadeIn 0.7s ease-in-out;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .car-card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          animation: pulse 0.5s forwards;
        }

        /* Car title styling */
        .car-title {
          font-size: 1.8em;
          margin-bottom: 10px;
          color: #333;
        }

        /* Car description styling */
        .car-description {
          font-size: 1em;
          margin-bottom: 15px;
          color: #555;
        }

        /* Car tags styling */
        .car-tags {
          margin-bottom: 15px;
        }
        .car-tag {
          display: inline-block;
          background-color: #f0f0f0;
          color: #777;
          padding: 5px 12px;
          margin: 5px 5px 0 0;
          border-radius: 20px;
          font-size: 0.85em;
          transition: background-color 0.3s, color 0.3s;
        }
        .car-tag:hover {
          background-color: #ff758c;
          color: #fff;
        }

        /* Details link styling */
        .details-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 10px 20px;
          background-color: #ff758c;
          color: #fff;
          border-radius: 30px;
          text-decoration: none;
          transition: background-color 0.3s, transform 0.3s;
          font-size: 0.95em;
        }
        .details-link:hover {
          background-color: #ff5e75;
          transform: translateY(-2px);
        }

        /* Logout button styling */
        .logout-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 15px 20px;
          border: none;
          border-radius: 30px;
          background-color: #ff758c;
          color: #fff;
          font-size: 1em;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: background-color 0.3s, transform 0.3s;
          z-index: 1000;
        }
        .logout-button:hover {
          background-color: #ff5e75;
          transform: scale(1.05);
        }
        .logout-button:active {
          transform: scale(0.95);
        }

        /* Loading spinner styling */
        .loading-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #ff758c;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 50px auto;
        }

        /* Error message styling */
        .error-message {
          color: #f44336;
          margin-bottom: 20px;
          text-align: center;
          font-size: 1em;
          animation: fadeInUp 0.5s ease-in-out forwards;
        }

        /* Animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes buttonHover {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
          }
          .header-buttons {
            margin-top: 20px;
            width: 100%;
          }
          .header-button {
            width: 100%;
            justify-content: center;
          }
          .car-card {
            padding: 20px;
          }
          .details-link {
            font-size: 0.9em;
          }
        }
      `}</style>

      {/* Header Section */}
      <div className="header">
        <input
          type="text"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cars..."
          aria-label="Search cars"
        />
        <div className="header-buttons">
          <button className="header-button" onClick={handleAddCar} aria-label="Add Car">
            <FaPlus /> Add Car
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <div className="loading-spinner"></div>}

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Car Cards */}
      {filteredCars.map((car) => (
        <div className="car-card" key={car._id}>
          <h2 className="car-title">{car.title}</h2>
          <p className="car-description">{car.description}</p>
          <div className="car-tags">
            {car.tags.map((tag, index) => (
              <span key={index} className="car-tag">
                {tag}
              </span>
            ))}
          </div>
          <Link to={`/cars/${car._id}`} className="details-link">
            View Details
          </Link>
        </div>
      ))}

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout} aria-label="Logout">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default CarList;
