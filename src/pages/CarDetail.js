import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function CarDetail() {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const res = await axios.get(`http://localhost:5000/api/cars/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setCar(res.data);
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/cars/${id}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    });
    navigate('/cars');
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <h1>{car.title}</h1>
      <p>{car.description}</p>
      <div>
        {car.images.map((image, index) => <img key={index} src={image} alt={`Car ${index + 1}`} />
        )}
      </div>
      <div>
        {car.tags.map((tag, index) =>
          <span key={index}>{tag}</span>
        )}
      </div>
      <button onClick={() => navigate(`/cars/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CarDetail;