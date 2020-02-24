import React from "react";
import "./App.css";
import { PlayerSymbol } from "./hooks/ticTacToe";
import Board from "./components/Board";
import InitiateGame from "./components/InitiateGame";

const App: React.FunctionComponent = () => {
  const [userSymbol, setUserSymbol] = React.useState<
    PlayerSymbol | undefined
  >();
  const [moveFirst, setMoveFirst] = React.useState<boolean | undefined>();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h1>Tic-Tac-Toe</h1>
        </div>
      </div>
      {userSymbol && moveFirst !== undefined ? (
        <Board userSymbol={userSymbol} moveFirst={moveFirst} />
      ) : (
        <InitiateGame
          userSymbol={userSymbol}
          moveFirst={moveFirst}
          setUserSymbol={setUserSymbol}
          setMoveFirst={setMoveFirst}
        />
      )}
    </div>
  );
};

export default App;
