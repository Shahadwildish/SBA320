import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './features/characters/CharacterList';
import EpisodeList from './features/episodes/EpisodeList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Rick and Morty Characters</h1>
        <Routes>
          <Route path="/episodes/:id" element={<EpisodeList />} />
          <Route path="/" element={<CharacterList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
