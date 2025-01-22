import React from "react";

interface TileProps {
  value: string;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ value, onClick }) => {
  return (
    <div className="tile" onClick={onClick}>
      {value}
    </div>
  );
};

export default Tile;
