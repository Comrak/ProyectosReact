import '../styles/App.css'
import {WinnerModal} from '../components/WinnerModal'
import {Game} from '../components/Game'
import { Turn } from './Turn'
import { useGameLogic } from '../js/useGameLogic'

function App() {
  const { board, turn, winner, resetGame, updateBoard } = useGameLogic();

  const handleReset = () => {
    resetGame();
  };

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <button onClick={handleReset}>Reiniciar</button>

      <Game board={board} updateBoard={updateBoard} />

      <Turn turn={turn} />

      <WinnerModal handleReset={handleReset} winner={winner} />
    </main>
  );
}

export default App;
