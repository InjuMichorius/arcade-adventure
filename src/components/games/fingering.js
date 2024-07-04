import React, { useState, useEffect } from 'react';

const Fingering = () => {
  const [touchCount, setTouchCount] = useState(0);

  const handleTouchStart = (event) => {
    event.preventDefault(); // Prevent default behavior
    setTouchCount(event.touches.length);
  };

  const handleTouchMove = (event) => {
    event.preventDefault(); // Prevent default behavior
    setTouchCount(event.touches.length);
  };

  const handleTouchEnd = (event) => {
    event.preventDefault(); // Prevent default behavior
    setTouchCount(event.touches.length);
  };

  useEffect(() => {
    const touchArea = document.body; // Attach listeners to the body element
    touchArea.addEventListener('touchstart', handleTouchStart, { passive: false });
    touchArea.addEventListener('touchmove', handleTouchMove, { passive: false });
    touchArea.addEventListener('touchend', handleTouchEnd, { passive: false });
    touchArea.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    return () => {
      touchArea.removeEventListener('touchstart', handleTouchStart);
      touchArea.removeEventListener('touchmove', handleTouchMove);
      touchArea.removeEventListener('touchend', handleTouchEnd);
      touchArea.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  return (
    <div>
      <h1>{touchCount ? touchCount : "Fingering"}</h1>
      <p className='explanation-text'>Place your finger on the screen. Clockwise, guess how many fingers are on the screen. If you guess correctly, you're out. If you guess wrong, you must drink.</p>
    </div>
  );
};

export default Fingering;
