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
            addCard: this.props.addCard
        }
        this.toggleCardType = this.toggleCardType.bind(this);
    }
    

    updateHandler = (newFront, newBack, newHint, newDecks) => {
        this.setState({frontText: newFront,
                        backText: newBack,
                        cardHint: newHint,
                        cardDecks: newDecks});
    }

    flipCardToggler = (event) => {
        console.log("Toggling flipCard in HomePage.js")
        this.setState({flipState: !this.state.flipState});
    }

    addCardHandler = (event) => {
        this.setState({frontText: "",
                        backText: "",
                        cardHint: "",
                        cardDecks: "",
                        flipState: false}, () => {console.log("New HomePage state frontText: ", this.state.frontText)});
                    
        //Now we have to call the page above, to app.js
        let newDecksArray = [this.state.cardDecks];
        this.props.addCard(this.state.frontText, this.state.backText, this.state.cardHint, newDecksArray)
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
                {this.state.cardType === "FlashCard" && <FlashCard type={"Normal"} frontText={this.state.frontText} backText={this.state.backText} cardHint={this.state.cardHint} cardDecks={this.state.cardDecks} update={this.updateHandler} flipState={this.state.flipState} flipCard={this.flipCardToggler}></FlashCard>}
                {this.state.cardType === "ParseCard" && <ParseCard></ParseCard>}
                <div className="HomeCardButtons">
                    <label className="Switch">
                        <input type="checkbox"></input>
                        <span className = "slider round" onClick={() => this.toggleCardType()}></span>
                    </label>
                    <button className="AddCardButton" onClick={this.state.cardType === "FlashCard" ? () => this.addCardHandler() : () => this.parseCardHandler()}>&#43;</button>
                </div>
            </div>


        )
    }
}

export default HomePage;