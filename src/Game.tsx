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
} from "./Game-style";
import Keyboard from "./components/Keyboard";
import Word from "./components/Word";

interface Props {
  readonly words: string[];
}

interface State {
  readonly pressedLetters: string;
  readonly currentWord: number;
  currentTime: number;
  startTime: number;
  showStart: boolean;
  points: number;
  isGamePlaying: boolean;
  setShake: boolean;
}

export default class Game extends React.Component<Props, State> {
  public state: State = {
    pressedLetters: "",
    currentWord: Math.floor(Math.random() * this.props.words.length),
    currentTime: 0,
    startTime: 0,
    showStart: true,
    points: 0,
    isGamePlaying: false,
    setShake: false,
  };

  public timer: number | undefined = undefined;

  private shuffleWord = () => {
    const { words } = this.props;

    this.setState({
      currentWord: (this.state.currentWord + 1) % words.length,
      pressedLetters: "",
    });
  };

  private handlePressedChar = (char: string) => {
    const { words } = this.props;
    const { pressedLetters, currentWord } = this.state;

    const curWord = words[currentWord];

    const nextLetter = curWord.slice(
      pressedLetters.length,
      pressedLetters.length + 1
    );

    if (char !== nextLetter) {
      this.setState({ setShake: true }, () =>
        setTimeout(() => this.setState({ setShake: false }), 50)
      );
      return;
    }

    this.setState({ setShake: false });
    if (pressedLetters.length === curWord.length - 1) {
      // add point
      this.updateWord();
    } else {
      this.setState({ pressedLetters: this.state.pressedLetters + nextLetter });
    }
  };

  private updateWord = () => {
    this.setState({ points: this.state.points + 1 }, () => this.shuffleWord());
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

    // this.setState({ isGamePlaying: false });
  };

  private startGame = () => {
    this.setState({ showStart: false, isGamePlaying: true }, () =>
      this.forceUpdate()
    );

    this.startTimer();
  };

  componentWillUnmount = () => {
    this.endTimer();
  };

  render() {
    const { words } = this.props;
    const {
      currentWord,
      currentTime,
      showStart,
      points,
      setShake,
    } = this.state;

    if (currentTime >= 60) {
      this.endTimer();
    }

    return (
      <DadContainer>
        {showStart && (
          <>
            <StartButton onClick={() => this.startGame()}>Start</StartButton>
            <TransparentBackground />
          </>
        )}

        <GameContainer>
          <TimerContainer>
            <Points>Points: {points}</Points>
            <ProgressBarContainer>
              <ProgressBar progress={currentTime / 60}></ProgressBar>
            </ProgressBarContainer>
          </TimerContainer>
          <WordContainer>
            <Word
              setShake={setShake}
              pressedLetters={this.state.pressedLetters}
            >
              {words[currentWord]}
            </Word>
          </WordContainer>
          <Keyboard
            startPressEvent={!showStart}
            handlePressedChar={this.handlePressedChar}
          />
        </GameContainer>
      </DadContainer>
    );
  }
}
