import * as React from "react";
import { KeyboardContainer, KeyboardRow } from "./Keyboard-style";
import Key from "./Key";

interface Props {
  handlePressedChar: (char: string) => void;
}

interface State {
  pressedChar: Set<string>;
}

export default class Keyboard extends React.Component<Props, State> {
  public state: State = {
    pressedChar: new Set()
  };

  handleKeyPress = (e: KeyboardEvent) => {
    // this.setState({ pressedChar: e.key });
    this.setState({ pressedChar: this.state.pressedChar.add(e.key) });
    this.props.handlePressedChar(e.key);
  };

  handleKeyUp = (e: KeyboardEvent) => {
    // this.setState({ pressedChar: "" });
    const newSet = new Set<string>(this.state.pressedChar);
    newSet.delete(e.key);
    this.setState({
      pressedChar: newSet
    });
  };

  componentDidMount() {
    window.addEventListener("keypress", e => this.handleKeyPress(e));
    window.addEventListener("keyup", e => this.handleKeyUp(e));
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", e => this.handleKeyPress(e));
    window.addEventListener("keyup", e => this.handleKeyUp(e));
  }

  render() {
    const characters: string[][] = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
      ["z", "x", "c", "v", "b", "n", "m", ",", "."]
    ];
    return (
      <KeyboardContainer>
        {characters.map((characterList, i) => {
          return (
            <KeyboardRow key={characterList[0]} row={i}>
              {characterList.map(character => {
                return (
                  <Key
                    pressedChars={this.state.pressedChar}
                    key={character}
                    character={character}
                  />
                );
              })}
            </KeyboardRow>
          );
        })}
      </KeyboardContainer>
    );
  }
}
