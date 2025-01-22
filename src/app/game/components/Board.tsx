import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import Shape from "./Shape";
import { SHAPES } from "./shapes";
import { COLORS } from "./colors";

const EMPTY_BOARD = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];

export type ShapeType = {
  color: string;
  cells: number[][];
};

const NO_SHAPES: ShapeType[] = [];

const CELL_SIZE = 60; // set cell size px
const CELL_MARGIN = 2; // set cell margin px
const GRID_SIZE = 64; // set grid size px
const BOARD_SIZE = (CELL_SIZE + CELL_MARGIN) * EMPTY_BOARD.length; // set board width px

//big daddy function
const Board: React.FC = () => {
  const [shapes, setShapes] = useState(NO_SHAPES);
  const [board, setBoard] = useState(EMPTY_BOARD);

  // get the position of the shape and snap it to the grid
  const snapToGrid = (position: { x: number; y: number }) => {
    const x = Math.round(position.x / GRID_SIZE);
    const y = Math.round(position.y / GRID_SIZE);
    return { x, y };
  };

  const handleDrag =
    () => {}
  const handleDrop =
    (index: number) => (_: DraggableEvent, data: DraggableData) => {
      const x = data.x;
      const y = data.y + BOARD_SIZE;
      const snapped = snapToGrid({ x, y });
      console.log("Snapped position: ", snapped);
      const cells = shapes[index].cells;
      if (snapped.x < 0 || snapped.y < 0) return;
      if (snapped.x + cells[0].length > board[0].length) return;
      if (snapped.y + cells.length > board.length) return;
      for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[0].length; j++) {
          if (cells[i][j] === 1 && board[i + snapped.y][j + snapped.x] !== "") {
            return;
          }
        }
      }
      setBoard((prev) => {
        const newBoard = [...prev];
        cells.forEach((row, rowIndex) => {
          row.forEach((cell, cellIndex) => {
            const current =
              newBoard[rowIndex + snapped.y][cellIndex + snapped.x];
            if (cell === 1 && current === "") {
              newBoard[rowIndex + snapped.y][cellIndex + snapped.x] =
                shapes[index].color;
            }
          });
        });
        for (let i = 0; i < newBoard.length; i++) {
          if (newBoard[i].every((cell) => cell !== "")) {
            newBoard[i] = ["", "", "", "", "", "", "", ""];
          }
          if (newBoard.every((row) => row[i] !== "")) {
            newBoard.forEach((row) => (row[i] = ""));
          }
        }
        return newBoard;
      });
      setShapes((prev) => {
        const newShapes = [...prev];
        newShapes[index] = { cells: [], color: "#000" };
        if (newShapes.every((shape) => shape.cells.length === 0)) {
          return makeyShapey();
        }

        return newShapes;
      });
    };

  useEffect(() => {
    setShapes(makeyShapey());
  }, []);

  const SPAWN_POSITIONS = [
    { x: 0, y: 0 },
    { x: 200, y: 0 },
    { x: 400, y: 0 },
  ];

  return (
    <>
      <BoardContainer>
        {board.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <BoardEl
                key={cellIndex}
                data-something={JSON.stringify([cellIndex, rowIndex])}
                style={{ backgroundColor: cell }}
              />
            ))}
          </Row>
        ))}
        {shapes.map((shape, index) => (
          <Draggable
            key={index}
            position={SPAWN_POSITIONS[index]}
            onDrag={handleDrag} // liquid move
            onStop={handleDrop(index)} // snap to grid on mouse up
          >
            <div>
              <Shape
                color=""
                position="absolute"
                size={GRID_SIZE - 4}
                shape={shape}
              />
            </div>
          </Draggable>
        ))}
      </BoardContainer>
      <ShapePickerContainer
        style={{ width: BOARD_SIZE }}
      ></ShapePickerContainer>
    </>
  );
};

function makeyShapey() {
  const index1 = Math.floor(Math.random() * SHAPES.length);
  const index2 = Math.floor(Math.random() * SHAPES.length);
  const index3 = Math.floor(Math.random() * SHAPES.length);

  const cIndex1 = Math.floor(Math.random() * COLORS.length);
  const cIndex2 = Math.floor(Math.random() * COLORS.length);
  const cIndex3 = Math.floor(Math.random() * COLORS.length);

  //do the same as above for colors. theres a file called coors.ts that exports COLORS

  return [
    {
      color: COLORS[cIndex1],
      cells: SHAPES[index1],
    },
    {
      color: COLORS[cIndex2],
      cells: SHAPES[index2],
    },

    { color: COLORS[cIndex3], cells: SHAPES[index3] },
  ];
}

export default Board;

const ShapePickerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Row = styled.div`
  display: flex;
`;

const BoardEl = styled.div`
  background-color: #252e55;
  border-radius: calc(min(0.4vw, 0.4vh));
  width: 60px;
  height: 60px;
  margin: 2px;
`;

const BoardContainer = styled.div`
  margin: 0 auto;

  background-color: #1a2742;
  padding: 4px;
  border-radius: calc(min(0.4vw, 0.4vh));
`;
