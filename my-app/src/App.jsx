// src/App.jsx

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DocumentManager from "./pages/DocumentManager";
import CollegeReview from "./pages/CollegeReview";
import MindMapGenerator from "./pages/MindMapGenerator"; // 👈 Import the new component

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/document-manager" element={<DocumentManager />} />
        <Route path="/college-reviews" element={<CollegeReview />} />
        <Route path="/mind-map-generator" element={<MindMapGenerator />} /> {/* 👈 Add this new route */}
      </Routes>
    </div>
  );
}

export default App;