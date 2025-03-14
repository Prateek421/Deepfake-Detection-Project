import React from 'react';
import DeepfakeDetection from './components/DeepfakeDetection';
import './App.css';

const App = () => {
    return (
        <div className="video-background">
            <div className="navbar">
                <h1>Deepfake <span style={{ color: "white" }}>Detection</span></h1>
            </div>
            <div className="section video-section">
                <video autoPlay muted loop playsInline preload="auto" id="background-video">
                    <source src="/videos/background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            {/* Overlay div */}
            <div className="video-overlay"></div>
            <div className="lorem-section">
                <p>
                In an era of deepfakes, seeing is no longer believing. Critical thinking is our best defense.
                </p>
            </div>
        </div>
        <div className="deepfake-section">
            <div className="text-content">
                <p>Detect Deepfake Videos<br/>Here ➝ </p>
            </div>
            <div className="deepfake-container">
                <DeepfakeDetection />
            </div>
        </div>
        </div>
    );
};

export default App;
