import * as React from "react";
import {
  generateEmptyBoard,
  opposingSymbol,
  getWinner,
  newBoardWithMove
} from "./utils/boardUtils";
import { getAiMove } from "./utils/ai";

export function useTicTacToe(
  userSymbol: PlayerSymbol,
  userFirst: boolean
): GameState {
  const [board, setBoard] = React.useState<Board>(generateEmptyBoard());
  const [userTurn, setUserTurn] = React.useState<boolean>(userFirst);
  const [winner, setWinner] = React.useState<WinnerOutcome>(undefined);

  const aiSymbol = opposingSymbol(userSymbol);
  const alternateTurn = React.useCallback(() => setUserTurn(!userTurn), [
    userTurn
  ]);

  React.useEffect(() => {
    if (!userTurn && !winner) {
      processMove(
        board,
        getAiMove(board, aiSymbol),
        aiSymbol,
        setBoard,
        setWinner,
        alternateTurn
      );
    }
  }, [userTurn]);

  const receiveMove = React.useCallback(
    (movePosition: BoardPosition) => {
      if (
        userTurn &&
        !winner &&
        board[movePosition.row][movePosition.col] === BoardValues.EMPTY_SPACE
      ) {
        processMove(
          board,
          movePosition,
          userSymbol,
          setBoard,
          setWinner,
          alternateTurn
        );
      }
    },
    [board, setBoard, userTurn]
  );

  return { board, userTurn, winner, receiveMove };
}

function processMove(
  oldBoard: Board,
  movePosition: BoardPosition,
  symbol: PlayerSymbol,
  setBoard: (value: Board) => void,
  setWinner: (value: WinnerOutcome) => void,
  alternateTurn: () => void
): void {
  const newBoard = newBoardWithMove(oldBoard, movePosition, symbol);
  setBoard(newBoard);
  setWinner(getWinner(newBoard));
  alternateTurn();
}

export enum BoardValues {
  SYMBOL_X = "X",
  SYMBOL_O = "O",
  EMPTY_SPACE = " "
}

export type PlayerSymbol = BoardValues.SYMBOL_X | BoardValues.SYMBOL_O;
export type BoardValue = PlayerSymbol | BoardValues.EMPTY_SPACE;
export type Board = BoardValue[][];

export type WinnerOutcome = PlayerSymbol | "Draw" | undefined;

export interface BoardPosition {
  row: number;
  col: number;
}

export interface GameState {
  board: Board;
  userTurn: boolean;
  winner: WinnerOutcome;
  receiveMove: (value: BoardPosition) => void;
}
