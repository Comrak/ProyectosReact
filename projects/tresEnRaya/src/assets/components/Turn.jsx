import { Square } from "./Square"
import { TURNS } from "../js/constants"
import PropTypes from 'prop-types'

export function Turn({ turn }) {
    return (
        <section className='turn'>
            <Square isSelected={turn === TURNS.X}>
                {TURNS.X}
            </Square>
            <Square isSelected={turn === TURNS.O}>
                {TURNS.O}
            </Square>
        </section>
    )
}

//turn is missing in props validation
Turn.propTypes = {
    turn: PropTypes.string
}