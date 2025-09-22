const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

app.use('/uploads', express.static(uploadFolder));

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadFolder),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

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

app.listen(5001, () => {
  console.log('✅ server2 running on http://localhost:5001');
});