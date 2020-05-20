import styled from "styled-components";

export const KeyboardContainer = styled.div`
  border: 12px solid #8394a1;

  padding: 12px;
  border-radius: 4px;

  background-color: #95a3ae;

  margin-top: 36px;
`;

export const KeyboardRow = styled.div<{ row: number }>`
  display: grid;
  grid-template-columns: repeat(10, 70px);

  margin-left: ${p => p.row * 20}px;
`;
