import { useState } from "react";
import Board from "./Board";

function calculateWinner(values){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (values[a] && values[a] === values[b] && values[a] === values[c]) {
      return values[a];
    }
  }
  return null;
}

export default function Game() {
	const [history, setHistory] = useState([{
    squares: Array(9).fill(null)
  }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
	let status = winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O");
  
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const moves = history.map((step, move) => {
    const deskription = move ? "Go to move #" + move : "Go to game start";
    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)} className={"list-btn"}>{deskription}</button>
      </li>
    );
  });

  const onSquareClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
		const newSquares = current.squares.slice();

		if (calculateWinner(newSquares) || newSquares[i]) {
			return;
		} 
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, {squares: newSquares}]);
    setStepNumber(newHistory.length);
		setXIsNext(!xIsNext);
	}

  return (
    <div className="game">
      <div className="game-board">
        <Board values={current.squares} onSquareClick={onSquareClick}/>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}