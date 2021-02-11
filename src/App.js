import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame, { FAKE_HOF } from './HallOfFame'

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_TIME_DELAY = 750

class App extends Component {
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    matchedCardIndices: [],
  }

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

  // No need for binding format, cuz will be called directly
  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)
  
    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }
  
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }
  
    return indexMatched ? 'visible' : 'hidden'
  }

  // Arrow format for binding purpose only to use this
  handleCardClick = index => {
    const {currentPair} = this.state

    if (currentPair.length === 2) {
      return
    }

    if (currentPair.length === 0) {
      this.setState({currentPair: [index]})
      return
    }

    this.handleNewPairClosedBy(index)
  }

  handleNewPairClosedBy(index) {
    const {cards, currentPair, guesses, matchedCardIndices}  = this.state

    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    const match = cards[newPair[0]] === cards[newPair[1]]
    this.setState({currentPair: [...newPair], guesses: newGuesses})
    if (match) {
      this.setState({matchedCardIndices: [...matchedCardIndices, ...newPair]})
    }

    setTimeout(_ => this.setState({currentPair: []}), VISUAL_TIME_DELAY)
  }

  render() {
    const {cards, guesses, matchedCardIndices} = this.state
    const won = matchedCardIndices.length === cards.length
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
          {cards.map((card, index) => (
            <Card 
              key={index}
              index={index}
              card={card}
              feedback={this.getFeedbackForCard(index)}
              onClick={this.handleCardClick}/>
          ))}
        {won && <HallOfFame entries={FAKE_HOF}/>}
      </div>
    )
  }
}

export default App