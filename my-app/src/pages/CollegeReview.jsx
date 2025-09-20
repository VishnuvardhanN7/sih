import './CollegeReview.css';
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CollegeReview() {
  const navigate = useNavigate();

  return (
    <div className="college-review-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </button>
      </div>

      <h2 className="college-review-title">College Reviews</h2>

      <div className="college-card">
        <h3>SRKR Engineering College</h3>
        <p><strong>Location:</strong> Bhimavaram, Andhra Pradesh</p>
        <p><strong>Type:</strong> Private Engineering College</p>
        <p><strong>Students:</strong> 8,000</p>
        <p><strong>Rating:</strong> ⭐ 4.3</p>
        <p><strong>Tags:</strong> NAAC A+ Grade, Top Placements, Modern Infrastructure</p>
        <p><strong>Facilities:</strong> WiFi, Canteen</p>
        <p><strong>Library:</strong> ⭐ 4</p>
        <p><strong>Labs:</strong> ⭐ 4</p>

        <div className="review-section">
          <h4>TRISHANTH <span className="verified">✔ Verified Student</span></h4>
          <p>"Great college with excellent faculty and placement opportunities. The infrastructure is modern and the labs are well maintained. Library facilities are top-notch and the coding culture is strong."</p>
          <div className="review-buttons">
            <a
              href="https://youtu.be/RY3M8_uz98w"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Watch Video Review</button>
            </a>
            <button>Book a Call</button>
          </div>
        </div>
      </div>

      <div className="college-card">
        <h3>VIT-AP</h3>
        <p><strong>Location:</strong> Amaravati, Andhra Pradesh</p>
        <p><strong>Type:</strong> Private Engineering College</p>
        <p><strong>Students:</strong> 8,000</p>
        <p><strong>Rating:</strong> ⭐ 4.3</p>
        <p><strong>Tags:</strong> NAAC A+ Grade, Top Placements, Modern Infrastructure</p>
        <p><strong>Facilities:</strong> WiFi, Canteen</p>
        <p><strong>Library:</strong> ⭐ 4</p>
        <p><strong>Labs:</strong> ⭐ 4</p>

        <div className="review-section">
          <h4>TRISHANTH <span className="verified">✔ Verified Student</span></h4>
          <p>"Great college with excellent faculty and placement opportunities. The infrastructure is modern and the labs are well maintained. Library facilities are top-notch and the coding culture is strong."</p>
          <div className="review-buttons">
            <a
              href="https://youtu.be/RY3M8_uz98w"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Watch Video Review</button>
            </a>
            <button>Book a Call</button>
          </div>
        </div>
      </div>
    </div>
  );
}