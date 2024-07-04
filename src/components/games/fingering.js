import React, { useState, useEffect } from 'react';

const Fingering = () => {
  const [touchPoints, setTouchPoints] = useState([]);

  const handleTouchStart = (event) => {
    event.preventDefault(); // Prevent default behavior
    const touches = Array.from(event.touches).map(touch => ({
      identifier: touch.identifier,
      clientX: touch.clientX,
      clientY: touch.clientY
    }));
    setTouchPoints(touches);
  };

  const handleTouchMove = (event) => {
    event.preventDefault(); // Prevent default behavior
    const touches = Array.from(event.touches).map(touch => ({
      identifier: touch.identifier,
      clientX: touch.clientX,
      clientY: touch.clientY
    }));
    setTouchPoints(touches);
  };

  const handleTouchEnd = (event) => {
    event.preventDefault(); // Prevent default behavior
    const remainingTouches = Array.from(event.touches).map(touch => ({
      identifier: touch.identifier,
      clientX: touch.clientX,
      clientY: touch.clientY
    }));
    setTouchPoints(remainingTouches);
  };

  useEffect(() => {
    const touchArea = document.getElementById('touchArea');
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
      <h1>Multi-Touch Detection</h1>
      <div
        id="touchArea"
        style={{
          width: '100%',
          height: '300px',
          backgroundColor: '#ccc',
          position: 'relative',
          touchAction: 'none' // Disable default touch actions
        }}
      >
        {touchPoints.map(point => (
          <div
            key={point.identifier}
            style={{
              position: 'absolute',
              top: point.clientY,
              left: point.clientX,
              width: '20px',
              height: '20px',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>
      <div>
        <h2>Touch Points:</h2>
        <pre>{JSON.stringify(touchPoints, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Fingering;
