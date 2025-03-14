import React, { useState } from 'react';
import './DeepfakeDetection.css';

const DeepfakeDetection = () => {
    const [fileName, setFileName] = useState('Choose File');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('Choose File'); // Reset to default if no file is selected
        }
    };

    const handleUpload = () => {
        const fileInput = document.getElementById('videoFile');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a video file first.');
            return;
        }

        const formData = new FormData();
        formData.append('video', file);

        setLoading(true);
        setResult('');

        fetch('http://127.0.0.1:5000/detect_deepfake', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                setResult(`Detection Result: ${data.result.charAt(0).toUpperCase() + data.result.slice(1)}`);
            } else if (data.error) {
                setResult(`Error: ${data.error}`);
            } else {
                setResult('Unexpected response format.');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setResult('Error: Could not connect to the server.');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="container">
            <h1>Detect Deepfake Videos</h1>
            <div className="file-input-container">
                <input type="file" id="videoFile" className="file-input" accept="video/*" onChange={handleFileChange} />
                <label htmlFor="videoFile" className="file-input-label">{fileName}</label>
            </div>
            <div className="button-result-container">
                {!loading && (
                    <button id="uploadButton" onClick={handleUpload} disabled={loading}>
                        Upload and Detect
                    </button>
                )}
                <div id="result">{result}</div>
            </div>
            {loading && (
                <div id="loading" className="loading-bar">
                    <div className="loading-bar-inner"></div>
                </div>
            )}
            <img id="thumbnail" alt="video thumbnail" />
        </div>
    );
};

export default DeepfakeDetection;