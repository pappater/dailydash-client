import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const DinosaurRunner = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isJumping, setIsJumping] = useState(0); // 0 = no jump, 1 = single jump, 2 = double jump
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [gameSpeed, setGameSpeed] = useState(5);

  const dinoRef = useRef(null);
  const gameRef = useRef(null);

  // Jump logic with double jump support
  const jump = useCallback(() => {
    if (isJumping < 2 && gameStarted && !gameOver) {
      setIsJumping(isJumping + 1);
      const jumpHeight = isJumping === 1 ? '-100px' : '-50px'; // Double jump goes higher
      if (dinoRef.current) {
        dinoRef.current.style.animation = 'none';
        dinoRef.current.offsetHeight; // Trigger reflow
        dinoRef.current.style.animation = `jump 0.5s forwards`;
        dinoRef.current.style.transform = `translateY(${jumpHeight})`;
      }
      setTimeout(() => {
        if (isJumping === 1) setIsJumping(0); // Reset jump after single jump
        else setIsJumping(1); // Reset to single jump after double jump
      }, 500);
    }
  }, [isJumping, gameStarted, gameOver]);

  // Create obstacle with random properties
  const createObstacle = useCallback(() => {
    const types = ['small', 'large', 'flying'];
    const type = types[Math.floor(Math.random() * types.length)];
    let height, y;
    switch (type) {
      case 'small':
        height = 40;
        y = 0;
        break;
      case 'large':
        height = 60;
        y = 0;
        break;
      case 'flying':
        height = 30;
        y = 50;
        break;
      default:
        height = 40;
        y = 0;
    }
    return { x: 300, y, height, type };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!gameStarted) {
          setGameStarted(true);
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump, gameStarted]);

  useEffect(() => {
    let gameLoop;
    let obstacleInterval;

    if (gameStarted && !gameOver) {
      gameLoop = setInterval(() => {
        setObstacles(prevObstacles => {
          return prevObstacles
            .map(obs => ({ ...obs, x: obs.x - gameSpeed }))
            .filter(obs => obs.x > -20); // Keep obstacles visible till they go out of screen
        });

        setScore(prevScore => prevScore + 1);

        if (score > 0 && score % 100 === 0) {
          setGameSpeed(prevSpeed => Math.min(prevSpeed + 0.5, 20)); // Increase speed with score
        }

        // Collision detection
        const dino = dinoRef.current.getBoundingClientRect();
        obstacles.forEach(obs => {
          const obstacle = gameRef.current.querySelector(`.obstacle-${obs.type}`);
          if (obstacle) {
            const obsRect = obstacle.getBoundingClientRect();
            if (
              dino.right > obsRect.left &&
              dino.left < obsRect.right &&
              dino.bottom > obsRect.top &&
              dino.top < obsRect.bottom
            ) {
              setGameOver(true);
              setHighScore(prevHigh => Math.max(prevHigh, score));
            }
          }
        });
      }, 20);

      obstacleInterval = setInterval(() => {
        if (Math.random() < 0.5) {  // Increase the chance of obstacle spawning to 50%
          setObstacles(prev => [...prev, createObstacle()]);
        }
      }, 29);  // More frequent obstacle spawning every 500ms
    }

    return () => {
      clearInterval(gameLoop);
      clearInterval(obstacleInterval);
    };
  }, [gameStarted, gameOver, score, gameSpeed, obstacles, createObstacle]);

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setGameSpeed(5);
    setIsJumping(0);  // Reset jump state
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <style>{`
          @keyframes jump {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-50px); } // Adjusted jump height
          }
        `}</style>
        <div ref={gameRef} className="relative h-24 bg-white border-b-2 border-black overflow-hidden">
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg font-bold">Press Space to Start</p>
            </div>
          )}
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center">
                <p className="text-white text-lg font-bold mb-2">Game Over</p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={resetGame}
                >
                  Restart
                </button>
              </div>
            </div>
          )}
          <div 
            ref={dinoRef}
            className="absolute left-5 bottom-0 w-10 h-10 bg-black"
          />
          {obstacles.map((obs, index) => (
            <div
              key={index}
              className={`absolute bg-black obstacle-${obs.type}`}
              style={{ 
                left: `${obs.x}px`, 
                bottom: `${obs.y}px`,
                width: obs.type === 'small' ? '20px' : '30px',
                height: `${obs.height}px`
              }}
            />
          ))}
        </div>
        <div className="mt-4 text-right">
          <p className="text-sm font-mono">HI {highScore.toString().padStart(5, '0')}</p>
          <p className="text-sm font-mono">{score.toString().padStart(5, '0')}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DinosaurRunner;
