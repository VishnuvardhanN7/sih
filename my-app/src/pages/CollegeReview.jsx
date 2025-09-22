import './CollegeReview.css';
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust path if needed

export default function CollegeReview() {
  const navigate = useNavigate();

  const colleges = [
    {
      name: "SRKR Engineering College",
      location: "Bhimavaram, Andhra Pradesh",
      type: "Private Engineering College",
      students: "8,000",
      rating: "⭐ 4.3",
      tags: "NAAC A+ Grade, Top Placements, Modern Infrastructure",
      facilities: "WiFi, Canteen",
      library: "⭐ 4",
      labs: "⭐ 4",
      review: `"Great college with excellent faculty and placement opportunities. The infrastructure is modern and the labs are well maintained. Library facilities are top-notch and the coding culture is strong."`,
      video: "https://youtu.be/RY3M8_uz98w"
    },
    {
      name: "VIT-AP",
      location: "Amaravati, Andhra Pradesh",
      type: "Private Engineering College",
      students: "8,000",
      rating: "⭐ 4.3",
      tags: "NAAC A+ Grade, Top Placements, Modern Infrastructure",
      facilities: "WiFi, Canteen",
      library: "⭐ 4",
      labs: "⭐ 4",
      review: `"Great college with excellent faculty and placement opportunities. The infrastructure is modern and the labs are well maintained. Library facilities are top-notch and the coding culture is strong."`,
      video: "https://youtu.be/RY3M8_uz98w"
    }
  ];

  return (
    <div className="college-review-wrapper">
      <Navbar />
      <div className="college-review-content">
        <div className="header-row">
          <h2>College Reviews</h2>
        </div>

        {colleges.map((college, index) => (
          <div className="college-card" key={index}>
            <h3>{college.name}</h3>
            <p><strong>Location:</strong> {college.location}</p>
            <p><strong>Type:</strong> {college.type}</p>
            <p><strong>Students:</strong> {college.students}</p>
            <p><strong>Rating:</strong> {college.rating}</p>
            <p><strong>Tags:</strong> {college.tags}</p>
            <p><strong>Facilities:</strong> {college.facilities}</p>
            <p><strong>Library:</strong> {college.library}</p>
            <p><strong>Labs:</strong> {college.labs}</p>

            <div className="review-section">
              <h4>TRISHANTH <span className="verified">✔ Verified Student</span></h4>
              <p>{college.review}</p>
              <div className="review-buttons">
                <a href={college.video} target="_blank" rel="noopener noreferrer">
                  <button>Watch Video Review</button>
                </a>
                <button>Book a Call</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}