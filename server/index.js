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
    updateGameState(userID, data.index, data.pressed, socket);
    emitGameState(socket);
  });
});

const updateGameState = (userID, index, pressed, socket) => {
  const userIndex = gameState.findIndex((u) => u.userID === userID);
  if (userIndex === -1) return;

  if (index === gameState[userIndex].currentWord.length) {
    updateWord(userID, pressed);
    console.log("gamestate", gameState);
    io.emit("clear", { user: userID, serverGameState: gameState });
  } else {
    gameState[userIndex] = {
      ...gameState[userIndex],
      index,
      pressed,
    };
  }
};

const getWordList = () => {
  const wordsString = readTextFile("./assets/1000.txt");
  const words = wordsString.split(/\r?\n/);
  return words;
};

const readTextFile = (file) => {
  var fs = require("fs");
  var words;
  words = fs.readFileSync("./assets/1000.txt", "utf-8");

  return words;
};

let wordList = getWordList();

const getRandomWord = () => {
  const randIndex = Math.floor(Math.random() * (wordList.length - 1));
  const word = wordList[randIndex];
  return word;
};

let gameState = [];

const addUserToGame = (socket, userID) => {
  gameState.push({
    userID,
    score: 0,
    pressed: "",
    currentWord: getRandomWord(),
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
  io.emit("stateChange", gameState);
};

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

const updateWord = (userID, pressed) => {
  const userIndex = gameState.findIndex((u) => u.userID === userID);
  if (userIndex === -1) return;

  const currentWord = getRandomWord();

  gameState[userIndex] = {
    ...gameState[userIndex],
    currentWord,
    index: 0,
    pressed,
  };
};
