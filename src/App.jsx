

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './PostAdForm.css';

export default function PostAdForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [images, setImages] = useState([]);
  const [selections, setSelections] = useState({});

  const onSubmit = (data) => {
    console.log({ ...data, selections }, images);
    alert('Ad submitted successfully!');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 20) {
      alert('You can only upload up to 20 photos.');
      return;
    }
    setImages([...images, ...files]);
  };

  const handleSelect = (category, value) => {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category] === value ? null : value,
    }));
  };

  const renderButtons = (category, options) => (
    <div className="button-group">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`option-button ${selections[category] === option ? 'selected' : ''}`}
          onClick={() => handleSelect(category, option)}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="post-ad-form">
      <h2 className="form-title">POST YOUR AD</h2>

      <div className="form-section">
        <h3 className="section-title">INCLUDE SOME DETAILS</h3>

        <div className="button-group-label">Type *</div>
        {renderButtons('type', ['Flats / Apartments', 'Independent / Builder Floors', 'Farm House', 'House & Villa'])}

        <div className="button-group-label">BHK</div>
        {renderButtons('bhk', [1, 2, 3, 4, '4+'])}

        <div className="button-group-label">Bathrooms</div>
        {renderButtons('bathrooms', [1, 2, 3, 4, '4+'])}

        <div className="button-group-label">Furnishing</div>
        {renderButtons('furnishing', ['Furnished', 'Semi-Furnished', 'Unfurnished'])}

        <div className="button-group-label">Project Status</div>
        {renderButtons('status', ['New Launch', 'Ready to Move', 'Under Construction'])}

        <div className="button-group-label">Listed by</div>
        {renderButtons('listedBy', ['Builder', 'Dealer', 'Owner'])}

        <div className="form-group">
          <label>Super Builtup area sqft *</label>
          <input type="number" {...register('superArea', { required: true })} />
          {errors.superArea && <span className="error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Carpet Area sqft *</label>
          <input type="number" {...register('carpetArea', { required: true })} />
          {errors.carpetArea && <span className="error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Maintenance (Monthly)</label>
          <input type="number" {...register('maintenance')} />
        </div>

        <div className="form-group">
          <label>Total Floors</label>
          <input type="number" {...register('totalFloors')} />
        </div>

        <div className="form-group">
          <label>Floor No</label>
          <input type="number" {...register('floorNo')} />
        </div>

        <div className="button-group-label">Car Parking</div>
        {renderButtons('carParking', [0, 1, 2, 3, '3+'])}

        <div className="form-group">
          <label>Facing</label>
          <select {...register('facing')}>
            <option value="">Select</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
        </div>

        <div className="form-group">
          <label>Project Name</label>
          <input {...register('projectName')} maxLength={70} />
        </div>

        <div className="form-group">
          <label>Ad title *</label>
          <input {...register('title', { required: true, maxLength: { value: 30, message: 'Maximum 30 characters allowed' } })} />
          {errors.title && <span className="error">{errors.title.message || 'Ad title is required'}</span>}
          <small>Mention the key features of your item (e.g. brand, model, age, type)</small>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea {...register('description', { required: true,  maxLength: { value: 200, message: 'Maximum 200 characters allowed' } })} maxLength={4096}></textarea>
          {errors.description && <span className="error">{errors.description.message || 'Description is required'}</span>}
          <small>Include condition, features and reason for selling</small>
        </div>

        <h3 className="section-title">SET A PRICE</h3>
        <div className="form-group">
          <label>Price *</label>
          <input type="number" {...register('price', { required: true })} />
          {errors.price && <span className="error">Price is required</span>}
        </div>

        <h3 className="section-title">UPLOAD UP TO 20 PHOTOS</h3>
        <div className="image-upload-grid">
          {[...Array(20)].map((_, index) => (
            <label key={index} className="image-upload-slot">
              {images[index] ? (
                <img src={URL.createObjectURL(images[index])} alt="Uploaded" />
              ) : (
                <div className="image-upload-label">Add Photo</div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          ))}
        </div>
        {images.length === 0 && <span className="error">This field is mandatory</span>}

        <h3 className="section-title">CONFIRM YOUR LOCATION</h3>
        <div className="tab-section">
          <div className="tab active">LIST</div>
          <div className="tab">CURRENT LOCATION</div>
        </div>

        <div className="form-group">
          <label>State *</label>
          <select {...register('state', { required: true })}>
            <option value="">Select</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          {errors.state && <span className="error">This field is mandatory</span>}
        </div>

        <h3 className="section-title">REVIEW YOUR DETAILS</h3>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value="Warish Ahmad" readOnly />
        </div>

        <p>We will send you a confirmation code by SMS on the next step.</p>

        <div className="form-group">
          <label>Mobile Phone Number *</label>
          <input
            type="tel"
            {...register('mobile', { required: true, pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' } })}
            placeholder="+91"
          />
          {errors.mobile && <span className="error">{errors.mobile.message || 'This field is mandatory'}</span>}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </div>
    </form>
  );
}