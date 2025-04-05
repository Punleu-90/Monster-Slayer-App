import React, { useState } from "react";
import Entity from "./Entity";
import Log from "./Log";
import GameOver from "./GameOver";

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Game() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState("");

  const playerHealthPercentage = (health) => Math.max(0, Math.min(100, health));
  const monsterHealthPercentage = (health) => Math.max(0, Math.min(100, health));

  const writeLog = (who, what, value) => {
    setLogs((prevLogs) => [
      { who, what, value },
      ...prevLogs,
    ]);
  };

  const endGame = (playerWon) => {
    setGameOver(true);
    setGameResult(playerWon ? "won" : "lost");
  };

  const resetGame = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setGameOver(false);
  };

  const attack = (isSpecial = false) => {
    const damage = isSpecial ? getRandomValue(10, 25) : getRandomValue(5, 12);
    setMonsterHealth((prev) => Math.max(0, prev - damage));
    writeLog("Player", isSpecial ? "used special attack" : "attacked", damage);

    const monsterDamage = getRandomValue(8, 15);
    setPlayerHealth((prev) => Math.max(0, prev - monsterDamage));
    writeLog("Monster", "attacked", monsterDamage);

    checkEnd();
  };

  const heal = () => {
    const healValue = getRandomValue(8, 20);
    setPlayerHealth((prev) => Math.min(100, prev + healValue));
    writeLog("Player", "healed", healValue);

    const monsterDamage = getRandomValue(8, 15);
    setPlayerHealth((prev) => Math.max(0, prev - monsterDamage));
    writeLog("Monster", "attacked", monsterDamage);

    checkEnd();
  };

  const suicide = () => {
    setPlayerHealth(0);
    writeLog("Player", "committed suicide", 0);
    checkEnd();
  };

  const checkEnd = () => {
    if (playerHealth <= 0 || monsterHealth <= 0) {
      endGame(playerHealth > 0);
    }
  };

  return (
    <div>
      {/* Monster Health */}
      <section className="container">
        <h2>Monster Health</h2>
        <div className="healthbar">
          <div
            className="healthbar__value"
            style={{ width: `${monsterHealthPercentage(monsterHealth)}%` }}
          />
        </div>
      </section>

      {/* Player Health */}
      <section className="container">
        <h2>Your Health</h2>
        <div className="healthbar">
          <div
            className="healthbar__value"
            style={{ width: `${playerHealthPercentage(playerHealth)}%` }}
          />
        </div>
      </section>

      {/* GameOver Component */}
      {gameOver && (
        <section id="game-over" className="container">
          <h2>Game Over!</h2>
          <h3 id="game-over-lost" style={{ display: gameResult === "lost" ? "block" : "none" }}>
            You lost!
          </h3>
          <h3 id="game-over-win" style={{ display: gameResult === "won" ? "block" : "none" }}>
            You won!
          </h3>
          <button id="restart-btn" onClick={resetGame}>
            Start New Game
          </button>
        </section>
      )}

      {/* Controls */}
      <section id="controls">
        <button onClick={() => attack()}>ATTACK</button>
        <button onClick={() => attack(true)}>SPECIAL !</button>
        <button onClick={heal}>HEAL</button>
        <button onClick={suicide}>KILL YOURSELF</button>
      </section>

      {/* Battle Log */}
      <section id="log" className="container">
        <h2>Battle Log</h2>
        <Log logs={logs} />
      </section>
    </div>
  );
}

export default Game;
