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

export const DadContainer = styled.div``;

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
  width: 90%;
  height: 40px;

  font-size: 24px;
  margin-bottom: 16px;

  align-self: right;

  display: flex;
  justify-content: space-between;
`;

export const ProgressBarContainer = styled.div`
  width: 50%;
  height: 40px;

  color: white;

  background-color: #3f3f44;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: calc(${(p) => p.progress} * 100%);
  height: 40px;

  background-color: #f40552;
`;

export const StartButton = styled.div`
  width: 120px;
  height: 60px;

  border-radius: 8px;
  background: #21d16c;

  color: white;
  font-size: 28px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  position: absolute;
  top: 40%;
  margin-top: -30px;
  left: 50%;
  margin-left: -60px;

  z-index: 5;
`;

export const TransparentBackground = styled.div`
  width: 100%;
  height: 500px;
  background-color: #00000099;

  position: absolute;
`;

export const Points = styled.div`
  font-weight: 600;
`;
