import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/HomePage.js";
import CollectPage from "./pages/CollectPage.js";
import QuizPage from "./pages/QuizPage.js";
import ImportPage from "./pages/ImportPage.js";
import DecksPage from "./pages/DecksPage.js";
import React, {useState} from 'react';
// import { Card } from "./interfaces/card";
import { cardEquality, arrayEquality, exportPath, deckEquality, stringToCard } from "./utils";
import { parseInputs, parseCardsToString } from './importExport';




//Just here for testing purposes. Each should have a different front from all the others
let cardArray =  [
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

let tempDecksList = ["Apples", "Bananas", "Pears", "Pineabpples", "Grapes", "Cherries"];

function getDeckList() {
  for (let i = 0; i < cardArray; i++) {
    for (let j = 0; j < cardArray[i].cardDecks.length; j++) {
        if (!tempDecksList.includes(cardArray[i].cardDecks[j])) {
            tempDecksList.push(cardArray[i].cardDecks[j].slice())
        }
    }
}
}

function downloadDeck(deckName) {
  console.log("Trying to download from app.js!");
}

//Remember to always add an id, just use the last id in the cardArray
function addCard(cFrontText, cBackText, cCardHint, cCardDecks) {
  console.log("Adding card in App.js. Got", cFrontText, " as front text");
  let newId = 0;
  if (cardArray.length === 0) { //Dont want to try to find the -1th element of cardArray
    newId = 0;
  }
  else {
    newId = cardArray[cardArray.length - 1].id + 1;
  }
  console.log("New Id is: ", newId);
  let newCard = {id: newId, cardColor: "Red", frontText: cFrontText, backText: cBackText, cardHint: cCardHint, cardDecks: cCardDecks};
  cardArray.push(newCard);
}


//This was done before we added ids, probably best to update this!
function deleteCard(cFrontText, cBackText, cCardHint, cCardDecks) {
  console.log("Deleting card from the array!");
  cardArray = cardArray.filter((card) => !(card.frontText === cFrontText && card.backText === cBackText && card.cardHint === cCardHint))
}


//Also done before Ids!
function updateCard(oldFront, oldBack, oldHint, oldDecks, newFront, newBack, newHint, newDecks) {
  console.log("Finding and updating card from App.js: oldFront: ", oldFront, " oldBack: ", oldBack, " oldHint: ", oldHint);
  let index = 0;
  for (let i = 0; i < cardArray.length; i++) {
    if (cardArray[i].frontText === oldFront && cardArray[i].backText === oldBack && cardArray[i].cardHint === oldHint) {
      index = i;
      console.log("Found Card to update!");
      break;
    }
  }
  cardArray[index].frontText = newFront;
  cardArray[index].backText = newBack;
  cardArray[index].cardHint = newHint;
  cardArray[index].cardDecks = newDecks;
  
}

function updateCollection(childCollection) {
  // console.log("This child collection from app.tsx length: " + childCollection.length)
  // console.log("Updating the collection to match a child component's state");
  cardArray = childCollection;
}


function App() {
  const [page, setCurrentPage] = useState("HomePage");

  
  return (
    <div className="App">
      <div className="container" id="Home">
      <div className="navbar">
            <nav>
                <ul>
                    <a href="#" className="logobtn" onClick={() => setCurrentPage("HomePage")} id="goHomeButton">momento</a>
                    <li><a href = "#" onClick={() => setCurrentPage("DecksPage")} id="goDecksButton">Decks</a></li>
                    <li><a href = "#" onClick={() => setCurrentPage("QuizPage")} id="goQuizButton">Quiz</a></li>
                    <li><a href = "#" id="goCollectionButton" onClick={() => setCurrentPage("CollectionPage")}>Collection</a></li>
                    <li><a href="#" onClick={() => setCurrentPage("ImportPage")}>Import</a></li>
                    <a href="" className="signupbtn">Sign Up</a>
                </ul>
            </nav>
        </div>
        {page === "HomePage" && <HomePage cardType="FlashCard" addCard = {addCard}></HomePage>}
        {page === "DecksPage" && <DecksPage cardArray={cardArray} decksList={tempDecksList} downloadDeck={downloadDeck}></DecksPage>}
        {page === "CollectionPage" && <CollectPage cardArray ={cardArray} deleteCard = {deleteCard} updateCard = {updateCard} 
                                                parseInputs = {parseInputs} updateCollection={updateCollection}
                                                parseCardsToString={parseCardsToString}></CollectPage>}
        {page === "QuizPage" && <QuizPage cardArray={cardArray}></QuizPage>}
        {page === "ImportPage" && <ImportPage></ImportPage>}
      </div>
      </div>
  );
}

export default App;
