import React, { useEffect } from 'react';
import './Background.css';

const Background = () => {
  useEffect(() => {
    const section = document.querySelector('.section');
    const starsTotal = 600;

    for (let i = 0; i < starsTotal; i++) {
      const star = document.createElement('div');
      star.className = `star star--${i}`;
      star.style.height = getRandomNumber(2) + 'px';
      star.style.width = getRandomNumber(2) + 'px';
      star.style.top = getRandomNumber(100) + '%';
      star.style.left = getRandomNumber(100) + '%';
      star.style.animation = `shining ${getRandomNumber(5)}s ${getRandomNumber(5)}s infinite`;
      section.appendChild(star);
    }

    function getRandomNumber(max) {
      return Math.floor(Math.random() * max);
    }
  }, []);

  return (
    <div className="section"></div>
  );
};

export default Background;
