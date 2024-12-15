import React, { useState, useEffect } from "react";
import KeywordStyle from "./KeywordGame.module.css";

const KeywordGame = () => {
  const [currentBox, setCurrentBox] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
 
    const interval = setInterval(() => {
      if (!gameOver) {
        setIsVisible((prev) => !prev);
        setCurrentBox((prev) => (prev === 9 ? 1 : prev + 1));
      }
    }, 1000);


    const timer = setInterval(() => {
      if (timeLeft > 0 && !gameOver) {
        setTimeLeft((prev) => prev - 1);
      } else {
        clearInterval(timer);
        setGameOver(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [gameOver, timeLeft]);

  
  const handleBoxClick = (boxNumber) => {
    if (gameOver) return; 

    if (boxNumber === currentBox && isVisible) {
      setScore((prev) => prev + 5); 
    } else {
      setScore((prev) => prev - 2.5); 
    }
  };

  return (
    <>
      <div className={KeywordStyle.scoreBoard}>
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft}s</p>
      </div>
      <div className={KeywordStyle.gameContainer}>


        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className={KeywordStyle[`box${index + 1}`]}
            onClick={() => handleBoxClick(index + 1)}
          >
            {currentBox === index + 1 && isVisible ? "HIT" : ""}
          </div>
        ))}

        {gameOver && (
          <div className={KeywordStyle.gameOver}>
            <p>Game Over!</p>
            <p>Your Final Score: {score}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default KeywordGame;
