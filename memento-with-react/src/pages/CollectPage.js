import React, {useState, Component} from "react";
import './CollectPage.css';
import CollTab from './components/Colltab.js'
import styled from 'styled-components';


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

    //I really gotta rethink how I am dealing with props and state, but for now I am deleting stuff in state AND deleting stuff in app.js's cardArray
    deleteAllHandler() {
        console.log("Deleting all!");
        for (let i = 0; i < this.state.cardArray.length; i++) {
            this.props.deleteCard(this.state.cardArray[i].frontText, this.state.cardArray[i].backText, this.state.cardArray[i].cardHint)
            this.setState({cardArray: this.state.cardArray.filter((card) => card === "-1")});
        }
    }

    //Now for some magic!
    importHandler() {
        console.log("Time to import!");
        let fileName = prompt("Please Enter a file name: ", "");
        let deckName = prompt("Please Enter the deck you would like to import to: ", "");
        //Here is where the magic should begin
    }

    //And some more magic!
    exportHandler() {
        console.log("Time to export!");
        let fileName = prompt("Please Enter a file name to export to: ", "");
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
            <p className = "title">
                <p>Collection</p>
                <div className="ButtonBox">
                    <div className="ImportButton" onClick={() => this.importHandler()}><IconFolderOpen
                        src={`https://file.rendit.io/n/WXCzH8U22m3EMPlLJJUe.svg`}
                    />Import</div>
                    <div className="ExportButton" onClick={() => this.exportHandler()}><IconFolderOpen
                        src={`https://file.rendit.io/n/WXCzH8U22m3EMPlLJJUe.svg`}
                    />Export</div>
                    <div className="DeleteButton" onClick={() => this.deleteAllHandler()}><IconTrash
                        src={`https://file.rendit.io/n/AWXeYQKewibNjaYdcviF.svg`}
                    />Delete All</div>
                </div>
            </p>
            <div className = "collectionWindow">
                {this.state.cardArray.length > 0 && <div>
                    {this.state.cardArray.map((card) => (
                        <CollTab key={card.id} frontText = {card.frontText} backText = {card.backText} cardHint = {card.cardHint} cardDecks = {card.cardDecks} deleted = {this.deleteHandler} updated = {this.updateHandler}></CollTab>
                    ))}
                </div>}
                {this.state.cardArray.length === 0 && <div className="NoCardMessage">Looks like you have no cards... <br></br>Add cards on the Home Page, or import them here!</div>}
            </div>
        </div>
    )};
}


const IconTrash = styled.img`
  width: 11.2px;
  height: 14px;
`;

const IconFolderOpen = styled.img`
  width: 16px;
  height: 13px;
`;

export default CollectPage;