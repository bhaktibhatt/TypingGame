import * as React from "react";

interface Props {
  readonly pressedLetters: string;
  readonly children: string;
}

export default class Word extends React.Component<Props> {
  render() {
    const { children, pressedLetters } = this.props;

    const letterArray = children.split("").map((letter, i) => {
      return { letter, isPressed: i < pressedLetters.length };
    });

    return (
      <div>
        <div style={{ display: "flex" }}>
          {letterArray?.map((letter, key) => {
            return (
              <div
                key={key}
                style={{
                  fontWeight: "bold",
                  color: letter.isPressed ? "red" : "black",
                }}
              >
                {letter.letter}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
