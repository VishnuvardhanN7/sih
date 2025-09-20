import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DocumentManager from "./pages/DocumentManager";
import CollegeReview from "./pages/CollegeReview";

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/document-manager" element={<DocumentManager />} />
        <Route path="/college-reviews" element={<CollegeReview />} />
      </Routes>
    </div>
  );
}

export default App;