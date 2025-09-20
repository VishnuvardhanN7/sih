import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DocumentManager.css';

const DocumentManager = () => {
  const navigate = useNavigate();

  const initialDocs = [
    { title: '10th Grade Certificate', key: 'grade10', filename: '' },
    { title: '12th Grade Certificate', key: 'grade12', filename: '' },
    { title: 'Aadhar Card', key: 'aadhar', filename: '' },
    { title: 'Income Certificate', key: 'income', filename: '' },
    { title: 'Caste Certificate', key: 'caste', filename: '' },
    { title: 'Passport Photo', key: 'passport', filename: '' }
  ];

  const [documents, setDocuments] = useState(initialDocs);
  const [interests, setInterests] = useState({
    vitap: null,
    srm: null,
    eamcet: null,
    jee: null
  });

  const handleUpload = async (file, docKey) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('docKey', docKey);

    try {
      const res = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setDocuments(prev =>
          prev.map(d =>
            d.key === docKey
              ? {
                  ...d,
                  status: 'Uploaded',
                  uploaded: new Date().toISOString().split('T')[0],
                  size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
                  filename: data.filename
                }
              : d
          )
        );
        alert('Upload successful');
      } else {
        alert('Upload failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading file: ' + err.message);
    }
  };

  const handleDelete = async (docKey, filename) => {
    try {
      const res = await fetch(`http://localhost:5001/delete/${filename}`, {
        method: 'DELETE'
      });

      const contentType = res.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      const data = isJson ? await res.json() : { success: false, message: 'Unexpected response format' };

      if (data.success) {
        setDocuments(prev =>
          prev.map(d =>
            d.key === docKey
              ? {
                  ...d,
                  status: 'Pending',
                  uploaded: '-',
                  size: '-',
                  filename: ''
                }
              : d
          )
        );
        alert('File deleted successfully');
      } else {
        alert('Delete failed: ' + data.message);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting file: ' + err.message);
    }
  };

  const handleInterest = (key, value) => {
    setInterests(prev => ({ ...prev, [key]: value }));
  };

  const registrationOptions = [
    {
      key: 'vitap',
      name: 'VITAP',
      logo: '/logos/vitap.webp',
      link: 'https://vitap.ac.in',
      deadline: '30th September 2025'
    },
    {
      key: 'srm',
      name: 'SRM',
      logo: '/logos/srmap.webp',
      link: 'https://www.srmist.edu.in',
      deadline: '5th October 2025'
    },
    {
      key: 'eamcet',
      name: 'EAMCET',
      logo: '/logos/eamcet.png',
      link: 'https://eamcet.tsche.ac.in',
      deadline: '10th October 2025'
    },
    {
      key: 'jee',
      name: 'JEE',
      logo: '/logos/jee.png',
      link: 'https://jeemain.nta.nic.in',
      deadline: '15th October 2025'
    }
  ];

  return (
    <div className="document-manager">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Dashboard
      </button>

      <h1>Document Management</h1>
      <p className="subtext">Upload and manage your examination documents</p>

      <div className="progress-section">
        <h2>Document Completion Progress</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width:
                ((documents.filter(
                  d => d.status === 'Verified' || d.status === 'Uploaded'
                ).length) / 6) * 100 + '%'
            }}
          ></div>
        </div>
        <p className="progress-text">
          {
            documents.filter(
              d => d.status === 'Verified' || d.status === 'Uploaded'
            ).length
          } of 6 required documents uploaded
        </p>
      </div>

      <div className="doc-grid">
        {documents.map((doc, idx) => (
          <div key={idx} className="doc-card">
            <h3>{doc.title}</h3>
            <span className={`status-tag ${getStatusClass(doc.status || 'Pending')}`}>
              {doc.status || 'Pending'}
            </span>
            <p className="meta">Uploaded: {doc.uploaded || '-'}</p>
            <p className="meta">Size: {doc.size || '-'}</p>

            <div className="actions">
              <label className="upload-btn">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={e => handleUpload(e.target.files[0], doc.key)}
                />
              </label>

              {doc.status === 'Uploaded' && doc.filename && (
                <>
                  <a
                    href={`http://localhost:5001/uploads/${doc.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    View
                  </a>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(doc.key, doc.filename)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="registration-options">
        <h2>Upcoming Registrations</h2>
        {registrationOptions.map(option => (
          <div key={option.key} className="option-card">
            <img src={option.logo} alt={`${option.name} Logo`} className="option-logo" />
            <div className="option-info">
              <div className="info-row">
                <strong>{option.name}</strong>
                <span>
                  About: <a href={option.link} target="_blank" rel="noopener noreferrer">Visit Website</a>
                </span>
                <span className="deadline">Upto: {option.deadline}</span>
              </div>
            </div>
            <div className="option-actions">
              <button
                className={`register-btn ${interests[option.key] === 'registered' ? 'active' : ''}`}
                onClick={() => handleInterest(option.key, 'registered')}
              >
                Register
              </button>
              <button
                className={`not-btn ${interests[option.key] === 'not_interested' ? 'active' : ''}`}
                onClick={() => handleInterest(option.key, 'not_interested')}
              >
                Not Interested
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getStatusClass(status) {
  switch (status) {
    case 'Verified': return 'status-verified';
    case 'Uploaded': return 'status-uploaded';
    case 'Pending': return 'status-pending';
    case 'Rejected': return 'status-rejected';
    default: return 'status-default';
  }
}

export default DocumentManager;