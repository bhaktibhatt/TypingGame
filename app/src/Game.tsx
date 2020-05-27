import * as React from "react";
import {
  GameContainer,
  WordContainer,
  TimerContainer,
  ProgressBar,
  ProgressBarContainer,
  StartButton,
  DadContainer,
  TransparentBackground,
  Points,
  GameOverScreen,
  GameOverHeader,
  GameOverScore,
  PlayerName,
} from "./Game-style";
import Keyboard from "./components/Keyboard";
import Word from "./components/Word";
import { UserState } from "./UserState";

interface Props {
  readonly isPlayer: boolean;
  readonly playerState: UserState;
  readonly sendUpdate: (index: number, pressed: string) => void;
}

interface State {
  readonly pressedLetters: string;
  readonly currentTime: number;
  readonly startTime: number;
  readonly showStart: boolean;
  readonly points: number;
  readonly isGamePlaying: boolean;
  readonly isGameOver: boolean;
  readonly setShake: boolean;

  pressedChar: Set<string>;
}

export default class Game extends React.Component<Props, State> {
  public state: State = {
    pressedLetters: "",
    currentTime: 0,
    startTime: 0,
    showStart: true,
    points: 0,
    isGamePlaying: false,
    setShake: false,
    isGameOver: false,
    pressedChar: new Set(),
  };

  public timer: number | undefined = undefined;

  handleKeyPress = (e: KeyboardEvent) => {
    // this.setState({ pressedChar: e.key });
    this.setState({ pressedChar: this.state.pressedChar.add(e.key) }, () =>
      this.sendUpdate()
    );
    if (this.handlePressedChar !== undefined) {
      this.handlePressedChar(e.key);
    }
  };

  handleKeyUp = (e: KeyboardEvent) => {
    // this.setState({ pressedChar: "" });
    const newSet = new Set<string>(this.state.pressedChar);
    newSet.delete(e.key);
    this.setState(
      {
        pressedChar: newSet,
      },
      () => this.sendUpdate()
    );
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    const { index } = this.props.playerState;
    // console.log("-----start-----");

    // console.log("prevIndex", prevProps.playerState.index);

    // console.log("index", index);
    // console.log("-----end-----");

    if (prevProps.playerState.index !== index && index === 0) {
      this.setState(
        {
          pressedLetters: "",
        },
        () => this.forceUpdate()
      );
    }

    if (
      prevState.currentTime !== this.state.currentTime &&
      this.state.currentTime >= 60
    ) {
      this.endTimer();
    }
  };

  componentDidMount = () => {
    if (this.props.isPlayer) {
      window.addEventListener("keypress", (e) => {
        if (!this.state.showStart) this.handleKeyPress(e);
      });
      window.addEventListener("keyup", (e) => {
        if (!this.state.showStart) this.handleKeyUp(e);
      });
    }
  };

  private sendUpdate = () => {
    const { pressedLetters, pressedChar } = this.state;
    const { index } = this.props.playerState;
    let retIndex = pressedLetters.length;

    const pressed = Array.from(pressedChar).reduce((pv, nv) => pv + nv, "");

    this.props.sendUpdate(retIndex, pressed);
  };

  private handlePressedChar = (char: string) => {
    const { pressedLetters } = this.state;
    const currentWord = this.props.playerState.currentWord;

    const nextLetter = currentWord.slice(
      pressedLetters.length,
      pressedLetters.length + 1
    );

    if (char !== nextLetter) {
      this.setState({ setShake: true }, () =>
        setTimeout(() => this.setState({ setShake: false }), 50)
      );
      return;
    }

    this.setState(
      {
        setShake: false,
        pressedLetters: this.state.pressedLetters + nextLetter,
      },
      this.sendUpdate
    );
  };

  private startTimer = () => {
    this.setState({
      currentTime: this.state.currentTime,
      startTime: Date.now() - this.state.currentTime,
    });

    if (this.timer === undefined) {
      this.timer = setInterval(
        () => this.setState({ currentTime: this.state.currentTime + 1 }),
        1000
      );
    }
  };

  private endTimer = () => {
    clearInterval(this.timer);
    this.setState({ isGameOver: true });
  };

  private startGame = () => {
    this.setState({ showStart: false, isGamePlaying: true }, () =>
      this.forceUpdate()
    );

    this.startTimer();
  };

  componentWillUnmount = () => {
    this.endTimer();

    window.removeEventListener("keypress", (e) => this.handleKeyPress(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  };

  render() {
    let {
      currentTime,
      showStart,
      setShake,
      pressedLetters,
      pressedChar,
      isGameOver,
    } = this.state;
    const { playerState, isPlayer } = this.props;
    const { currentWord, score, index } = playerState;

    if (!isPlayer) {
      pressedChar = new Set();
      playerState.pressed.split("").forEach((l) => pressedChar.add(l));
    }

    return (
      <DadContainer>
        {showStart && isPlayer && (
          <>
            <StartButton onClick={() => this.startGame()}>Start</StartButton>
            <TransparentBackground />
          </>
        )}

        {isGameOver ? (
          <>
            <GameOverScreen>
              <GameOverHeader>Scores</GameOverHeader>
              <GameOverScore>
                <PlayerName>{playerState.userID}</PlayerName>
                <div>{score}</div>
              </GameOverScore>
            </GameOverScreen>
            <TransparentBackground />
          </>
        ) : (
          <GameContainer>
            <TimerContainer>
              <Points>
                Points: {score} || {playerState.userID}
              </Points>
              <ProgressBarContainer>
                <ProgressBar progress={currentTime / 60}></ProgressBar>
              </ProgressBarContainer>
            </TimerContainer>
            <WordContainer>
              <Word setShake={setShake} pressedLetters={index}>
                {currentWord}
              </Word>
            </WordContainer>
            <Keyboard startPressEvent={!showStart} pressedChar={pressedChar} />
          </GameContainer>
        )}
      </DadContainer>
    );
  }
}
