import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function CarList() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCars = async () => {
      const res = await axios.get('http://localhost:5000/api/cars', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      console.log(res)
      setCars(res.data);
    };
    fetchCars();
  }, []);
  const handleAddCar = () => {
    navigate('/create-car');
  };
  const handleLogout = () => {
    navigate('/')
  }
  const filteredCars = cars.filter(car => 
    car.title.toLowerCase().includes(search.toLowerCase()) ||
    car.description.toLowerCase().includes(search.toLowerCase()) ||
    car.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cars" />
      <button onClick={handleAddCar}>add car</button>
      {filteredCars.map(car => (
        <div key={car._id}>
          <h2>{car.title}</h2>
          <p>{car.description}</p>
          <Link to={`/cars/${car._id}`}>View Details</Link>
        </div>
      ))}
      <button onClick={handleLogout}>logout</button>
      
    </div>
  );
}

export default CarList;