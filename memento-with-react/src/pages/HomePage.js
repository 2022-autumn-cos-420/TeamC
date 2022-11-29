import React, {useState, Component} from "react";
import './HomePage.css';
import FlashCard from './components/Flashcard.js'
import ParseCard from './components/Parsecard.js'


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardType: "FlashCard",
            frontText: "",
            backText: "",
            cardHint: "",
            cardDecks: "",
            flipState: false,
            addCard: this.props.addCard,
            shakeButtonState: false
        }
        this.toggleCardType = this.toggleCardType.bind(this);
    }
    


    frontTextHandler = (event) => {
        this.setState({frontText: event.target.value});
    }

    backTextHandler = (event) => {
        this.setState({backText: event.target.value});
    }

    cardDecksHandler = (event) => {
        this.setState({cardDecks: event.target.value});
    }

    cardHintHandler = (event) => {
        this.setState({cardHint: event.target.value});
    }

    flipCardToggler = (event) => {
        this.setState({flipState: !this.state.flipState});
    }

    addCardHandler = (event) => {
        //First we need to find out if the user put in all they should have.
        //They do not need a hint, but they need everything else, frontText, backText, and the Deck
        if (this.state.frontText === "" || this.state.backText === "" || this.state.cardDecks === "") {
            console.log("User did not input all that they needed to!");

            //So now we might want to do something about it
            //Lets shake a button:
            this.setState({
                shakeButtonState: true
            });
            //Now we want to reset the animation so it actually plays it again for us
            setTimeout(() => this.setState({
                    shakeButtonState: false
                }), 500);

            //THIS BREAKS EVERYTHING AND I DO NOT KNOW WHY THAT IS!
            //Okay, what if the problem is on another side of the card, lets automatically flip the card over for the user
            if (this.state.frontText === "") { //Check the front
                console.log("Front is blank!");
                if (this.state.flipState === true) { //We are on the back side
                    this.setState({
                        flipState: false
                    });
                }
            }
            else if (this.state.backText === "") { //Check the back
                console.log("Back is blank!");
                if (this.state.flipState === false) { //We are on the front side
                    this.setState({
                        flipState: true
                    });
                }
            }
            return;
        }

        //Now we have to call the page above, to app.js
        let newDecksArray = [this.state.cardDecks];
        this.props.addCard(this.state.frontText, this.state.backText, this.state.cardHint, newDecksArray)

        this.setState({frontText: "",
                        backText: "",
                        cardHint: "",
                        cardDecks: "",
                        flipState: false,
                        shakeButtonState: false}, () => {console.log("New HomePage state frontText: ", this.state.frontText, "BackText: ", this.state.backText)});
    }

    toggleCardType = () => {
        if (this.state.cardType ==="FlashCard") {
            this.setState({cardType: "ParseCard"});
        }
        else {
            this.setState({cardType: "FlashCard"});
        }
    }

    parseCardHandler = (event) => {
        console.log("Trying to parse cards!");
        //Here we want to get the value of the text area, and parse the cards one by one using: this.props.addCard()
        //Might be a good idea to set the new value of the text area to the new cards to be parsed? We shall see what happens

    }


    render() {
        return (
            <div>
                {this.state.cardType === "FlashCard" && <FlashCard 
                                                            type={"Normal"} 
                                                            frontText={this.state.frontText} 
                                                            backText={this.state.backText} 
                                                            cardHint={this.state.cardHint} 
                                                            cardDecks={this.state.cardDecks} 
                                                            update={this.updateHandler} 
                                                            flipState={this.state.flipState} 
                                                            flipCard={this.flipCardToggler} 
                                                            frontTextHandler={this.frontTextHandler} 
                                                            backTextHandler={this.backTextHandler} 
                                                            cardDecksHandler={this.cardDecksHandler} 
                                                            cardHintHandler={this.cardHintHandler}></FlashCard>}
                {this.state.cardType === "ParseCard" && <ParseCard></ParseCard>}
                <div className="HomeCardButtons">
                    <label className="Switch">
                        <input type="checkbox"></input>
                        <span className = "slider round" onClick={() => this.toggleCardType()}></span>
                    </label>
                    <button className="AddCardButton" data-testid="AddCardButton" style={{animation: this.state.shakeButtonState === false ? 'none' : 'horizontal-shaking .5s'}} onClick={this.state.cardType === "FlashCard" ? () => this.addCardHandler() : () => this.parseCardHandler()}>&#43;</button>
                </div>
            </div>


        )
    }
}

export default HomePage;