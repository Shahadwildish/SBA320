import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCharacters } from './characterSlice';
import Slider from 'react-slick';
import { CustomPrevArrow, CustomNextArrow } from './CustomArrows';
import './CharacterList.css';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

const CharacterList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { characters, status, error } = useSelector((state) => state.characters);
  const [searchTerm, setSearchTerm] = useState('');

  // delay the API request
  const debouncedSearch = debounce((term) => {
    dispatch(loadCharacters(term));
  }, 3500); // Adjust delay 

  useEffect(() => {
    debouncedSearch(searchTerm);
    
    

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCardClick = (id) => {
    navigate(`/episodes/${id}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '0',
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerMode: true,
          centerPadding: '0',
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerMode: true,
          centerPadding: '20px',
        },
      },
    ],
  };

//when searching for a character that doesn't exist it crashes the app because of NULL results
  const displayCharacters = characters || [];

  return (
    <div className="carousel-container">
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && displayCharacters.length === 0 && (
        <div>No characters found</div>
      )}
      <Slider {...settings}>
        {displayCharacters.map((character) => (
          <div
            key={character.id}
            className="character-card"
            onClick={() => handleCardClick(character.id)}
          >
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CharacterList;
