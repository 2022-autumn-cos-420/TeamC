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
            flipState: this.props.flipState,
            showHint: this.props.showHint
        }
    }


    flipCardHandler = (event) => {
        console.log("Trying flipCardHandler");
        this.props.flipCard();
    }

    handleFrontChange = (event) => {
        if (this.props.type !== "Normal") {
            return;
        }
        let newFront = event.target.value;
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

    toggleShowHint = (event) => {
        if (this.state.showHint === true) {
            this.setState({showHint: false})

        } else {
            this.setState({showHint: true})
        }
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

    toggleShowHintHandler = (event) => {
        this.props.showHintToggler();
    }


    render() 
        {
        
        const hintHiddenStyle = {
            animation: 'fadeout .8s forwards'
        }
        const hintShownStyle = {
            animation: 'fadein .8s forwards'
        }

        const hintAlwaysShow = {
            animation: 'none'
        }

        const neverShow = {
            animation: 'none',
            opacity: 0
        }

        const flashCardFlyOut = {
            animation: 'flyout 1s forwards'
        }
        const flashCardFlyIn = {
            animation: 'flyin 1s forwards'
        }
        return (
            <div className="FlashCard" data-testid="FlashCard">
                <div className="FlashCardInner" data-testid="FlashCardInner" style={{transform: this.props.flipState ? "rotateX(180deg)": ""}}>
                    <div className="FlashCardFront">
                        <div>
                            <ul>
                                <li><span className="Dot" onClick={this.toggleShowHintHandler}></span></li>
                                <li><input type="CardHint" data-testid="FlashCardFrontHint" placeholder="Notes/Hints" onChange={this.handleHintChange} value={this.props.cardHint} style={this.props.type === "Quiz" ? (this.props.showHint === false ? hintHiddenStyle : hintShownStyle) : hintAlwaysShow}></input></li>
                                <li><input type="CardDeck" data-testid="FlashCardFrontDeck" placeholder="Deck" onChange={this.handleDecksChange} className="CardDeck" value={this.props.cardDecks}></input></li>
                            </ul>
                        </div>
                        <input type="CardFrontText" data-testid="FlashCardFrontText" placeholder="Write" onChange = {this.props.type === "Normal" ? this.handleFrontChange : this.doNothing} value={this.props.frontText}></input>
                        <button className="FlipCardButton" onClick={this.props.flipCard}></button>
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
                        <button className="FlipCardButton" onClick={this.props.flipCard}></button>
                    </div>
                </div>
            </div>
        );
    }

}
export default FlashCard