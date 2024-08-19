import React from 'react';
import './CustomArrows.css';

export const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick} aria-label="Previous" role="button">
      <span className="arrow prev-arrow">‹</span>
    </div>
  );
};

export const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick} aria-label="Next" role="button">
      <span className="arrow next-arrow">›</span>
    </div>
  );
};
