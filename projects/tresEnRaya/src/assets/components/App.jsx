import { useState } from 'react'
import '../styles/App.css'
import { TURNS, WINNER_COMBOS } from '../js/constants'
import confetti from 'canvas-confetti'

const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}` 

  const handleClick = () => { updateBoard(index) }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); // null winner false no hay ganador

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a] // X or O
      }
    }
    // si no hay ganador
    return null
  }

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
    if(newWinner){
      confetti()
      //alert(`Ha ganado ${newWinner}`)
      setWinner(newWinner)
    }else{
      // compruebo si hay empate
      const isDraw = !newBoard.includes(null)
      if(isDraw){
        //alert('Empate')
        setWinner(false)
      }
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={handleReset}>Reiniciar</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>{winner=== false? 'Empate': `gano ${winner}`}</h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={handleReset}>Reiniciar</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
