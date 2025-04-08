import React, { useState } from 'react';
import '../../App.css';
import './GalleryGrid.css';

const FileUploader = () => {
  const [files, setFiles] = useState(null);
  const [collegeID, setCollegeID] = useState('');
  const [teamName, setTeamName] = useState('');
  const [status, setStatus] = useState('initial');

  const API_GATEWAY_URL = 'https://84aqocbo7g.execute-api.us-east-1.amazonaws.com/prod/uploadGallery';

  const handleFileChange = (e) => {
    if (e.target.files) {
      setStatus('initial');
      setFiles(e.target.files);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!files || files.length === 0 || !teamName) {
      alert("Please select a file and provide a team name.");
      setStatus('fail');
      return;
    }

    setStatus('uploading');

    try {
      const file = files[0];
      const base64Image = await convertFileToBase64(file);

      const payload = {
        image: base64Image,
        CollegeID: collegeID,
        teamName: teamName,
        description: file.name,
        filename: file.name
      };

      const result = await fetch(API_GATEWAY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await result.json();

      if (result.ok) {
        setStatus('success');
        alert(`Image uploaded successfully! Image URL: ${data.image_url}`);
      } else {
        console.error("Upload failed:", data);
        setStatus('fail');
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus('fail');
    }
  };

  return (
    <div className='box'>
      <h1>Upload Files</h1>

      <div className="input-group">
        <label>College ID:</label>
        <input type="text" value={collegeID} onChange={(e) => setCollegeID(e.target.value)} placeholder="Enter College ID" />
      </div>

      <div className="input-group">
        <label>Team Name:</label>
        <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Enter Team Name" />
      </div>

      <div className="input-group">
        <input id="file" type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {files && [...files].map((file, index) => (
        <section key={file.name}>
          File {index + 1}:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      ))}

      {files && (
        <button onClick={handleUpload} className="submit">
          Upload {files.length > 1 ? 'files' : 'a file'}
        </button>
      )}

      <Result status={status} />
    </div>
  );
};

const Result = ({ status }) => {
  if (status === 'success') return <p>✅ File uploaded successfully!</p>;
  if (status === 'fail') return <p>❌ File upload failed!</p>;
  if (status === 'uploading') return <p>⏳ Uploading file...</p>;
  return null;
};

export default FileUploader;
