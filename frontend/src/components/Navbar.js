import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="nav-container">
                <h2 className="logo">Deepfake Detection</h2>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/aboutus">About Us</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;