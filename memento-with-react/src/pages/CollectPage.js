import React, {useState, Component} from "react";
import './CollectPage.css';
import CollTab from './components/Colltab.js'


class CollectPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cardArray: this.props.cardArray
        }
    }


    

    deleteHandler = (frontText, backText, cardHint) => {
        console.log("Time to delete card!");
        this.setState({cardArray: this.state.cardArray.filter((card) => (card.frontText !== frontText) || (card.backText !== backText))}
        );
        this.props.deleteCard(frontText, backText, cardHint);
        console.log(this.state.cardArray);
    }

    updateHandler = (oldFront, oldBack, oldHint, oldDecks, newFront, newBack, newHint, newDecks) => {
        this.props.updateCard(oldFront, oldBack, oldHint, oldDecks, newFront, newBack, newHint, newDecks);
        console.log("Finding and upating card from CollectPage.js: oldFront: ", oldFront, " oldBack: ", oldBack, " oldHint: ", oldHint);

        

        let tempCardArray = [...this.state.cardArray];
        let cardIndex = 0;
        for (let i = 0; i < tempCardArray.length; i++) {
            if (tempCardArray[i].front === oldFront && tempCardArray[i].back === oldBack) {
                cardIndex = i;
                break;
            }
        }

        let cardToChange = {...tempCardArray[cardIndex]};
        cardToChange.frontText = newFront;
        cardToChange.backText = newBack;
        cardToChange.cardHint = newHint;
        cardToChange.cardDecks = newDecks;

        tempCardArray[cardIndex] = cardToChange;
        this.setState({cardArray: tempCardArray});

        console.log("Time to update: ", oldFront);
    }

    render() {
    return (
        <div className= "collectionContainer">
            <p className = "title">Collection</p>
            <div className = "collectionWindow">
                <div>
                    {this.state.cardArray.map((card, index) => (
                        <CollTab key={card.frontText+card.backText+card.cardHint} frontText = {card.frontText} backText = {card.backText} cardHint = {card.cardHint} cardDecks = {card.cardDecks} deleted = {this.deleteHandler} updated = {this.updateHandler}></CollTab>
                    ))}
                </div>
            </div>
        </div>
    )};
}

export default CollectPage;