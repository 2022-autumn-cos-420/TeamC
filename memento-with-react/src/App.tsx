// import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/HomePage";
import CollectPage from "./pages/CollectPage";
import QuizPage from "./pages/QuizPage";
import ImportPage from "./pages/ImportPage";
import React, {useState} from 'react';
import { Card } from "./interfaces/card";
import { equal } from "assert";
import { cardEquality, arrayEquality, exportPath, deckEquality, stringToCard } from "./utils";
import { exportCards, importCards, loadCardsFromTxt} from "./importExport";


//Just here for testing purposes. Each should have a different front from all the others
let cardArray: Card[] =  [
  {id: 0, cardColor: "Red", frontText: "front On2e!", backText: "back Onsdae!", cardHint: "cardHint One!", cardDecks: ["Apples...", "Bananas"], accuracy: 0},
  {id: 1, cardColor: "Red", frontText: "front TW4o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 100},
  {id: 2, cardColor: "Red", frontText: "front TH3REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 40},
  {id: 3, cardColor: "Red", frontText: "front On6e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."], accuracy: 75},
  {id: 4, cardColor: "Red", frontText: "front TW5o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 11},
  {id: 5, cardColor: "Red", frontText: "front THR7EE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 53},
  {id: 6, cardColor: "Red", frontText: "front On9e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."], accuracy: 66},
  {id: 7, cardColor: "Red", frontText: "front TW8o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 14},
  {id: 8, cardColor: "Red", frontText: "front TH0REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 122},
  {id: 9, cardColor: "Red", frontText: "front On-e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."], accuracy: 100},
  {id: 10, cardColor: "Red", frontText: "front T=Wo!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 5},
  {id: 11, cardColor: "Red", frontText: "front ThHREE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 1},
  {id: 12, cardColor: "Red", frontText: "front Oane!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."], accuracy: 45},
  {id: 13, cardColor: "Red", frontText: "front TbWo!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 10},
  {id: 14, cardColor: "Red", frontText: "front THeREE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 30}
]

//! Changing this so that it doesn't assume a given order of the collection. Its marginally slower but more robust
//Remember to always add an id, just use the last id in the cardArray
function addCard(cFrontText: string, cBackText: string, cCardHint: string, cCardDeck: string): void {
    console.log("Adding card in App.ts. Got", cFrontText, " as front text");
    let maxId: number = -1;
    if (cardArray.length > 0) { //Dont want to try to find the -1th element of cardArray
        cardArray.map((card: Card): void => {
            if (card.id > maxId) {maxId = card.id}
        })
    }
    const newId: number = maxId + 1;
    console.log("New Id is: ", newId);
    let newCard = {id: newId, cardColor: "Red", frontText: cFrontText, backText: cBackText, cardHint: cCardHint, cardDecks: [cCardDeck], accuracy: 100};
    cardArray.push(newCard);
}

//! Simplified with utils.ts function, will need to change how the data is passed into it though
//This was done before we added ids, probably best to update this!
function deleteCard(targetCard: Card): void {
  console.log("Deleting card from the array!");
  cardArray = cardArray.filter((card: Card) => !cardEquality(card, targetCard))
}

//! Simplified with utils equality function and mapping, but will need to be changed again when we made cardArray a state variable
//!    because we'll need to use a setState function
//Also done before Ids!
function updateCard(targetCard: Card, newFront: string, newBack: string, newHint: string, newDecks: string[]): void {
    console.log("Finding and updating card from App.ts: oldFront: ", targetCard.frontText, " oldBack: ", targetCard.backText, " oldHint: ", targetCard.cardHint);
    cardArray.map((card: Card): void => {
        if (cardEquality(card, targetCard)){
            card.frontText = newFront;
            card.backText = newBack;
            card.cardHint = newHint;
            card.cardDecks = newDecks;
            console.log("Found Card to update!");
        }})
}


function App() {

    const [page, setCurrentPage] = useState("HomePage");
    //! Added "/#" for hrefs according to https://stackoverflow.com/questions/52801051/react-site-warning-the-href-attribute-requires-a-valid-address-provide-a-valid
    //! No clue if this was necessary, but it removed warnings
    return (
    <div className="App">
      <div className="container" id="Home">
      <div className="navbar">
            <nav>
                <ul>
                    <a href="/#" className="logobtn" onClick={() => setCurrentPage("HomePage")} id="goHomeButton">momento</a>
                    <li><a href = "/#" onClick={() => setCurrentPage("LibraryPage")} id="goLibraryButton">Library</a></li>
                    <li><a href = "/#" onClick={() => setCurrentPage("QuizPage")} id="goQuizButton">Quiz</a></li>
                    <li><a href = "/#" id="goCollectionButton" onClick={() => setCurrentPage("CollectionPage")}>Collection</a></li>
                    <li><a href="/#" onClick={() => setCurrentPage("ImportPage")}>Import</a></li>
                    <a href="/" className="signupbtn">Sign Up</a>
                </ul>
            </nav>
        </div>
        {page === "HomePage" && <HomePage cardType = "FlashCard" addCard = {addCard}></HomePage>}
        {page === "CollectionPage" && <CollectPage cardArray ={cardArray} deleteCard = {deleteCard} updateCard = {updateCard} importCards = {importCards} exportCards = {exportCards}></CollectPage>}
        {page === "QuizPage" && <QuizPage cardArray={cardArray}></QuizPage>}
        {page === "ImportPage" && <ImportPage></ImportPage>}
      </div>
      </div>
  );
}

export default App;
