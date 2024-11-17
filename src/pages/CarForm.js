import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSpinner, FaTrashAlt } from 'react-icons/fa'; // Importing icons for better visuals

function CarForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(''); // State to handle error messages
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/cars/${id}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
          });
          const { title, description, images, tags } = res.data;
          setTitle(title);
          setDescription(description);
          setImages(images);
          setTags(tags.join(', '));
          setImagePreviews(images);
        } catch (error) {
          console.error(error);
          setError('Failed to fetch car details. Please try again.');
        }
      };
      fetchCar();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const carData = new FormData();
    carData.append('title', title);
    carData.append('description', description);
    images.forEach((image) => {
      carData.append('images', image);
    });
    tags.split(',').forEach((tag) => {
      carData.append('tags', tag.trim());
    });

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/cars/${id}`, carData, {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/cars', carData, {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      navigate('/cars');
    } catch (error) {
      console.error(error);
      setError('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
    
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, idx) => idx !== index);
    const newPreviews = imagePreviews.filter((_, idx) => idx !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  return (
    <div className="form-page">
      {/* Inline CSS Styles */}
      <style>{`
        /* Keyframes for background animation */
        @keyframes gradientBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Keyframes for animations */
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes buttonHover {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Page styling with animated background */
        .form-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(-45deg, #23a6d5, #23d5ab, #ee7752, #e73c7e);
          background-size: 400% 400%;
          animation: gradientBackground 15s ease infinite;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px; /* Added padding for better responsiveness */
        }

        /* Form container styling */
        .car-form-container {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 600px; /* Adjusted max-width for better layout */
          animation: fadeIn 0.5s ease-in-out;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        /* Form title styling */
        .form-title {
          margin-bottom: 30px;
          font-size: 2em;
          color: #333;
          text-align: center;
          animation: fadeIn 0.5s ease-in-out;
        }

        /* Input field styling */
        .input-field, .textarea-field {
          width: 100%;
          padding: 15px 20px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 30px;
          font-size: 1em;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
          box-sizing: border-box; /* Ensure padding doesn't affect width */
          background-color: rgba(255, 255, 255, 0.8);
        }
        .input-field:focus, .textarea-field:focus {
          border-color: #23a6d5;
          box-shadow: 0 0 10px rgba(35, 166, 213, 0.2);
        }

        /* Textarea styling */
        .textarea-field {
          resize: vertical;
          min-height: 120px; /* Increased min-height for better usability */
        }

        /* File input styling */
        .file-input-container {
          margin-bottom: 20px;
          position: relative;
        }
        .file-input {
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .file-label {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px;
          border: 2px dashed #ccc;
          border-radius: 30px;
          font-size: 1em;
          color: #777;
          cursor: pointer;
          transition: border-color 0.3s, background-color 0.3s;
        }
        .file-label:hover {
          border-color: #23a6d5;
          background-color: rgba(35, 166, 213, 0.1);
        }

        /* Image preview styling */
        .image-preview-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .image-preview-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 10px;
        }
        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .remove-image {
          position: absolute;
          top: 5px;
          right: 5px;
          background: rgba(0,0,0,0.6);
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .image-preview-wrapper:hover .remove-image {
          opacity: 1;
        }

        /* Submit button styling */
        .submit-button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 30px;
          font-size: 1em;
          color: #fff;
          background: linear-gradient(90deg, #23a6d5, #23d5ab);
          cursor: pointer;
          background-size: 200% 200%;
          transition: background-position 0.5s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }
        .submit-button:hover {
          animation: buttonHover 0.5s forwards;
          transform: scale(1.02);
        }
        .submit-button:active {
          transform: scale(0.98);
        }

        /* Loading spinner styling */
        .loading-spinner {
          display: inline-block;
          margin-right: 10px;
          animation: spin 1s linear infinite;
        }

        /* Error message styling */
        .error-message {
          color: #f44336;
          margin-bottom: 20px;
          text-align: center;
          animation: fadeIn 0.5s ease-in-out;
        }

        /* Adjustments for small screens */
        @media (max-width: 768px) {
          .car-form-container {
            padding: 30px 20px;
          }
          .form-title {
            font-size: 1.8em;
          }
          .input-field, .textarea-field {
            padding: 12px 15px;
          }
          .submit-button {
            padding: 12px;
          }
        }
      `}</style>

      <div className="car-form-container">
        <h2 className="form-title">{id ? 'Update' : 'Create'} Car</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            className="textarea-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <div className="file-input-container">
            <label className="file-label">
              Click to upload images
              <input
                type="file"
                className="file-input"
                onChange={handleImageUpload}
                multiple
                accept="image/*"
              />
            </label>
          </div>
          {/* Image Previews */}
          <div className="image-preview-container">
            {imagePreviews.map((src, index) => (
              <div key={index} className="image-preview-wrapper">
                <img src={src} alt={`Preview ${index}`} className="image-preview" />
                <button
                  type="button"
                  className="remove-image"
                  onClick={() => removeImage(index)}
                  aria-label="Remove Image"
                >
                  <FaTrashAlt size={12} />
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            className="input-field"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma-separated)"
          />
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting && <FaSpinner className="loading-spinner" />}
            {id ? 'Update' : 'Create'} Car
          </button>
        </form>
      </div>
    </div>
  );
}

export default CarForm;
