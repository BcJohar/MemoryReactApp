import './Card.css'
import PropTypes from 'prop-types'

const HIDDEN_SYMBOL = '❓'

const Card = ({card, index, feedback, onClick}) => 
    (<div className={`card ${feedback}`} onClick={() => onClick(index)}>
        <span className="symbol">{feedback === 'hidden' ? HIDDEN_SYMBOL: card}</span>
    </div>)

Card.propTypes = {
    card: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    feedback: PropTypes.oneOf([
      'hidden',
      'justMatched',
      'justMismatched',
      'visible',
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
  }

export default Card;