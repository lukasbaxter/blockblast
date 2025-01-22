import React from "react";

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = () => {
  return (
    <div>
      <h1>score comp</h1>
    </div>
  );
};

export default Score;
