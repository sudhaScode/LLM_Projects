import { useState } from "react";
import "./UploadDocuments.css";

function UploadDocuments() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmitClick = async () => {
    console.log(file.name)
    if (file) {
      setLoading(true);
      const fileData = new FormData();
      fileData.append('file', file);
      

      try {
        const response = await fetch('http://127.0.0.1:8000/upload', {
          method: "POST",
          body: fileData,
        });

        if (response.status === 200) {
          setStatus(true);
          console.log('File uploaded successfully!');
        } else {
          console.error('Failed to upload file. Server response:', response.statusText);
          // Handle error, display a message, or log more details
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // Handle error, display a message, or log more details
      } finally {
        setLoading(false);
      }
    } else {
      console.warn('No file selected for upload.');
    }
  };

  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="file-container">
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <button
          className="button-upload"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          Upload Documents
        </button>
      </div>
      <div className="submit-button-container">
        <button
          style={{ opacity: `${file? "0.5" : "1"}` }}
          disabled={!file}
          className="submit-button"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </div>
      
      {file && (
        <div className="file-list">
          <h2>Selected files:</h2>
          <ul>
            
              <li>{file.name}</li>
          </ul>
        </div>
      )}
       {loading && (
        <p>Uploading...</p>
      )}
      {status && <p>Upload successful</p>}
    </div>
  );
}

export default UploadDocuments;
