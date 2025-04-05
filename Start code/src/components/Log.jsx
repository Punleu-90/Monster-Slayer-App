import React from "react";

function Log({ logs }) {
  return (
    <div>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <span className={log.who === "Player" ? "log--player" : "log--monster"}>
              {log.who}
            </span>
            <span> {log.what} for </span>
            <span className={log.what.includes("heal") ? "log--heal" : "log--damage"}>
              {log.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Log;
