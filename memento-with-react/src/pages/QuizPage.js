import React, {useState, Component} from "react";
import './QuizPage.css';
import FlashCard from './components/Flashcard.js'


class QuizPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardArray: this.props.cardArray,
            frontText: this.props.frontText,
            backText: this.props.backText,
            cardHint: this.props.cardHint,
            cardDecks: this.props.cardDecks,
            cardType: "QuizCard",
        }
    }

    nextCard = (event) => {
        
    }

    render() {
        return (
            <div>
                <FlashCard type={"Quiz"} frontText={"DefaultFront"} backText={"DefaultBack"} cardHint={"Default Hint"} cardDecks={"Default Deck"}></FlashCard>
            </div>
        )
    }
}

export default QuizPage;
