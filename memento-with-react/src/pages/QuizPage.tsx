import React, {useState, Component} from "react";
import './QuizPage.css';
import FlashCard from './components/Flashcard'
import { Card } from "../interfaces/card";
import { cardEquality, arrayEquality, exportPath, deckEquality, stringToCard } from "../utils";

interface Props {
    cardArray: Card[];
}
interface State {
    cardArray: Card[],
    frontText: string,
    backText: string,
    cardHint: string,
    cardDecks: string[],
    cardType: string
}
class QuizPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            cardArray: this.props.cardArray,
            frontText: "",
            backText: "",
            cardHint: "",
            cardDecks: [],
            cardType: "QuizCard",
        }
    }

    nextCard = () => {
        
    }

    render() {
        return (
            <div>
                {/* <FlashCard type={"Quiz"} frontText={this.state.frontText} backText={this.state.backText} cardHint={this.state.cardHint} cardDecks={this.state.cardDecks}></FlashCard> */}
            </div>
        )
    }
}

export default QuizPage;
