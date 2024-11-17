import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function CarForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        const res = await axios.get(`http://localhost:5000/api/cars/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        const { title, description, images, tags } = res.data;
        setTitle(title);
        setDescription(description);
        setImages(images);
        setTags(tags.join(', '));
      };
      fetchCar();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = {
      title,
      description,
      images,
      tags: tags.split(',').map(tag => tag.trim())
    };
    if (id) {
      await axios.put(`http://localhost:5000/api/cars/${id}`, carData, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
    } else {
      await axios.post('http://localhost:5000/api/cars', carData, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
    }
    navigate('/cars');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="file" onChange={handleImageUpload} multiple accept="image/*" />
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma-separated)" />
      <button type="submit">{id ? 'Update' : 'Create'} Car</button>
    </form>
  );
}

export default CarForm;