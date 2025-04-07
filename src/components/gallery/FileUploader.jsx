import React, { useState } from 'react';
import '../../App.css';
import './GalleryGrid.css';

const FileUploader = () => {
  const [files, setFiles] = useState(null);
  const [collegeID, setCollegeID] = useState(""); // Allow user to input CollegeID
  const [status, setStatus] = useState('initial');

  // Replace with your API Gateway URL
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

      reader.onload = () => {
        const base64Data = reader.result.split(',')[1]; // Remove metadata prefix
        resolve(base64Data);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      console.error("❌ No file selected for upload.");
      setStatus('fail');
      return;
    }
  
    setStatus('uploading');
    console.log("📂 Selected file:", files[0]);
  
    try {
      const file = files[0];
      const base64Image = await convertFileToBase64(file);
  
      console.log("📸 Base64 Image Data:", base64Image.slice(0, 100)); // Print only first 100 chars for preview
  
      const payload = {
        image: base64Image,  // Make sure this is not undefined
        CollegeID: collegeID, // Pass the user input for CollegeID
        description: file.name,
        filename: file.name
      };
  
      console.log("📡 Sending payload:", JSON.stringify(payload, null, 2));
  
      const result = await fetch(API_GATEWAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await result.json();
      console.log("📨 Server Response:", data);
  
      if (result.ok) {
        setStatus('success');
        alert(`Image uploaded successfully! Image URL: ${data.image_url}`);
      } else {
        setStatus('fail');
      }
    } catch (error) {
      console.error("❌ Upload failed:", error);
      setStatus('fail');
    }
  };
  

  return (
    <div className='box'>
      <h1>Upload Files</h1>
      
      <div className="input-group">
        <label>College ID:</label>
        <input
          type="text"
          value={collegeID}
          onChange={(e) => setCollegeID(e.target.value)}
          placeholder="Enter College ID"
        />
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
  if (status === 'success') {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ File upload failed!</p>;
  } else if (status === 'uploading') {
    return <p>⏳ Uploading file...</p>;
  } else {
    return null;
  }
};

export default FileUploader;
