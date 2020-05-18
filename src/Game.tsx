import * as React from "react";
import { GameContainer, WordContainer, TimerContainer, ProgressBar, ProgressBarContainer } from "./Game-style";
import Keyboard from "./components/Keyboard";
import Word from "./components/Word";

interface Props {
  readonly words: string[];
}

interface State {
  readonly pressedLetters: string;
  readonly currentWord: number;
   currentTime: number;
   startTime : number;

}

export default class Game extends React.Component<Props, State> {
  public state: State = {
    pressedLetters: "",
    currentWord: Math.floor(Math.random() * this.props.words.length),
    currentTime: 0,
    startTime: 0
  };

  public timer : number | undefined = undefined;

  private shuffleWord = () => {
    const { words } = this.props;

    this.setState({
      currentWord: (this.state.currentWord + 1) % words.length,
      pressedLetters: ""
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
      return;
    }
    if (pressedLetters.length === curWord.length - 1) {
      this.shuffleWord();
    } else {
      this.setState({ pressedLetters: this.state.pressedLetters + nextLetter });
    }
  };

  public startTimer = () => {
    this.setState({
      currentTime: this.state.currentTime,
      startTime: Date.now() - this.state.currentTime
    })

    this.timer = setInterval(() => this.setState({currentTime: this.state.currentTime + 1}), 1000);
  }

  public endTimer = () => {
    clearInterval(this.timer);
  }

  componentDidMount = () => {
    this.startTimer();
  }

  componentDidUnmount = () => {
    this.endTimer();
  }

  

  render() {
    const { words } = this.props;
    const { currentWord, currentTime } = this.state;

    if (currentTime >= 60) {
      this.endTimer();
    }
    
    return (
      <GameContainer>
        <TimerContainer >
      <ProgressBarContainer>
      <ProgressBar progress={currentTime / 60}>
          45
          </ProgressBar>

      </ProgressBarContainer>
          
          
        </TimerContainer>
        <WordContainer>
          <Word pressedLetters={this.state.pressedLetters}>
            {words[currentWord]}
          </Word>
        </WordContainer>
        <Keyboard handlePressedChar={this.handlePressedChar} />
      </GameContainer>
    );
  }
}
