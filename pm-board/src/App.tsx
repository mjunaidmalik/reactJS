import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './modules/Home';
import About from './modules/About';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}