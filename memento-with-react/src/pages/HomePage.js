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
            addCard: this.props.addCard
        }
        this.toggleCardType = this.toggleCardType.bind(this);
    }
    

    updateHandler = (newFront, newBack, newHint, newDecks) => {
        console.log("updating!");
        this.setState({frontText: newFront,
                        backText: newBack,
                        cardHint: newHint,
                        cardDecks: newDecks});
    }

    addCardHandler = () => {
        //Now we have to call the page above, to app.js
        console.log("Trying to add Card! in HomePage, got: ", this.state.frontText, "Back: ", this.state.backText);
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
        console.log("Toggling Card!");
    }

    render() {
        return (
            <div>
                {this.state.cardType === "FlashCard" && <FlashCard type={"Normal"} frontText={this.state.frontText} backText={this.state.backText} cardHint={this.state.cardHint} cardDecks={this.state.cardDecks} update = {this.updateHandler}></FlashCard>}
                {this.state.cardType === "ParseCard" && <ParseCard></ParseCard>}
                <div className="HomeCardButtons">
                    <label className="Switch">
                        <input type="checkbox"></input>
                        <span className = "slider round" onClick={() => this.toggleCardType()}></span>
                    </label>
                    <button className="AddCardButton" onClick={() => this.addCardHandler()}>&#43;</button>
                </div>
            </div>


        )
    }
}

export default HomePage;