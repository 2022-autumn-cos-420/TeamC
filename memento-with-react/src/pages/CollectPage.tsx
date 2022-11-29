import React, {useState, Component} from "react";
import './CollectPage.css';
// import * as fs from "fs";
import CollTab from './components/Colltab'
import styled from 'styled-components';
import { Card } from "../interfaces/card";
import { cardEquality, arrayEquality, exportPath, deckEquality, stringToCard } from "../utils";
// import { exportCards } from "../importExport";
import ImportCard from './components/Importcard';
import ExportCard from './components/Exportcard';


interface Props {
    cardArray: Card[]; 
    deleteCard: (targetCard: Card) => void;
    updateCard: (targetCard: Card, newFront: string, newBack: string, newHint: string, newDecks: string[]) => void;
    exportCards: ( cards: Card[], fileName: string, deckID: string ) => boolean;
    parseInputs: (filePath: string, collection: Card[], deckName: string ) => Card[];
    updateCollection: (childCollection: Card[]) => void;
    parseCardsToString: ( cards: Card[], deckID: string) => string;
};
interface State {
    cardArray: Card[],
    importShow: boolean,
    exportShow: boolean,
    exportSuccess: boolean
};

class CollectPage extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            cardArray: this.props.cardArray,
            importShow: false,
            exportShow: false,
            exportSuccess: false
        }
    }


    

    deleteHandler = (targetCard: Card) => {
        console.log("Time to delete card!");
        this.setState({cardArray: this.state.cardArray.filter((card: Card) => !cardEquality(card, targetCard))}
        );
        this.props.deleteCard(targetCard);
        console.log(this.state.cardArray);
    }

    //I really gotta rethink how I am dealing with props and state, but for now I am deleting stuff in state AND deleting stuff in app.js's cardArray
    deleteAllHandler() {
        console.log("Deleting all!");
        for (let i = 0; i < this.state.cardArray.length; i++) {
            this.props.deleteCard(this.state.cardArray[i])
        }
        this.setState({cardArray: []});
    }

    importToggle() {
        this.setState({importShow: !this.state.importShow}, () =>{
            this.setState({exportShow: !this.state.importShow});
        });
    }
    exportToggle() {
        this.setState({exportShow: !this.state.exportShow}, () => {
            this.setState({importShow: !this.state.exportShow});
        });
    }
    //Now for some magic!
    importHandler = (passedCollection: Card[]) => {
        // console.log("Time to import!");
        // console.log(passedCollection[0].frontText);
        this.setState({cardArray: passedCollection}, () => {
            this.props.updateCollection(passedCollection)
        });
    }

    //And some more magic!
    downloadCollection = (fileName: string) => {
        console.log(fileName);
        console.log(this.state.cardArray);
        const element = document.createElement("a");
        const collectionString: string = this.props.parseCardsToString(this.state.cardArray,"");
        console.log(collectionString.length);
        const file = new Blob([collectionString], {
          type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
        this.setState({exportSuccess: true});
    };
    
    updateHandler = (oldCard: Card, newFront: string, newBack: string, newHint:string, newDecks: string[]) => {
        this.props.updateCard(oldCard, newFront, newBack, newHint, newDecks);
        console.log("Finding and upating card from CollectPage.js: oldFront: ", oldCard.frontText, " oldBack: ", oldCard.backText, " oldHint: ", oldCard.cardHint);

        let tempCardArray = [...this.state.cardArray];
        let cardIndex = 0;
        for (let i = 0; i < tempCardArray.length; i++) {
            if (cardEquality(tempCardArray[i], oldCard)) {
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

        console.log("Time to update: ", oldCard.frontText);
    }

    render() {
    return (
        <div className= "collectionContainer">
            <div className = "title">
                <div>
                    Collection
                    {this.state.importShow && <ImportCard collection={this.state.cardArray} parseInputs={this.props.parseInputs} updateCollection={this.importHandler} />}
                    {this.state.exportShow && <ExportCard downloadCollection={this.downloadCollection} />}
                    {this.state.exportSuccess && <div>Exported Successfully</div>}
                </div>
                <div className="ButtonBox">
                    <div className="ImportButton" onClick={() => this.importToggle()}> <IconFolderOpen 
                    src={`https://file.rendit.io/n/WXCzH8U22m3EMPlLJJUe.svg`} 
                    />Import Cards</div>
                    <div className="ExportButton" onClick={() => this.exportToggle()}><IconFolderOpen
                        src={`https://file.rendit.io/n/WXCzH8U22m3EMPlLJJUe.svg`}
                    />Export Collection</div>
                    <div className="DeleteButton" onClick={() => this.deleteAllHandler()}><IconTrash
                        src={`https://file.rendit.io/n/AWXeYQKewibNjaYdcviF.svg`}
                    />Delete All</div>
                </div>
            </div>
            <div className = "collectionWindow">
                {this.state.cardArray.length > 0 &&
                    <div>
                        {this.state.cardArray.map((mapCard: Card) => (
                            <CollTab key = {mapCard.id} card = {mapCard} deleted = {this.deleteHandler} updated = {this.updateHandler}></CollTab>
                        ))}
                    </div>}
                {this.state.cardArray.length === 0 && <div className="NoCardMessage">Looks like you have no cards... <br></br>Add cards on the Home Page, or import them here!</div>}
            </div>
            <div> {"Cards: " + this.state.cardArray.length} </div>
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