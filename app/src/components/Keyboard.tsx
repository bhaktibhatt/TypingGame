import * as React from "react";
import { KeyboardContainer, KeyboardRow } from "./Keyboard-style";
import Key from "./Key";

interface Props {
  startPressEvent: boolean;
  pressedChar: Set<string>;
}

interface State {}

export default class Keyboard extends React.Component<Props, State> {
  render() {
    const characters: string[][] = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
      ["z", "x", "c", "v", "b", "n", "m", ",", "."],
    ];
    return (
      <KeyboardContainer>
        {characters.map((characterList, i) => {
          return (
            <KeyboardRow key={characterList[0]} row={i}>
              {characterList.map((character) => {
                return (
                  <Key
                    pressedChars={this.props.pressedChar}
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
