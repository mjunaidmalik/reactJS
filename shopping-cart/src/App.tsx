import { Suspense, lazy, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import AppContext from './context/AppContext';
import Lists from './pages/Lists';
import ListForm from './pages/ListForm';
import ListDetail from './pages/ListDetail';
import { Container } from 'react-bootstrap';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

export default function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Container>
      <ThemeToggle />
        <Suspense fallback={<div>Loading...</div>}>
          <AppContext>
            <Routes>
              <Route index element={<Lists />} />
              <Route path='/list/:listId/new' element={<ListForm />} />
              <Route path='/list/:listId' element={<ListDetail />} />
            </Routes>
          </AppContext>
        </Suspense>
      </Container>
    </BrowserRouter>
  );
}
