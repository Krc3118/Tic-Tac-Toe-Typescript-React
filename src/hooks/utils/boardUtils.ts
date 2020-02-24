import {
  Board,
  BoardValue,
  PlayerSymbol,
  BoardValues,
  BoardPosition,
  WinnerOutcome
} from "../ticTacToe";

export function generateEmptyBoard(): Board {
  const emptyBoard = new Array<BoardValue[]>();

  for (let i = 0; i < 3; i++) {
    const row: BoardValue[] = new Array<BoardValue>();
    for (let j = 0; j < 3; j++) {
      row.push(BoardValues.EMPTY_SPACE);
    }
    emptyBoard.push(row);
  }

  return emptyBoard;
}

export function getEmptySpaces(board: Board): BoardPosition[] {
  const emptySpaces = new Array<BoardPosition>();

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === BoardValues.EMPTY_SPACE) {
        emptySpaces.push({ row: i, col: j });
      }
    }
  }

  return emptySpaces;
}

export function newBoardWithMove(
  oldBoard: Board,
  movePosition: BoardPosition,
  symbol: PlayerSymbol
): Board {
  const newBoard = oldBoard.map(row => row.slice());
  newBoard[movePosition.row][movePosition.col] = symbol;

  return newBoard;
}

function isWinningAxis(
  boardAxis: BoardValue[],
  playerSymbol: PlayerSymbol
): boolean {
  return boardAxis.filter(symbol => symbol === playerSymbol).length === 3;
}

export function isPlayerVictory(
  board: Board,
  playerSymbol: PlayerSymbol
): boolean {
  const rowVictory =
    board.filter(row => isWinningAxis(row, playerSymbol)).length > 0;

  if (rowVictory) {
    return true;
  }

  const ascDiagonal = new Array<BoardValue>();
  const dscDiagonal = new Array<BoardValue>();
  let colVictory = false;

  for (let i = 0; i < 3; i++) {
    const column = board.map(row => row[i]);
    colVictory = isWinningAxis(column, playerSymbol) || colVictory;
    if (colVictory) {
      return true;
    }

    ascDiagonal.push(board[2 - i][i]);
    dscDiagonal.push(board[i][i]);
  }

  const diagonalVictory =
    isWinningAxis(ascDiagonal, playerSymbol) ||
    isWinningAxis(dscDiagonal, playerSymbol);

  return diagonalVictory;
}

export function opposingSymbol(symbol: PlayerSymbol): PlayerSymbol {
  return symbol === BoardValues.SYMBOL_X
    ? BoardValues.SYMBOL_O
    : BoardValues.SYMBOL_X;
}

export function getWinner(board): WinnerOutcome {
  if (isPlayerVictory(board, BoardValues.SYMBOL_X)) {
    return BoardValues.SYMBOL_X;
  } else if (isPlayerVictory(board, BoardValues.SYMBOL_O)) {
    return BoardValues.SYMBOL_O;
  } else if (getEmptySpaces(board).length === 0) {
    return "Draw";
  }
}
