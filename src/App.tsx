import * as React from "react";
import Game from "./Game";
import "./styles.css";

function getWordList(): string[] {
  return ["name", "might", "family", "below", "talk", "live"];
}

export default function App() {
  return (
    <div className="App">
      <Game words={getWordList()} />
    </div>
  );
}
