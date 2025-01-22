import React from "react";
import Board from "./components/Board";
import styled from "styled-components";

const Game: React.FC = () => {
  return (
    <Container>
      <h1>game component</h1>
      <Board />
    </Container>
  );
};

export default Game;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;
