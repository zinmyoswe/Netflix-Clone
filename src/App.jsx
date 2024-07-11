import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import './App.css';
import TvShowDetails from './pages/TvShowDetails';
import ActorDetailPage from './pages/ActorDetailPage';
import CategoryDetailPage from './pages/CategoryDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/tv/:movieId" element={<TvShowDetails />} />
        <Route path="/actor/:actorId" element={<ActorDetailPage />} />
        <Route path="/category/:categoryId" element={<CategoryDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
