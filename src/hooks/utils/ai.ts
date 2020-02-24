import { Board, PlayerSymbol, BoardPosition } from "../ticTacToe";
import {
  getWinner,
  opposingSymbol,
  getEmptySpaces,
  newBoardWithMove
} from "./boardUtils";

export function getAiMove(board: Board, aiSymbol: PlayerSymbol): BoardPosition {
  const emptySpaces = getEmptySpaces(board);
  if (emptySpaces.length === 9) {
    return { row: 1, col: 1 };
  }

  const moveValues = emptySpaces.map(movePosition =>
    evaluateAiMove(board, movePosition, aiSymbol)
  );

  return emptySpaces[moveValues.indexOf(Math.max(...moveValues))];
}

function evaluateAiMove(
  board: Board,
  movePosition: BoardPosition,
  symbol: PlayerSymbol
): number {
  const newBoard = newBoardWithMove(board, movePosition, symbol);

  const winner = getWinner(newBoard);
  if (winner) {
    return winner === symbol ? 1 : winner === opposingSymbol(symbol) ? -1 : 0;
  }

  const remainingEmptySpaces = getEmptySpaces(newBoard);

  return Math.min(
    ...remainingEmptySpaces.map(emptySpace =>
      evaluateAiOpponentMove(newBoard, emptySpace, opposingSymbol(symbol))
    )
  );
}

function evaluateAiOpponentMove(
  board: Board,
  movePosition: BoardPosition,
  symbol: PlayerSymbol
): number {
  const newBoard = newBoardWithMove(board, movePosition, symbol);

  const winner = getWinner(newBoard);
  if (winner) {
    return winner === symbol ? -1 : winner === opposingSymbol(symbol) ? 1 : 0;
  }

  const remainingEmptySpaces = getEmptySpaces(newBoard);

  return Math.max(
    ...remainingEmptySpaces.map(emptySpace =>
      evaluateAiMove(newBoard, emptySpace, opposingSymbol(symbol))
    )
  );
}
