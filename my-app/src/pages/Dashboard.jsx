import Navbar from "../components/Navbar";
import React, { useState } from "react";
import Card from "../components/Card";
import ProfilePopup from "../components/ProfilePopup";
import {
  FileText,
  Users,
  Bot,
  Map,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import "./Dashboard.css";

export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);

  const user = {
    image: "/public/logos/profile.webp",
    name: "Trishanth",
    email: "trishanth@example.com",
    phone: "+91 9876543210",
  };

  const cards = [
    {
      icon: <FileText />,
      title: "Document Manager",
      description: "Securely store and organize all your documents in one place.",
      features: ["PDF Scanner", "Cloud Storage"],
      badge: "100% Secure",
      footer: "8/8 Complete",
      onClick: () => window.open("/document-manager", "_self"),
    },
    {
      icon: <Users />,
      title: "Expert Advisors",
      description: "Get instant help from certified experts.",
      features: ["Real Subject Experts", "24/7 Availability"],
      badge: "Verified Experts",
      footer: "3 Experts",
      onClick: () => { /* Add navigation logic here */ }
    },
    {
      icon: <Bot />,
      title: "AI Study Assistant",
      description: "Get help with your studies anytime, anywhere.",
      features: ["Instant Answers", "24/7 Availability"],
      badge: "Smart Learning",
      footer: "Always Online",
      onClick: () => { /* Add navigation logic here */ }
    },
    {
      icon: <Map />,
      title: "Mind Map Generator",
      description: "Visualize your ideas and concepts with ease.",
      features: ["Smart Suggestions", "Customizable"],
      badge: "AI Powered",
      footer: "5 Generated",
      onClick: () => window.open("/mind-map-generator", "_self"),
    },
    {
      icon: <BookOpen />,
      title: "College Reviews",
      description: "Research colleges and book personalized tours.",
      features: ["Real Students", "Verified Reviews"],
      badge: "Trusted Insights",
      footer: "Updated Weekly",
      onClick: () => window.open("/college-reviews", "_self"),
    },
    {
      icon: <MessageSquare />,
      title: "Messages",
      description: "Connect with your peers and mentors.",
      features: ["Private & Safe", "Real-time"],
      badge: "Secure Messaging",
      footer: "2 Unread",
      onClick: () => { /* Add navigation logic here */ }
    },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src={user.image}
            alt="Profile"
            className="profile-pic"
            onClick={() => setShowPopup(true)}
          />
          <span className="username">{user.name}</span>
        </div>
        <button className="logout-btn">Logout</button>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Everything You Need to Succeed</h1>
          <p className="dashboard-subtitle">
            Comprehensive tools designed to boost your exam preparation
          </p>
        </div>

        <div className="circle-layout">
          <img src="/public/logos/circle.webp" alt="Center Icon" className="center-image" />
          {cards.map((card, i) => (
            <div className={`circle-item item-${i}`} key={i}>
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>

      {showPopup && <ProfilePopup user={user} onClose={() => setShowPopup(false)} />}
    </>
  );
}