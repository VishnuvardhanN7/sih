// D:\HACKATHONS\SIH\demo\server\mindmap-server.js

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Enable CORS for all origins
app.use(cors());

// A simple in-memory database to store job status
const mindmapJobs = {};

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Function to simulate mind map generation
function processMindmap(jobId, filePath, fileName) {
  setTimeout(() => {
    // Mock mind map data
    const mockData = {
      central_idea: fileName.replace(/\.[^/.]+$/, ""),
      branches: [
        {
          name: "Frontend",
          sub_branches: ["React.js", "axios", "react-d3-tree"]
        },
        {
          name: "Backend",
          sub_branches: ["Node.js", "Express", "Multer"]
        },
        {
          name: "Key Features",
          sub_branches: ["File Upload", "Job Polling", "Mind Map Display"]
        }
      ]
    };
    mindmapJobs[jobId].status = 'completed';
    mindmapJobs[jobId].mindmapData = mockData;
    console.log(`Job ${jobId} completed.`);
  }, 5000); // Simulate a 5-second processing time
}

// Endpoint to upload a file and start the mind map generation
app.post('/api/mindmaps/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  const jobId = Date.now().toString();
  const newJob = {
    id: jobId,
    title: req.file.originalname.replace(/\.[^/.]+$/, ""),
    status: 'processing',
    createdAt: new Date().toISOString(),
    size: `${Math.round(req.file.size / 1024)} KB`,
    mindmapData: null,
  };

  mindmapJobs[jobId] = newJob;

  // Start the background process
  processMindmap(jobId, req.file.path, req.file.originalname);

  res.json({ success: true, jobId: jobId });
});

// Endpoint to get all mind map jobs
app.get('/api/mindmaps', (req, res) => {
  const jobs = Object.values(mindmapJobs).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(jobs);
});

// Endpoint to get the status of a specific job
app.get('/api/mindmaps/job/:jobId', (req, res) => {
  const job = mindmapJobs[req.params.jobId];
  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found.' });
  }
  res.json(job);
});

// Endpoint to delete a job
app.delete('/api/mindmaps/:jobId', (req, res) => {
  const jobId = req.params.jobId;
  if (mindmapJobs[jobId]) {
    delete mindmapJobs[jobId];
    return res.json({ success: true, message: 'Job deleted.' });
  }
  res.status(404).json({ success: false, message: 'Job not found.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});