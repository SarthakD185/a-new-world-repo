// Code and tutorial from https://uploadcare.com/blog/how-to-upload-file-in-react/
// refactored to JavaScript from TypeScript
// Uses Fetch API with its fetch method to make a request call
// Uses FormData interface to append files to the fetch payload we send to our databse
// Will see result of upload request in the console.


import React, { useState } from 'react';
import '../../App.css';
import './GalleryGrid.css';

const FileUploader = () => {
  const [files, setFiles] = useState(null);
  const [status, setStatus] = useState('initial');

  // API endpoint where we'll send the file
  

  const handleFileChange = (e) => {
    if (e.target.files) {
      setStatus('initial');
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (files) {
      setStatus('uploading');

      const formData = new FormData();
      [...files].forEach((file) => {
        formData.append('files', file);
      });

      try {
        const result = await fetch(DB_URL, {
          method: 'POST',
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus('success');
      } catch (error) {
        console.error(error);
        setStatus('fail');
      }
    }
  };

  return (
    <>
    <div className='box'>
      <h1>Upload Files</h1>
      <div className="input-group">
          <input id="file" type="file" multiple onChange={handleFileChange} />
        </div>

        {files && [...files].map((file, index) => (
          <section key={file.name}>
            File number {index + 1} details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        ))}

        {files && (
          <button
            onClick={handleUpload}
            className="submit"
          >
            Upload {files.length > 1 ? 'files' : 'a file'}
          </button>
        )}

        <Result status={status}/>

      </div>
    </>
  );
};

const Result = ({ status }) => {
  if (status === 'success') {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ File upload failed!</p>;
  } else if (status === 'uploading') {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};


export default FileUploader;