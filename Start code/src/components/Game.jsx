import React, { useState } from 'react';

const Entity = ({ health, name }) => {
  return (
    <section className="container">
      <h2>{name} Health</h2>
      <div className="healthbar">
        <div
          style={{
            width: `${health}%`,
          }}
          className="healthbar__value"
        />
      </div>
    </section>
  );
};

const GameOver = ({ title, restartGame }) => {
  return (
    <section id="game-over" className="container">
      <h2>Game Over!</h2>
      <h3>{title}</h3>
      <button onClick={restartGame}>Start New Game</button>
    </section>
  );
};

const Log = ({ logs }) => {
  return (
    <section id="log" className="container">
      <h2>Battle Log</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <span>{log.isPlayer ? 'Player' : 'Monster'}</span>
            <span>
              {log.text}{' '}
              <span
                className={log.isDammage ? 'log--damage' : 'log--heal'}
              >
                {log.value}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const Game = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);
  const [turn, setTurn] = useState(0);

  const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const updateBars = () => {
    setPlayerHealth((prev) => Math.min(prev, 100));
    setMonsterHealth((prev) => Math.min(prev, 100));
  };

  const writeLog = (isPlayer, isDamage, text, value) => {
    setLogs((prevLogs) => [
      ...prevLogs,
      { isPlayer, isDammage: isDamage, text, value },
    ]);
  };

  const endGame = (playerWon) => {
    setGameOver(true);
    setPlayerWon(playerWon);
  };

  const resetGame = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setTurn(0);
    setGameOver(false);
  };

  const monsterAttack = () => {
    const damage = getRandom(8, 15);
    setPlayerHealth((prev) => Math.max(prev - damage, 0));
    writeLog(false, true, 'attacked', damage);
  };

  const attack = (isSpecial = false) => {
    const damage = isSpecial ? getRandom(10, 25) : getRandom(5, 12);
    setMonsterHealth((prev) => Math.max(prev - damage, 0));
    writeLog(true, true, isSpecial ? 'used special attack' : 'attacked', damage);
    monsterAttack();
    setTurn((prev) => prev + 1);
    updateBars();
    checkEnd();
  };

  const heal = () => {
    const healValue = getRandom(8, 20);
    setPlayerHealth((prev) => Math.min(prev + healValue, 100));
    writeLog(true, false, 'healed', healValue);
    monsterAttack();
    setTurn((prev) => prev + 1);
    updateBars();
    checkEnd();
  };

  const suicide = () => {
    setPlayerHealth(0);
    updateBars();
    checkEnd();
  };

  const checkEnd = () => {
    if (playerHealth <= 0 || monsterHealth <= 0) {
      endGame(playerHealth > 0);
    }
  };

  return (
    <div className="game">
      <Entity name="Monster" health={monsterHealth} />
      <Entity name="Player" health={playerHealth} />

      {gameOver && (
        <GameOver
          title={playerWon ? 'You won!' : 'You lost!'}
          restartGame={resetGame}
        />
      )}

      <section id="controls">
        <button onClick={() => attack()}>ATTACK</button>
        <button onClick={() => (turn % 3 === 0 ? attack(true) : null)}>
          SPECIAL !
        </button>
        <button onClick={heal}>HEAL</button>
        <button onClick={suicide}>KILL YOURSELF</button>
      </section>

      <Log logs={logs} />
    </div>
  );
};

export default Game;
