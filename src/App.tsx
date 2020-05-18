import * as React from "react";
import Game from "./Game";
import "./styles.css";

function getWordList(): string[] {
  return readTextFile("/assets/1000.txt");
}

function readTextFile(file: string) : string[]{
  var rawFile = new XMLHttpRequest();
  var words : string[] = [];
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText;
        words = allText.split("\n").map(word => word.replace(/\W/g, ''));
      }
    }
  };
  rawFile.send(null);
  return(words);
};

export default function App() {
  return (
    <div className="App">
      <Game words={getWordList()} />
    </div>
  );
}
