import styled, { css } from "styled-components";

interface Props {
  pressed: boolean;
}

export const KeyContainer = styled.div<Props>`
  width: 60px;
  height: 60px;

  border-radius: 8px;
  font-size: 19px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 2px;

  margin: 4px;

  background-color: #d1d7db;

  box-shadow: 1px 3px 5px #00000030;

  ${(p: Props) =>
    p.pressed &&
    css`
      background-color: #d1d7dbaa;
      transform: translateY(3px);
      box-shadow: 1px 2px 3px #00000060;
    `};

  transition: background-color 0.1s, transform 0.1s, box-shadow 0.1s;
`;
