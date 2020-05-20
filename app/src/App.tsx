import React, { useState, useEffect, useMemo } from "react";
import Game from "./Game";
import socketIOClient from "socket.io-client";
import { Layout } from "./App-Style";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import "./styles.css";
import { UserState } from "./UserState";

const ENDPOINT = "http://localhost:4000";

function getWordList(): string[] {
  return readTextFile("/assets/1000.txt");
}

function readTextFile(file: string): string[] {
  var rawFile = new XMLHttpRequest();
  var words: string[] = [];
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText;
        words = allText.split(/\r?\n/);
      }
    }
  };
  rawFile.send(null);
  return words;
}

type GameState = UserState[];

export default function App() {
  const socket = useMemo(() => socketIOClient(ENDPOINT), []);
  const [userID, setUserID] = useState<string>("");
  const [roomID, setRoomID] = useState<string>("");
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);

  useEffect(() => {
    socket.on("stateChange", (state: GameState) => {
      setGameState(state);
      console.log(state);
    });
  }, []);

  useEffect(() => {
    socket.on("setup", (data: { roomID: string; userID: string }) => {
      setRoomID(data.roomID);
      setUserID(data.userID);
      socket.emit("joined");
      console.log("Got user id", data.userID);
    });
  }, []);

  if (roomID === "" || gameState === undefined || gameState.length === 0) {
    return <div className="App">Connecting</div>;
  }

  // u stupid piece of garbage
  const result = gameState.map((player) => (
    <Game
      sendUpdate={(index, pressed) =>
        socket.emit("update", {
          index,
          pressed,
        })
      }
      isPlayer={player.userID === userID}
      playerState={player}
    />
  ));

  return <Layout>{result}</Layout>;

  // return (
  //   <div className="App">
  //     <Router>
  //       <Switch>
  //         <Route path="/game">
  //           <Game words={getWordList()} />
  //         </Route>
  //         <Route path="/">
  //           <Link to={`/game`}>{"Click here"}</Link>
  //         </Route>
  //       </Switch>
  //     </Router>
  //   </div>
  // );
}
