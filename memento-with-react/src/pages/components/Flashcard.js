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
        console.log("Changing the front!");
        let newFront = event.target.value;
        this.setState({localCardFront: newFront});
        console.log("NewState for front: ", newFront);
        this.props.update(newFront, this.state.localCardBack, this.state.localCardHint, this.state.localCardDecks);

    }

    handleBackChange = (event) => {
        let newBack = event.target.value;
        this.setState({localCardBack: newBack});
        this.props.update(this.state.localCardFront, newBack, this.state.localCardHint, this.state.localCardDecks);

    }

    handleHintChange = (event) => {
        let newHint = event.target.value;
        this.setState({localCardHint: newHint});
        this.props.update(this.state.localCardFront, this.state.localCardBack, newHint, this.state.localCardDecks);

    }

    handleDecksChange = (event) => {
        let newDecks = event.target.value;
        this.setState({localCardDecks: newDecks});
        this.props.update(this.state.localCardFront, this.state.localCardBack, this.state.localCardHint, newDecks);
    }


    render() {
        return (
            <div className="FlashCard">
                <div className="FlashCardInner" style={{transform: this.state.flipState ? "rotateX(180deg)": ""}}>
                    <div className="FlashCardFront">
                        <top>
                            <ul>
                                <li><span className="Dot"></span></li>
                                <li><input type="CardHint" placeholder="Notes/Hints" onChange={this.handleHintChange} value={this.state.localCardHint}></input></li>
                                <li><input type="CardDeck" placeholder="Deck" onChange={this.handleDecksChange} className="CardDeck" value={this.state.localCardDecks}></input></li>
                            </ul>
                        </top>
                        <input type="CardFrontText" placeholder="Write" onChange = {this.handleFrontChange} value={this.state.localCardFront}></input>
                        <button className="FlipCardButton" onClick={this.flipCard}></button>
                    </div>
                    <div className="FlashCardBack">
                        <top>
                            <ul>
                                <li><span className="Dot"></span></li>
                                <li><input type="CardHint" placeholder="Notes/Hints" onChange={this.handleHintChange} value={this.state.localCardHint}></input></li>
                                <li><input type="CardDeck" placeholder="Deck" onChange={this.handleDecksChange} className="CardDeck" value={this.state.localCardDecks}></input></li>
                            </ul>
                        </top>
                        <input type="CardFrontText" placeholder="Write Back" onChange = {this.handleBackChange} value={this.state.localCardBack}></input>
                        <button className="FlipCardButton" onClick={this.flipCard}></button>
                    </div>
                </div>
            </div>
        );
    }

}
export default FlashCard