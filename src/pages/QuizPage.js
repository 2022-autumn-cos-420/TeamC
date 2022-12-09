import React, {useState, Component} from "react";
import './QuizPage.css';
import FlashCard from './components/Flashcard.js'
import { avoidRecentCards, sortCardArray, getNextCard } from "../scheduler";
import { cardEquality } from "../utils";

class QuizPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //The filtered cards in the current deck
            cardArray: this.props.cardArray,
            currentFrontText: this.props.cardArray.length > 0 ? this.props.cardArray[0].frontText: "",
            currentBackText: this.props.cardArray.length > 0 ? this.props.cardArray[0].backText: "",
            currentCardHint: this.props.cardArray.length > 0 ? this.props.cardArray[0].cardHint: "",
            currentCardDecks: this.props.cardArray.length > 0 ? this.props.cardArray[0].cardDecks: "",
            cardType: "QuizCard",
            currentIndex: getNextCard(this,props.cardArray, [], "Accuracy", "Ascending"),
            recentCards: [],
            done: false,
            showHint: false,
            flipState: false,
            sortCriteria: "Accuracy",
            sortDirection: "Ascending"
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
        // If the you've just repeated a recentCard (due to deckArray.length < wait) or you have stored more indices in recent cards than you need to, then shift off the first
        //     element of recentCards and append the newly-finished card before moving to the next
        if (this.state.currentIndex === this.state.recentCards[0] || this.state.recentCards.length > this.state.wait){
            this.setState({recentCards: [...this.state.recentCards.shift(), this.state.currentIndex]});
        }
        // Otherwise just add the current index to the "Recent cards" state array
        else {            
            this.setState({recentCards: [...this.state.recentCards, this.state.currentIndex]});
        }

        
        if (rightOrWrong === "Correct") {
            console.log("The user was correct!");
            //Call a prop function from app.jsx to update the accuracy of the card
            this.props.updateAccuracy(this.state.cardArray[this.state.currentIndex]);
            //Incement the local accuracy. This might double increment it on accident if it's being rendered after updateAccuracy is called. If so just delete it
            const newCardArray = this.state.cardArray.map((card, index) => {
                                    // If this is the card we want to update, increment its accuracy
                                    if (index, this.state.currentIndex) {
                                        return {...card, accuracy: card.accuracy + 1};
                                    } 
                                    else {
                                    // Otherwise, just return the old card
                                        return card;
                                    }
                                });
            this.setState({cardArray: newCardArray});
        }
        else {
            console.log("The user was Incorrect!");
            //Does nothing. We treat accuracy as the # of overall correct guesses, not a %. 
            //    This lets us track it with a single property across calls to study loop and across decks more easily
            //    The reasoning for this is that it biases in favor of showing newer cards, and we expect users to be more comfortable with older cards
            //    So if the accuracy is high, either its an old card or an easy one, and this method will prioritize it less. 
            //    It should work fairly well for most use cases as a first solution
        }
        // Move to the next card while avoiding repeating a recent card and going in the sortCriteria order
        this.setState({currentIndex: getNextCard(this.state.cardArray, this.state.recentCards, this.state.sortCriteria, this.state.sortDirection)});

        /* I'm leaving this code in, it's a snippet representing how we would handle a proper quiz. Currently though this class implements an indefinite study loop instead
        
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
            //We have gone through all the cards and should now display a message to the user about how many they got right...
            this.setState({done: true});
        }
        */
    }

    render() {
        return (
            <div>
                {(this.state.done !== true && this.props.cardArray.length > 0) && <div>
                    <FlashCard type={"Quiz"} frontText={this.state.currentFrontText} backText={this.state.currentBackText} cardHint={this.state.currentCardHint} cardDecks={this.state.currentCardDecks} showHint={this.state.showHint} flipState={this.state.flipState} flipCard={this.flipCardToggler} showHintToggler={this.showHintToggler}></FlashCard>
                    <div className="QuizPageButtons">
                        <button className="CorrectButton" data-testid="CorrectButton" onClick={() => this.flipThenNext("Correct")}>Correct</button>
                        <button className="IncorrectButton" data-testid="IncorrectButton" onClick={() => this.flipThenNext("Incorrect")}>Incorrect</button>
                        <div> This accuracy is {this.state.cardArray[this.state.currentIndex].accuracy}</div>
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
