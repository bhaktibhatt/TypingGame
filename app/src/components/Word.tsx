import * as React from "react";
import { WordContainer } from "./Word-style";

interface Props {
  readonly pressedLetters: string;
  readonly children: string;
  readonly setShake: boolean;
}

export default class Word extends React.Component<Props> {
  render() {
    const { children, pressedLetters, setShake } = this.props;

    const letterArray = children.split("").map((letter, i) => {
      return { letter, isPressed: i < pressedLetters.length };
    });

    return (
      <div>
        <WordContainer
          wrongLetterPressed={setShake}
          style={{ display: "flex" }}
        >
          {letterArray?.map((letter, key) => {
            if (letter.letter === " ") {
              return <div style={{ marginRight: 12 }}></div>;
            } else {
              return (
                <div
                  key={key}
                  style={{
                    fontWeight: "bold",
                    color: letter.isPressed ? "#79d70f" : "black",
                    // textDecoration: letter.isPressed ? "line-through" : "none",
                  }}
                >
                  {letter.letter}
                </div>
              );
            }
          })}
        </WordContainer>
      </div>
    );
  }
}
