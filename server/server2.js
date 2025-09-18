import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Ensure uploads folder exists
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadFolder));

// Configure multer for disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file received' });
  }

  console.log('Uploaded:', req.file.filename);
  res.json({
    success: true,
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
});

// Delete route
app.delete('/delete/:filename', (req, res) => {
  const filePath = path.join(uploadFolder, req.params.filename);
  fs.unlink(filePath, err => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    console.log('Deleted:', req.params.filename);
    res.json({ success: true, message: 'File deleted' });
  });
});

// Start server
app.listen(5001, () => {
  console.log('server2 running on http://localhost:5001');
});