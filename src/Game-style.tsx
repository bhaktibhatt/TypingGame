import styled from "styled-components";

export const GameContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 36px;
`;

export const WordContainer = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 36px;

  margin-bottom: 8px;
`;

export const TimerContainer = styled.div`
width: 50%;
height: 40px;


font-size: 24px;
margin-bottom: 16px;


align-self: right;


`;

export const ProgressBarContainer =  styled.div`

width: 100%;
height: 40px;

color: white;

background-color: #3f3f44;

`;

export const ProgressBar =  styled.div<{progress: number}>`

width: calc( ${p => p.progress} * 100%);
height: 40px;


background-color: #f40552;

`;