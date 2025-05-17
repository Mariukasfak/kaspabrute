import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Opponents from './pages/Opponents';
import Play from './pages/Play';
import Result from './pages/Result';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/opponents" element={<Opponents />} />
          <Route path="/play/:username" element={<Play />} />
          <Route path="/result/:username" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}