import { Square } from "./Square"

export function WinnerModal({winner, handleReset}){
    if (winner === null) return null

    const winnerText = winner === false ? 'Empate' : `gano ${winner}`

    return (
        <section className='winner'>
            <div className='text'>

                <h2>{winnerText}</h2>

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