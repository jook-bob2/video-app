'use client';
import React, { useState, useEffect } from 'react';

interface StarType {
  id: number;
  x: number;
  y: number;
  color: string;
}

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<StarType[]>([]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
    createStar(e.pageX, e.pageY);
  };

  const getRandomColor = () => {
    const pastelTones = ['#FFD1DC', '#FFB6C1', '#FFC0CB', '#FF69B4', '#FFE4E1'];
    return pastelTones[Math.floor(Math.random() * pastelTones.length)];
  };

  const createStar = (x: number, y: number) => {
    const newStar = { id: Math.random(), x, y, color: getRandomColor() };
    setStars((prevStars) => [...prevStars, newStar]);

    // 일정 시간이 지난 후 삭제
    setTimeout(() => {
      setStars((prevStars) => prevStars.filter((star) => star.id !== newStar.id));
    }, 1000);
  };

  return (
    <>
      <div
        className='custom-cursor'
        style={{ left: cursorPosition.x, top: cursorPosition.y }}></div>
      {stars.map((star) => (
        <div
          key={star.id}
          className='star'
          style={{
            left: star.x,
            top: star.y,
            backgroundColor: star.color,
            transition: 'opacity 1s ease',
          }}></div>
      ))}
    </>
  );
};

export default CustomCursor;
