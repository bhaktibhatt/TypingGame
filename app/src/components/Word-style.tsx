import styled from "styled-components";

export const WordContainer = styled.div<{ wrongLetterPressed: boolean }>`
  ${(p) =>
    p.wrongLetterPressed
      ? `animation-name: shake;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    transform-origin: 50% 100%;`
      : ""}

  @keyframes shake {
    0% {
      transform: translate(2px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-2deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(3deg);
    }
    30% {
      transform: translate(0px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(2px, 1px) rotate(-2deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(4deg);
    }
    90% {
      transform: translate(2px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;
