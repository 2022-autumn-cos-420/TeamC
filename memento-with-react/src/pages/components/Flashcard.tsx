import React, {ChangeEvent, Component, PropsWithChildren} from 'react';
import './Flashcard.css';

interface Props {
    type: string,
    frontText: string,
    backText: string,
    cardHint: string,
    cardDeck: string,
    update: (newFront: string, newBack: string, newHint: string, newDeck: string) => void
};
interface State {
    side: string,
    type: string,
    localCardFront: string,
    localCardBack: string,
    localcardDeck: string,
    localCardHint: string,
    flipState: boolean
};


class FlashCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            side: "front",
            type: this.props.type,
            localCardFront: this.props.frontText,
            localCardBack: this.props.backText,
            localcardDeck: this.props.cardDeck,
            localCardHint: this.props.cardHint,
            flipState: false
        }
        this.flipCard = this.flipCard.bind(this);
    }

    flipCard = () => {
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

    handleFrontChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.type !== "Normal") {
            return;
        }
        console.log("Changing the front!");
        let newFront = event.currentTarget.value;
        this.setState({localCardFront: newFront});
        console.log("NewState for front: ", newFront);
        this.props.update(newFront, this.state.localCardBack, this.state.localCardHint, this.state.localcardDeck);

    }

    handleBackChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.type !== "Normal") {
            return;
        }
        let newBack = event.currentTarget.value;
        this.setState({localCardBack: newBack});
        this.props.update(this.state.localCardFront, newBack, this.state.localCardHint, this.state.localcardDeck);

    }

    handleHintChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.type !== "Normal") {
            return;
        }
        let newHint = event.currentTarget.value;
        this.setState({localCardHint: newHint});
        this.props.update(this.state.localCardFront, this.state.localCardBack, newHint, this.state.localcardDeck);

    }

    handleDecksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.type !== "Normal") {
            return;
        }
        let newDecks = event.currentTarget.value;
        this.setState({localcardDeck: newDecks});
        this.props.update(this.state.localCardFront, this.state.localCardBack, this.state.localCardHint, newDecks);
    }


    render() {
        return (
            <div className="FlashCard">
                <div className="FlashCardInner" style={{transform: this.state.flipState ? "rotateX(180deg)": ""}}>
                    <div className="FlashCardFront">
                        {/* <top> */}
                        <ul>
                            <li><span className="Dot"></span></li>
                            <li><input type="CardHint" placeholder="Notes/Hints" onChange={this.handleHintChange} value={this.props.cardHint} style={{opacity: this.props.type === "Quiz" ? "0": "1"}}></input></li>
                            <li><input type="CardDeck" placeholder="Deck" onChange={this.handleDecksChange} className="CardDeck" value={this.props.cardDeck}></input></li>
                        </ul>
                        {/* </top> */}
                        <input type="CardFrontText" placeholder="Write" onChange = {this.handleFrontChange} value={this.props.frontText}></input>
                        <button className="FlipCardButton" onClick={this.flipCard}></button>
                    </div>
                    <div className="FlashCardBack">
                        {/* <top> */}
                        <ul>
                            <li><span className="Dot"></span></li>
                            <li><input type="CardHint" placeholder="Notes/Hints" onChange={this.handleHintChange} value={this.props.cardHint}></input></li>
                            <li><input type="CardDeck" placeholder="Deck" onChange={this.handleDecksChange} className="CardDeck" value={this.props.cardDeck}></input></li>
                        </ul>
                        {/* </top> */}
                        <input type="CardFrontText" placeholder="Write Back" onChange = {this.handleBackChange} value={this.props.backText}></input>
                        <button className="FlipCardButton" onClick={this.flipCard}></button>
                    </div>
                </div>
            </div>
        );
    }

}
export default FlashCard