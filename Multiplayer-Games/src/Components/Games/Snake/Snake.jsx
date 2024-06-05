// src/SnakeGame.js

import { useState, useEffect, useRef } from "react";
import "./Snake.css";

const SnakeGame = () => {
  const [snake, setSnake] = useState([
    [5, 5],
    [5, 4],
    [5, 3],
  ]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const handlePaused = () => {
    if (paused) {
      setPaused(false);
      startGame();
    } else {
      setPaused(true);
      clearInterval(intervalRef.current);
    }
  };

  const resetGame = () => {
    setSnake([
      [5, 5],
      [5, 4],
      [5, 3],
    ]);
    setFood([10, 10]);
    setDirection("RIGHT");
    setGameOver(false);
    setGameStarted(false);
    setScore(0);
    setPaused(false);
    clearInterval(intervalRef.current);
    document.body.classList.remove("no-scroll");
  };

  const startGame = () => {
    document.body.classList.add("no-scroll");
    intervalRef.current = setInterval(moveSnake, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) {
        if (e.key === "Enter") {
          setGameStarted(true);
          startGame();
        }
        return;
      }

      if (paused) return;

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameStarted, paused]);

  useEffect(() => {
    if (!gameStarted || gameOver || paused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = newSnake[0];

        let newHead;
        switch (direction) {
          case "UP":
            newHead = [head[0], head[1] - 1];
            break;
          case "DOWN":
            newHead = [head[0], head[1] + 1];
            break;
          case "LEFT":
            newHead = [head[0] - 1, head[1]];
            break;
          case "RIGHT":
            newHead = [head[0] + 1, head[1]];
            break;
          default:
            break;
        }

        newSnake.unshift(newHead);

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood([
            Math.floor(Math.random() * 20),
            Math.floor(Math.random() * 20),
          ]);
          setScore(score + 1);
        } else {
          newSnake.pop();
        }

        if (
          newHead[0] < 0 ||
          newHead[0] >= 20 ||
          newHead[1] < 0 ||
          newHead[1] >= 20 ||
          newSnake.slice(1).some(
            (segment) => segment[0] === newHead[0] && segment[1] === newHead[1]
          )
        ) {
          setGameOver(true);
          clearInterval(intervalRef.current);
          document.body.classList.remove("no-scroll");
        }

        return newSnake;
      });
    };

    intervalRef.current = setInterval(moveSnake, 200);
    return () => clearInterval(intervalRef.current);
  }, [direction, food, gameOver, gameStarted, paused, score]);

  return (
    <div className="snake-game-container">
      <h1 className="titleSnake">Snake Game</h1>
      <div className="gameArea">
        <div className="board">
          {gameOver && <div className="game-over">Game Over</div>}
          {Array.from({ length: 20 }, (_, row) => (
            <div key={row} className="row-snake">
              {Array.from({ length: 20 }, (_, col) => (
                <div
                  key={col}
                  className={`cell ${
                    snake.some(
                      (segment) => segment[0] === col && segment[1] === row
                    )
                      ? "snake"
                      : ""
                  } ${food[0] === col && food[1] === row ? "food" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="info">
          <div className="score">
            Score: <span>{score}</span>
          </div>
          {!gameStarted && !gameOver && (
            <>
              <button
                className="reset"
                onClick={() => {
                  setGameStarted(true);
                  startGame();
                }}
              >
                Start
              </button>
              <div className="start-message">Press Enter to Start</div>
            </>
          )}
          {gameStarted && !gameOver && (
            <>
              <button className="reset" onClick={handlePaused}>
                {paused ? "Resume" : "Pause"}
              </button>
            </>
          )}
          {gameOver && (
            <button className="reset" onClick={resetGame}>
              Restart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
