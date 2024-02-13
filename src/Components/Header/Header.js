import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

export default function Header() {
    return (
        <div className="header">
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
                <h1>Outermess</h1>
            </Link>
            <Link to="/about" style={{ textDecoration: 'none', color: '#000' }}>About Us</Link>
        </div>
    );
}