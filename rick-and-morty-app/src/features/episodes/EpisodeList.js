import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EpisodeList.css';

const EpisodeList = () => {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        const episodePromises = data.episode.map(ep => axios.get(ep));
        const episodeResponses = await Promise.all(episodePromises);
        setEpisodes(episodeResponses.map(response => response.data));
        setStatus('succeeded');
      } catch (error) {
        setError(error.message);
        setStatus('failed');
      }
    };

    fetchEpisodes();
  }, [id]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="episode-list">
      <h2>Episodes</h2>
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>
            <h3>{episode.name}</h3>
            <p>{episode.air_date}</p>
            <p>{episode.episode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
