import React, {Component} from 'react';
import './Flashcard.css';

class FlashCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            side: "front",
            type: this.props.type,
            localCardFront: this.props.frontText,
            localCardBack: this.props.backText,
            localCardDecks: this.props.cardDecks,
            localCardHint: this.props.cardHint,
            flipState: false
        }
        this.flipCard = this.flipCard.bind(this);
    }

    flipCard = (event) => {
        console.log("Flipping from: ", this.state.side);
        this.setState({flipState: !this.state.flipState});
        if (this.state.side === "front") {
            this.setState({side: "back"});
        }
        else {
            this.setState({side: "front"});
        }
        console.log("flipState:", this.state.flipState);
        console.log(this.state.localCardFront);
    }

    handleFrontChange = (event) => {
        if (this.props.type !== "Normal") {
            return;
        }
        console.log("Changing the front!");
        let newFront = event.target.value;
        console.log("NewState for front: ", newFront);
        this.props.update(newFront, this.state.localCardBack, this.state.localCardHint, this.state.localCardDecks);
        this.setState({localCardFront: newFront});

    }

    handleBackChange = (event) => {
        if (this.props.type !== "Normal") {
            return;
        }
        let newBack = event.target.value;
        this.setState({localCardBack: newBack});
        this.props.update(this.state.localCardFront, newBack, this.state.localCardHint, this.state.localCardDecks);

    }

    handleHintChange = (event) => {
        if (this.props.type !== "Normal") {
            return;
        }
        let newHint = event.target.value;
        this.setState({localCardHint: newHint});
        this.props.update(this.state.localCardFront, this.state.localCardBack, newHint, this.state.localCardDecks);

    }

    handleDecksChange = (event) => {
        if (this.props.type !== "Normal") {
            return;
        }
        let newDecks = event.target.value;
        this.setState({localCardDecks: newDecks});
        this.props.update(this.state.localCardFront, this.state.localCardBack, this.state.localCardHint, newDecks);
    }

    doNothing = (event) => {

    }

    render() {
        return (
            <div className="FlashCard" data-testid="FlashCard">
                <div className="FlashCardInner" data-testid="FlashCardInner" style={{transform: this.state.flipState ? "rotateX(180deg)": ""}}>
                    <div className="FlashCardFront">
                        <div>
                            <ul>
                                <li><span className="Dot"></span></li>
                                <li><input type="CardHint" data-testid="FlashCardFrontHint" placeholder="Notes/Hints" onChange={this.handleHintChange} value={this.props.cardHint} style={{opacity: this.props.type === "Quiz" ? "0": "1"}}></input></li>
                                <li><input type="CardDeck" data-testid="FlashCardFrontDeck" placeholder="Deck" onChange={this.handleDecksChange} className="CardDeck" value={this.props.cardDecks}></input></li>
                            </ul>
                        </div>
                        <input type="CardFrontText" data-testid="FlashCardFrontText" placeholder="Write" onChange = {this.props.type === "Normal" ? this.handleFrontChange : this.doNothing} value={this.props.frontText}></input>
                        <button className="FlipCardButton" onClick={this.flipCard}></button>
                    </div>
                    <div className="FlashCardBack">
                        <div>
                            <ul>
                                <li><span className="Dot"></span></li>
                                <li><input type="CardHint" data-testid="FlashCardBackHint" placeholder="Notes/Hints" onChange={this.handleHintChange} value={this.props.cardHint}></input></li>
                                <li><input type="CardDeck" data-testid="FlashCardBackDeck" placeholder="Deck" onChange={this.handleDecksChange} className="CardDeck" value={this.props.cardDecks}></input></li>
                            </ul>
                        </div>
                        <input type="CardFrontText" data-testid="FlashCardBackText" placeholder="Write Back" onChange = {this.handleBackChange} value={this.props.backText}></input>
                        <button className="FlipCardButton" onClick={this.flipCard}></button>
                    </div>
                </div>
            </div>
        );
    }

}
export default FlashCard