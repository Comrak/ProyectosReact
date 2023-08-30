import { useState } from 'react';
import { TURNS ,WINNER_COMBOS } from '../js/constants'

function checkWinner(board) {
    for (let i = 0; i < WINNER_COMBOS.length; i++) {
        const [a, b, c] = WINNER_COMBOS[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
        }
    }
    
    return null;

}

export function useGameLogic() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      const isDraw = !newBoard.includes(null);
      if (isDraw) {
        setWinner(false);
      }
    }
  };

  return { board, turn, winner, resetGame, updateBoard };
}