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
                <FlashCard type={"Quiz"} frontText={this.state.frontText} backText={this.state.backText} cardHint={this.state.cardHint} cardDecks={this.state.cardDecks}></FlashCard>
            </div>
        )
    }
}

export default QuizPage;
