import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ChartsPage from './pages/ChartsPage';
import Header from './components/Header';

function App() {
  return (
   <div>
    <Router>
    <Header />
    <Routes>
      <Route path="/cryptocurrency/:id" element={<ChartsPage />}/>
      <Route path="/" element={<HomePage />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
