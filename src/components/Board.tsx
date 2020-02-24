import React from "react";
import {
  useTicTacToe,
  BoardValue,
  PlayerSymbol,
  BoardValues
} from "../hooks/ticTacToe";

const Board: React.FunctionComponent<BoardProps> = ({
  userSymbol,
  moveFirst
}) => {
  const { board, userTurn, winner, receiveMove } = useTicTacToe(
    userSymbol,
    moveFirst
  );

  return (
    <>
      {winner && (
        <div className="row">
          <div className="col text-center">
            <h2>Winner: {winner}</h2>
          </div>
        </div>
      )}
      {!winner && (
        <div className="row">
          <div className="col text-center">
            <h2 />
            {userTurn ? "It's your turn" : "AI Thinking"}
            <h2 />
          </div>
        </div>
      )}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row h-100">
          {row.map((item, colIndex) => (
            <div
              key={colIndex}
              className="col border-col d-flex"
              onClick={() => {
                receiveMove({ row: rowIndex, col: colIndex });
              }}
            >
              <div
                className="align-self-center mx-auto symbol"
                style={{ color: colorFromSymbol(item) }}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

function colorFromSymbol(symbol: BoardValue) {
  return symbol === BoardValues.SYMBOL_X ? "red" : "black";
}

export interface BoardProps {
  userSymbol: PlayerSymbol;
  moveFirst: boolean;
}

export default Board;
