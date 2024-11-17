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
    <div>
    <h1 style={{color:"black"}}>Welcome to Car Management App</h1>
    <button onClick={handleRegisterClick}>Register</button>
    <button onClick={handleLoginClick}>Login</button>
    </div>
  )

}

export default Home;