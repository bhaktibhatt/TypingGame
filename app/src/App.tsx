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

type GameState = UserState[];

export default function App() {
  const socket = useMemo(() => socketIOClient(ENDPOINT), []);
  const [userID, setUserID] = useState<string>("");
  const [roomID, setRoomID] = useState<string>("");
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);

  useEffect(() => {
    socket.on("stateChange", (state: GameState) => {
      setGameState(state);
    });
  }, []);

  useEffect(() => {
    socket.on("setup", (data: { roomID: string; userID: string }) => {
      setRoomID(data.roomID);
      setUserID(data.userID);
      socket.emit("joined");
    });
  }, []);

  useEffect(() => {
    socket.on(
      "nutlope",
      ({
        userID,
        serverGameState,
      }: {
        userID: string;
        serverGameState: GameState;
      }) => {
        if (serverGameState !== undefined) {
          const userIndex = serverGameState.findIndex(
            (u) => u.userID === userID
          );
          if (userIndex === -1) return;
          serverGameState[userIndex].index = 0;
          serverGameState[userIndex].pressed = "";

          console.log("Server State", serverGameState);
          //setKeyPressed((previousState) => new Set(previousState).add(ev.key));
          setGameState((prevState) => serverGameState);
        } else {
          console.log("undefined game state");
        }
      }
    );
  }, []);

  console.log("outside", gameState);

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
