import * as React from "react";

import { KeyContainer } from "./Key-style";

interface Props {
  character: string;
  pressedChars: Set<string>;
}

interface State {
  isPressed: boolean;
}

export default class Key extends React.Component<Props, State> {
  public state: State = {
    isPressed: false
  };

  public componentDidUpdate() {
    // creator of jank: Jason
    // this jank is just so you can see yourself typing.
    // omg its horrible please fix me at some point
    if (
      this.props.pressedChars.has(this.props.character) &&
      !this.state.isPressed
    ) {
      this.setState({ isPressed: true });
    } else {
      setTimeout(() => {
        if (
          !this.props.pressedChars.has(this.props.character) &&
          this.state.isPressed
        ) {
          this.setState({ isPressed: false });
        }
      }, 75);
    }
  }

  public render(): React.ReactNode {
    const { character } = this.props;
    const { isPressed } = this.state;

    return <KeyContainer pressed={isPressed}>{character}</KeyContainer>;
  }
}
