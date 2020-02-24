import React from "react";
import { PlayerSymbol, BoardValues } from "../hooks/ticTacToe";

const InitiateGame: React.FunctionComponent<InitiateGameProps> = ({
  userSymbol,
  moveFirst,
  setUserSymbol,
  setMoveFirst
}) => {
  const setUserSymbolX = () => setUserSymbol(BoardValues.SYMBOL_X);
  const setUserSymbolO = () => setUserSymbol(BoardValues.SYMBOL_O);

  const setMoveFirstTrue = () => setMoveFirst(true);
  const setMoveFirstFalse = () => setMoveFirst(false);

  return (
    <>
      {!userSymbol && (
        <>
          <div className="row">
            <div className="col text-center">Choose your symbol</div>
          </div>
          <div className="row mt-3">
            <div className="col text-center">
              <button
                type="button"
                className="btn btn-primary mx-2 w-20"
                onClick={setUserSymbolX}
              >
                X
              </button>
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={setUserSymbolO}
              >
                O
              </button>
            </div>
          </div>
        </>
      )}
      {moveFirst === undefined && (
        <>
          <div className="row mt-4">
            <div className="col text-center">Would you like to move first?</div>
          </div>
          <div className="row mt-3">
            <div className="col text-center">
              <button
                type="button"
                className="btn btn-primary mx-2"
                style={{ width: 80 }}
                onClick={setMoveFirstTrue}
              >
                Move First
              </button>
              <button
                type="button"
                className="btn btn-primary mx-2"
                style={{ width: 80 }}
                onClick={setMoveFirstFalse}
              >
                Move Second
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export interface InitiateGameProps {
  userSymbol: PlayerSymbol | undefined;
  moveFirst: boolean | undefined;
  setUserSymbol: (value: PlayerSymbol) => void;
  setMoveFirst: (value: boolean) => void;
}

export default InitiateGame;
