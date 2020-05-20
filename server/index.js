var app = require("express")();
var http = require("http").createServer(app);

const socketIo = require("socket.io");
const io = socketIo(http);

http.listen(4000, () => {
  console.log("listening on *:4000");
});

let userIDNum = 1;
io.on("connection", (socket) => {
  const userID = "User" + userIDNum++;
  console.log(userID + " connected");
  onConnected(socket, userID);
  socket.on("disconnect", () => {
    removeUserFromGame(userID);
    console.log(userID + " disconnected");
  });

  socket.on("joined", () => {
    console.log("Client joined");
    addUserToGame(socket, userID);
  });

  socket.on("update", (data) => {
    console.log("Update", userID, data.index, data.pressed);
    updateGameState(userID, data.index, data.pressed);
    emitGameState(socket);
  });
});

const updateGameState = (userID, index, pressed) => {
  const userIndex = gameState.findIndex((u) => u.userID === userID);
  if (userIndex === -1) return;

  gameState[userIndex] = {
    ...gameState[userIndex],
    index,
    pressed,
  };
};

let gameState = [];

const addUserToGame = (socket, userID) => {
  gameState.push({
    userID,
    score: 0,
    pressed: "",
    currentWord: "first",
    index: 0,
  });

  console.log("After push", gameState.length);

  emitGameState(socket);
};

const removeUserFromGame = (userID) => {
  const userIndex = gameState.findIndex((u) => u.userID === userID);
  if (userIndex === -1) return;
  gameState.splice(userIndex, 1);
  console.log("After splice", gameState.length);
};

const emitGameState = (socket) => {
  socket.broadcast.emit("stateChange", gameState);
};

// UserState {
//   userID: string; // random ass string
//   score: number;
//   pressed: string;
//   currentWord: string;
//   index: number;
// }

// interface Update {
//   index: number,
//   pressed: string
// }

const onConnected = (socket, userID) => {
  // send the client a "room id" and their userID

  socket.emit("setup", {
    roomID: "room1",
    userID,
  });

  // wait for client to respond that it joined the room
  // send the client "state" packets
  // client sends update packets
};
