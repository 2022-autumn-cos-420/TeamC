import React, {useState, Component} from "react";
import './QuizPage.css';
import FlashCard from './components/Flashcard.js'
import { avoidRecentCards, sortCardArray, getNextCard } from "../scheduler";
import { cardEquality } from "../utils";

class QuizPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardArray: this.props.filters[0] === "All" ? this.props.cardArray: this.props.cardArray.filter((card) => card.cardDecks.includes(this.props.filters[1]))
        }
        this.state = {
            cardArray: this.state.cardArray,
            currentFrontText: this.state.cardArray.length > 0 ? this.state.cardArray[0].frontText: "",
            currentBackText: this.state.cardArray.length > 0 ? this.state.cardArray[0].backText: "",
            currentCardHint: this.state.cardArray.length > 0 ? this.state.cardArray[0].cardHint: "",
            currentCardDecks: this.state.cardArray.length > 0 ? this.state.cardArray[0].cardDecks: "",
            cardType: "QuizCard",
            currentIndex: this.props.cardArray.length > 0 ? getNextCard(this.props.cardArray, [], "Accuracy", "Ascending"): 0,
            recentCards: [],
            done: false,
            showHint: false,
            flipState: false,
            sortCriteria: "Accuracy",
            sortDirection: "Ascending",
            wait: 3
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

    //Because I'm updating multiple states in a single function, it's necessary that none of them rely on any of the new values of one another
    nextCardHandler = (rightOrWrong) => {
        //
        //  Update cardArray   
        //

        if (rightOrWrong === "Correct") {
            console.log("The user was correct!");
            //Call a prop function from app.jsx to update the accuracy of the card
            this.props.updateAccuracy(this.state.cardArray[this.state.currentIndex]);
            //Incement the local accuracy. This might double increment it on accident if it's being rendered after updateAccuracy is called. If so just delete it
            const newCardArray = this.state.cardArray.map((card, index) => {
                                    // If this is the card we want to update, increment its accuracy
                                    if (index === this.state.currentIndex) {
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

        //  Update recentCards and store the initial state for computing the nextCardIndex just to make sure no synchronization-related issues will occur   
        const updatedRecentCards = [...this.state.recentCards, this.state.currentIndex];

        // If the you've just repeated a recentCard (due to deckArray.length < wait) or you have stored more indices in recent cards than you need to, then shift off the first
        //     element of recentCards and append the newly-finished card before moving to the next
        // console.log("before:", this.state.recentCards);
        // console.log("updatedCards:", updatedRecentCards);
        if (this.state.recentCards.length === 0) {
            this.setState({recentCards: [this.state.currentIndex]});
        }
        else if (this.state.currentIndex === this.state.recentCards[0] || this.state.recentCards.length === this.state.wait){
            const shiftedState = [...this.state.recentCards];
            const firstElement = shiftedState.shift();
            this.setState({recentCards: [...shiftedState, this.state.currentIndex]});
        }
        // Otherwise just add the current index to the "Recent cards" state array
        else {            
            this.setState({recentCards: [...this.state.recentCards, this.state.currentIndex]});
        }

        //  Update currentIndex
        
        // Move to the next card while avoiding repeating a recent card and going in the sortCriteria order
        const nextCardIndex = getNextCard(this.state.cardArray, updatedRecentCards, this.state.sortCriteria, this.state.sortDirection);
        // console.log("Next card:", nextCardIndex);
        this.setState({currentIndex: nextCardIndex,
                        currentFrontText: this.props.cardArray[nextCardIndex].frontText,
                        currentBackText: this.props.cardArray[nextCardIndex].backText,
                        currentCardHint: this.props.cardArray[nextCardIndex].cardHint,
                        currentCardDecks: this.props.cardArray[nextCardIndex].cardDecks,
                        showHint: false,
                        flipState: false
                    });

        /* I'm leaving this code in, it's a snippet representing how we would handle a proper quiz. Currently though this class implements an indefinite study loop instead
        
        if (this.state.currentIndex + 1 < this.props.cardArray.length) {

            this.setState({currentIndex: this.state.currentIndex + 1,
                            currentFrontText: this.state.cardArray[this.state.currentIndex + 1].frontText,
                            currentBackText: this.state.cardArray[this.state.currentIndex + 1].backText,
                            currentCardHint: this.state.cardArray[this.state.currentIndex + 1].cardHint,
                            currentCardDecks: this.state.cardArray[this.state.currentIndex + 1].cardDecks,
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
                {(this.state.done !== true && this.state.cardArray.length > 0) && <div>
                    <FlashCard type={"Quiz"} 
                        frontText={this.state.currentFrontText} 
                        backText={this.state.currentBackText} 
                        cardHint={this.state.currentCardHint} 
                        cardDecks={this.state.currentCardDecks} 
                        showHint={this.state.showHint} 
                        flipState={this.state.flipState} 
                        flipCard={this.flipCardToggler} 
                        showHintToggler={this.showHintToggler}></FlashCard>
                    <div className="QuizPageButtons">
                        <button className="CorrectButton" data-testid="CorrectButton" onClick={() => this.flipThenNext("Correct")}>Correct</button>
                        <button className="IncorrectButton" data-testid="IncorrectButton" onClick={() => this.flipThenNext("Incorrect")}>Incorrect</button>
                        <div> This currentIndex is {this.state.currentIndex}</div>
                        <div> This deckLength is {this.state.cardArray.length}</div>
                        <div> This accuracy is {this.state.cardArray.length>0 ? this.state.cardArray[this.state.currentIndex].accuracy:""}</div>
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
