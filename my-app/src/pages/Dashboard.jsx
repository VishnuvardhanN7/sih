import React from "react";
import Card from "../components/Card";
import {
  FileText,
  Users,
  Bot,
  Map,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import "./dashboard.css";

export default function Dashboard() {
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
    },
    {
      icon: <Bot />,
      title: "AI Study Assistant",
      description: "Get help with your studies anytime, anywhere.",
      features: ["Instant Answers", "24/7 Availability"],
      badge: "Smart Learning",
      footer: "Always Online",
      onClick: () => window.open("/chatBot", "_self"),

    },
    {
      icon: <Map />,
      title: "Mind Map Generator",
      description: "Visualize your ideas and concepts with ease.",
      features: ["Smart Suggestions", "Customizable"],
      badge: "AI Powered",
      footer: "5 Generated",
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
    },
  ];

  return (
    <div>
      {/* 🔹 Navbar fixed at top */}
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src="/logos/profile.webp"
            alt="Profile"
            className="profile-pic"
          />
          <span className="username">John Doe</span>
        </div>
        <button className="logout-btn">Logout</button>
      </nav>

      {/* 🔹 Dashboard Content */}
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Everything You Need to Succeed</h1>
          <p className="dashboard-subtitle">
            Comprehensive tools designed to boost your exam preparation
          </p>
        </div>

        <div className="card-grid">
          {cards.slice(0, 3).map((card, i) => (
            <Card key={i} {...card} />
          ))}
        </div>

        <div className="card-grid">
          {cards.slice(3).map((card, i) => (
            <Card key={i + 3} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
