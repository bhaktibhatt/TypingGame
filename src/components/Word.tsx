import * as React from "react";

interface Props {
  readonly pressedLetters: string;
  readonly children: string;
}

export default class Word extends React.Component<Props> {
  checkLetter(key: number, letter: string, letterArray: string[]) {
    // const {pressedLetters, updatePressedLetters} = this.props;

    return true;
    // if ((pressedLetters.substr(-1) === letterArray[pointer]) && pointer === key) {
    //   // this.setState(prevState => { return {pointer: prevState.pointer + 1}});
    //   return true;
    // } else {
    //   updatePressedLetters(pressedLetters);
    //   return false;
    // }
  }

  render() {
    const { children, pressedLetters } = this.props;

    const letterArray = children.split("").map((letter, i) => {
      return { letter, isPressed: i < pressedLetters.length };
    });

    console.log(letterArray);

    return (
      <div>
        <div style={{ display: "flex" }}>
          {letterArray?.map((letter, key) => {
            return (
              <div key={key} style={{fontWeight:"bold",color: letter.isPressed ? "red" : "black" }}>{letter.letter}</div>
            )
            }
          )}
        </div>
      </div>
    );
  }
}
