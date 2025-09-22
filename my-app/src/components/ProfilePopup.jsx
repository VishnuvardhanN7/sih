import React, { useState } from "react";

export default function ProfilePopup({ user, onClose }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-popup-overlay">
      <div className="popup-content">
        {/* 🔹 Centered Title */}
        <div className="popup-header-centered">
          <h2>User Profile</h2>
        </div>

        <div className="popup-body">
          <img src={formData.image} alt="Profile" className="popup-avatar" />
          {!editMode ? (
            <>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
            </>
          ) : (
            <div className="popup-form">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            </div>
          )}
        </div>

        <div className="popup-footer">
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Save" : "Edit"}
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}