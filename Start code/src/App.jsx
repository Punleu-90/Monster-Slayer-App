import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";

function App() {
  return (
    <div>
      <Header gameName="Monster Slayer" />
      <Game />
    </div>
  );
}

export default App;
