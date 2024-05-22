import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-3 fixed-bottom">
            <div className="container">
                <span>&copy; {new Date().getFullYear()} Your Company</span>
            </div>
        </footer>
    );
}