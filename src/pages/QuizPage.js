import React, {useState, Component} from "react";
import './QuizPage.css';
import FlashCard from './components/Flashcard.js'


class QuizPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardArray: this.props.cardArray,
            currentFrontText: this.props.cardArray.length > 0 ? this.props.cardArray[0].frontText: "",
            currentBackText: this.props.cardArray.length > 0 ? this.props.cardArray[0].backText: "",
            currentCardHint: this.props.cardArray.length > 0 ? this.props.cardArray[0].cardHint: "",
            currentCardDecks: this.props.cardArray.length > 0 ? this.props.cardArray[0].cardDecks: "",
            cardType: "QuizCard",
            currentIndex: 0,
            done: false,
            showHint: false,
            flipState: false
        }
        this.nextCardHandler = this.nextCardHandler.bind(this);
    }


    flipCardToggler = (event) => {
        this.setState({flipState: !this.state.flipState});
    }

    showHintToggler = (event) => {
        this.setState({showHint: !this.state.showHint})
    }

    flipThenNext(rightOrWrong) {
        if (this.state.flipState === false) {
            this.nextCardHandler(rightOrWrong);
            return;
        }
        //Otherwise we want to flip the card over and THEN change the card values
        this.setState({flipState: false,
                        showHint: false});
        setTimeout(() => {
            this.nextCardHandler(rightOrWrong)
        }, 500);
    }

    nextCardHandler = (rightOrWrong) => {
        this.setState({flipState: false});
        if (rightOrWrong === "Correct") {
            console.log("The user was correct!");
            //Do relevant stats stuff
        }
        else {
            console.log("The user was Incorrect!");
            //Do relevant stats stuff
        }
        if (this.state.currentIndex + 1 < this.props.cardArray.length) {
            this.setState({currentIndex: this.state.currentIndex + 1,
                            currentFrontText: this.props.cardArray[this.state.currentIndex + 1].frontText,
                            currentBackText: this.props.cardArray[this.state.currentIndex + 1].backText,
                            currentCardHint: this.props.cardArray[this.state.currentIndex + 1].cardHint,
                            currentCardDecks: this.props.cardArray[this.state.currentIndex + 1].cardDecks,
                            showHint: false,
                            flipState: false
            });
        }
        else {
            //We have gone through all the cards and should now display a message to the user about how many they god right...
            this.setState({done: true});
        }
    }

    render() {
        return (
            <div>
                {(this.state.done !== true && this.props.cardArray.length > 0) && <div>
                    <FlashCard type={"Quiz"} frontText={this.state.currentFrontText} backText={this.state.currentBackText} cardHint={this.state.currentCardHint} cardDecks={this.state.currentCardDecks} showHint={this.state.showHint} flipState={this.state.flipState} flipCard={this.flipCardToggler} showHintToggler={this.showHintToggler}></FlashCard>
                    <div className="QuizPageButtons">
                        <button className="CorrectButton" data-testid="CorrectButton" onClick={() => this.flipThenNext("Correct")}>Correct</button>
                        <button className="IncorrectButton" data-testid="IncorrectButton" onClick={() => this.flipThenNext("Incorrect")}>Incorrect</button>
                    </div>
                </div>}
                {this.state.done === true && <div>
                    Looks like that is all the cards!
                </div>}
            </div>
        )
    }
}

export default QuizPage;
