import { useState } from 'react'
import '../styles/App.css'
import { TURNS } from '../js/constants'
import confetti from 'canvas-confetti'
import {checkWinner} from '../js/board'
import {WinnerModal} from '../components/WinnerModal'
import {Game} from '../components/Game'
import { Turn } from './Turn'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); // null winner false no hay ganador

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const handleReset= () => { resetGame() }

  const updateBoard = (index) => {
    if (board[index] || winner) return // si ya hay algo en esa casilla, no hago nada
    // actualizo el tablero
    const newBoard = [...board]
    newBoard[index] = turn // X or O
    setBoard(newBoard)
    // cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // compruebo si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      //alert(`Ha ganado ${newWinner}`)
      setWinner(newWinner)
    } else {
      // compruebo si hay empate
      const isDraw = !newBoard.includes(null)
      if (isDraw) {
        //alert('Empate')
        setWinner(false)
      }
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <button onClick={handleReset}>Reiniciar</button>

      <Game board={board} updateBoard={updateBoard}/>

      <Turn turn={turn}/>

      <WinnerModal handleReset={handleReset} winner={winner}/>
    </main>
  )
}

export default App
