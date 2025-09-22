// src/pages/MindMapGenerator.jsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree';
import { FaFileUpload, FaTrash, FaCheckCircle, FaSpinner, FaTimesCircle, FaMap } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import './MindMapGenerator.css'; 

const API_BASE_URL = 'http://localhost:8000/api/mindmaps';
const POLLING_INTERVAL = 3000;

// Utility function to render status badges
const renderStatusBadge = (status) => {
  let className = "status-badge ";
  let icon = null;

  switch (status) {
    case 'completed':
      className += 'status-completed';
      icon = <FaCheckCircle className="inline-block mr-1" />;
      break;
    case 'processing':
      className += 'status-processing';
      icon = <FaSpinner className="inline-block mr-1 animate-spin" />;
      break;
    case 'failed':
      className += 'status-failed';
      icon = <FaTimesCircle className="inline-block mr-1" />;
      break;
    default:
      className += 'status-default';
      break;
  }
  return <span className={className}>{icon} {status}</span>;
};

// Transform data for react-d3-tree
const transformToD3TreeFormat = (data) => {
  if (!data || !data.central_idea) {
    return { name: "No Data", children: [] };
  }

  const children = data.branches.map(branch => ({
    name: branch.name,
    children: branch.sub_branches ? branch.sub_branches.map(sub => ({ name: sub })) : []
  }));

  return {
    name: data.central_idea,
    children: children
  };
};

export default function MindMapGenerator() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [mindMaps, setMindMaps] = useState([]);
  const [pollingJobs, setPollingJobs] = useState({});
  const [selectedMindMapData, setSelectedMindMapData] = useState(null);

  const fetchMindMaps = useCallback(async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setMindMaps(response.data);
      const newPollingJobs = {};
      response.data.forEach(job => {
        if (job.status === 'processing') {
          newPollingJobs[job.id] = true;
        }
      });
      setPollingJobs(newPollingJobs);
    } catch (error) {
      console.error('Error fetching mind maps:', error);
    }
  }, []);

  useEffect(() => {
    fetchMindMaps();
    const interval = setInterval(fetchMindMaps, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchMindMaps]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleGenerateMindMap = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    setUploadStatus('Uploading...');
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(`Upload successful! Job ID: ${response.data.jobId}`);
      setSelectedFile(null);
      fetchMindMaps();
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('Upload failed. Try again.');
    }
  };

  const handleDeleteMindMap = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchMindMaps();
      if (selectedMindMapData && selectedMindMapData.id === id) {
        setSelectedMindMapData(null);
      }
    } catch (error) {
      console.error('Error deleting mind map:', error);
      alert('Failed to delete mind map.');
    }
  };

  const handleViewMindMap = (mindmapData) => {
    setSelectedMindMapData(mindmapData);
  };

  const d3TreeData = selectedMindMapData ? transformToD3TreeFormat(selectedMindMapData.mindmapData) : null;

  return (
    <div className="mindmap-page-container">
      <Navbar />

      <div className="mindmap-header">
      
        <h1><span className="mindmap-highlight">MIND MAP</span> GENERATOR</h1>
      </div>

      <div className="mindmap-section upload-section">
        <h2>Upload Study Material</h2>
        <p className="mindmap-upload-description">
          Upload PDF notes or documents to generate interactive mind maps. Supports PDF files up to 10MB.
        </p>
        <div className="file-input-container">
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <span className="selected-file-name">
            {selectedFile ? selectedFile.name : 'No file chosen'}
          </span>
          <button
            onClick={handleGenerateMindMap}
            className="generate-button"
            disabled={!selectedFile}
          >
            Generate Mind Map
          </button>
        </div>
        {uploadStatus && (
          <p className={`upload-status-message ${uploadStatus.includes('successful') ? 'success' : 'error'}`}>
            {uploadStatus}
          </p>
        )}
      </div>

      <div className="mindmap-section your-mindmaps-section">
        <h2>Your Mind Maps</h2>
        {mindMaps.length === 0 ? (
          <p className="mindmap-upload-description">No generated mind maps yet.</p>
        ) : (
          <div className="mindmap-list">
            {mindMaps.map((map) => (
              <div key={map.id} className="mindmap-item">
                <div className="mindmap-item-info">
                  <span className="mindmap-item-title">{map.title}</span>
                  <span className="mindmap-item-date">{new Date(map.createdAt).toLocaleString()}</span>
                </div>
                <div className="mindmap-item-actions">
                  {renderStatusBadge(map.status)}
                  {map.status === 'completed' && (
                    <button
                      onClick={() => handleViewMindMap(map)}
                      className="view-button"
                    >
                      View
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMindMap(map.id)}
                    className="delete-button"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mindmap-section preview-section">
        <h2>Mind Map Preview</h2>
        <div className="mindmap-preview-container">
          {d3TreeData ? (
            <Tree
              data={d3TreeData}
              orientation="horizontal"
              translate={{ x: 200, y: 250 }}
              nodeSize={{ x: 180, y: 100 }}
              depthFactor={200}
              separation={{ siblings: 1.2, nonSiblings: 1.2 }}
              pathFunc="step"
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
              zoomable={true}
              draggable={true}
            />
          ) : (
            <p className="mindmap-upload-description">Select a mind map to view its preview.</p>
          )}
        </div>
      </div>
    </div>
  );
}