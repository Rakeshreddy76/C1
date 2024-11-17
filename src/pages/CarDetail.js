import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaSpinner, FaArrowLeft } from 'react-icons/fa'; // Importing icons for better visuals

function CarDetail() {
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(''); // State to handle error messages
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setCar(res.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch car details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      navigate('/cars');
    } catch (error) {
      console.error(error);
      setError('Failed to delete the car. Please try again.');
    }
  };

  const styles = {
    carDetailContainer: {
      maxWidth: '800px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '15px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      animation: 'fadeIn 0.5s ease-in-out',
      position: 'relative',
      overflow: 'hidden',
    },
    carTitle: {
      fontSize: '2.5em',
      marginBottom: '10px',
      color: '#333',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    carDescription: {
      fontSize: '1.2em',
      marginBottom: '20px',
      color: '#555',
      lineHeight: '1.6',
    },
    carImages: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '20px',
    },
    carImageWrapper: {
      position: 'relative',
      width: 'calc(33.333% - 10px)',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
    carImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      display: 'block',
      transition: 'transform 0.3s',
    },
    carTags: {
      marginBottom: '20px',
    },
    carTag: {
      display: 'inline-block',
      backgroundColor: '#f0f0f0',
      color: '#777',
      padding: '5px 15px',
      margin: '5px 5px 0 0',
      borderRadius: '20px',
      fontSize: '0.9em',
      transition: 'background-color 0.3s, color 0.3s',
      cursor: 'default',
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      fontSize: '1em',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '30px',
      color: '#fff',
      background: 'linear-gradient(90deg, #23a6d5, #23d5ab)',
      backgroundSize: '200% 200%',
      transition: 'background-position 0.5s, transform 0.3s',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    editButton: {
      background: 'linear-gradient(90deg, #4caf50, #66bb6a)',
    },
    deleteButton: {
      background: 'linear-gradient(90deg, #f44336, #e57373)',
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: 'transparent',
      color: '#fff',
      fontSize: '1.5em',
      cursor: 'pointer',
      border: 'none',
      transition: 'color 0.3s',
    },
    loading: {
      textAlign: 'center',
      fontSize: '1.5em',
      color: '#888',
      padding: '50px 0',
    },
    error: {
      textAlign: 'center',
      fontSize: '1.2em',
      color: '#f44336',
      marginBottom: '20px',
    },
  };

  // Inline CSS Animations
  const inlineStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes buttonHover {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .car-image-wrapper:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
    .car-image-wrapper:hover img {
      transform: scale(1.05);
    }
    .button:hover {
      animation: buttonHover 0.5s forwards;
      transform: scale(1.05);
    }
    .button:active {
      transform: scale(0.95);
    }
    .back-button:hover {
      color: #ffeb3b;
    }
    .loading-spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #fff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
  `;

  if (isLoading) {
    return (
      <div className="loading" style={styles.loading}>
        <FaSpinner className="loading-spinner" />
        Loading...
        <style>{inlineStyles}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error" style={styles.error}>
        {error}
        <style>{inlineStyles}</style>
      </div>
    );
  }

  if (!car) {
    return (
      <div style={styles.loading}>
        Car not found.
        <style>{inlineStyles}</style>
      </div>
    );
  }

  return (
    <div className="car-detail-container" style={styles.carDetailContainer}>
      {/* Inline CSS Styles */}
      <style>{inlineStyles}</style>
      {/* Back Button */}
      <button
        className="back-button"
        style={styles.backButton}
        onClick={() => navigate(-1)}
        aria-label="Go Back"
      >
        <FaArrowLeft />
      </button>

      {/* Car Title */}
      <h1 style={styles.carTitle}>
        {car.title}
      </h1>

      {/* Car Description */}
      <p style={styles.carDescription}>{car.description}</p>

      {/* Car Images */}
      <div style={styles.carImages}>
        {car.images.map((image, index) => (
          <div key={index} className="car-image-wrapper" style={styles.carImageWrapper}>
            <img src={image} alt={`Car ${index + 1}`} style={styles.carImage} />
          </div>
        ))}
      </div>

      {/* Car Tags */}
      <div style={styles.carTags}>
        {car.tags.map((tag, index) => (
          <span key={index} style={styles.carTag}>
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={styles.buttonGroup}>
        <button
          className="button"
          style={{ ...styles.button, ...styles.editButton }}
          onClick={() => navigate(`/cars/${id}/edit`)}
          aria-label="Edit Car"
        >
          <FaEdit /> Edit
        </button>
        <button
          className="button"
          style={{ ...styles.button, ...styles.deleteButton }}
          onClick={handleDelete}
          aria-label="Delete Car"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}

export default CarDetail;
