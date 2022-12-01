import React, {useState, Component} from "react";
import './CollectPage.css';
import CollTab from './components/Colltab.js'
import styled from 'styled-components';
import ImportCard from './components/Importcard';
import ExportCard from './components/Exportcard';


// interface Props {
//     cardArray: Card[]; 
//     deleteCard: (targetCard: Card) => void;
//     updateCard: (targetCard: Card, newFront: string, newBack: string, newHint: string, newDecks: string[]) => void;
//     exportCards: ( cards: Card[], fileName: string, deckID: string ) => boolean;
//     parseInputs: (filePath: string, collection: Card[], deckName: string ) => Card[];
//     updateCollection: (childCollection: Card[]) => void;
//     parseCardsToString: ( cards: Card[], deckID: string) => string;
// };
// interface State {
//     cardArray: Card[],
//     importShow: boolean,
//     exportShow: boolean,
//     exportSuccess: boolean
// };

class CollectPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cardArray: this.props.cardArray,
            importShow: false,
            exportShow: false,
            exportSuccess: false
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

    importToggle() {
        this.setState({importShow: !this.state.importShow}, () =>{
            if (this.state.importShow){
                this.setState({exportShow: !this.state.importShow});
            }
        });
    }
    exportToggle() {
        this.setState({exportShow: !this.state.exportShow}, () => {
            if (this.state.exportShow) {
                this.setState({importShow: !this.state.exportShow});
            }
        });
    }
    //Now for some magic!
    importHandler = (passedCollection) => {
        // console.log("Time to import!");
        // console.log(passedCollection[0].frontText);
        this.setState({cardArray: passedCollection}, () => {
            this.props.updateCollection(passedCollection)
        });
    }

    //And some more magic!
    downloadCollection = (fileName) => {
        const element = document.createElement("a");
        const collectionString = this.props.parseCardsToString(this.state.cardArray,"");
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
                <div>
                    Collection
                    {this.state.importShow && <ImportCard propCollection={this.state.cardArray} parseInputs={this.props.parseInputs} updateCollection={this.importHandler} />}
                    {this.state.exportShow && <ExportCard downloadCollection={this.downloadCollection} />}
                    {this.state.exportSuccess && <div>{"Exported Successfully: " + this.state.cardArray.length + " cards"}</div>}
                </div>
                <div className="ButtonBox">
                    <div className="ImportButton" onClick={() => this.importToggle()}> <IconFolderOpen 
                    src={`https://file.rendit.io/n/WXCzH8U22m3EMPlLJJUe.svg`} 
                    />Import Cards</div>
                    <div data-testid="exportToggle" className="ExportButton" onClick={() => this.exportToggle()}><IconFolderOpen
                        src={`https://file.rendit.io/n/WXCzH8U22m3EMPlLJJUe.svg`}
                    />Export Collection</div>
                    <div className="DeleteButton" onClick={() => this.deleteAllHandler()}><IconTrash
                        src={`https://file.rendit.io/n/AWXeYQKewibNjaYdcviF.svg`}
                    />Delete All</div>
                </div>
            </p>
            <div className = "collectionWindow">
                {this.state.cardArray.length > 0 && <div>
                    {this.state.cardArray.map((mapCard) => (
                        // <CollTab key={card.id} frontText = {card.frontText} backText = {card.backText} cardHint = {card.cardHint} cardDecks = {card.cardDecks} deleted = {this.deleteHandler} updated = {this.updateHandler}></CollTab>
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