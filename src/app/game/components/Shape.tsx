import { CSSProperties } from "react";
import styled from "styled-components";
import { ShapeType } from "./Board";

export default function Shape(props: {
  shape: ShapeType;
  position: "absolute" | "relative";
  size: number;
  color: string;
}) {
  const { shape } = props;
  const cellStyle: CSSProperties = {
    width: `${props.size}px`,
    height: `${props.size}px`,
  };
  return (
    <DragableDiv style={{ position: props.position }}>
      {shape.cells.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell) =>
            cell === 1 ? (
              <FilledCell
                style={{ ...cellStyle, backgroundColor: shape.color }}
              />
            ) : (
              <EmptyCell style={cellStyle} />
            )
          )}
        </Row>
      ))}
    </DragableDiv>
  );
}

const DragableDiv = styled.div`
  cursor: grab;
  user-select: none;
  position: absolute;
`;

const FilledCell = styled.div`
  border-radius: calc(min(0.4vw, 0.4vh));
  margin: 2px;
  background-color: black;
`;
const EmptyCell = styled.div`
  border-radius: calc(min(0.4vw, 0.4vh));

  margin: 2px;
`;

const Row = styled.div`
  display: flex;
`;
