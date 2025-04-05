import React from "react";

function GameOver({ gameResult, restartGame }) {
  return (
    <div>
      <h2>Game Over!</h2>
      <h3 style={{ display: gameResult === "lost" ? "block" : "none" }}>You lost!</h3>
      <h3 style={{ display: gameResult === "won" ? "block" : "none" }}>You won!</h3>
      <button onClick={restartGame}>Start New Game</button>
    </div>
  );
}

export default GameOver;
