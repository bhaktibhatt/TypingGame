import * as React from "react";
import { GameContainer, WordContainer } from "./Game-style";
import Keyboard from "./components/Keyboard";
import Word from "./components/Word";

interface Props {
  readonly words: string[];
}

interface State {
  readonly pressedLetters: string;
  readonly currentWord: number;
}

export default class Game extends React.Component<Props, State> {
  public state: State = {
    pressedLetters: "",
    currentWord: Math.floor(Math.random() * this.props.words.length)  
  };

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

  render() {
    const { words } = this.props;
    const { currentWord } = this.state;

    return (
      <GameContainer>
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
