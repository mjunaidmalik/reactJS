// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            {/* Add more links as needed */}
                        </ul>
                    </div>
                    <span className="d-flex navbar-brand">Shopping List</span>
                </div>
            </nav>
        </header>
    );
}

export default Header;
