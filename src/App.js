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




//This is here to hold the entire collection. We will use the workingCardArray for various other things

let cardArray =  [
  {id: 0, cardColor: "Red", frontText: "front On2e!", backText: "back Onsdae!", cardHint: "cardHint One!", cardDecks: ["Apples", "Bananas"], accuracy: 0},
  {id: 1, cardColor: "Red", frontText: "front TW4o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples"], accuracy: 100},
  {id: 2, cardColor: "Red", frontText: "front TH3REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples"], accuracy: 40},
  {id: 3, cardColor: "Red", frontText: "front On6e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples"], accuracy: 75},
  {id: 4, cardColor: "Red", frontText: "front TW5o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples"], accuracy: 11},
  {id: 5, cardColor: "Red", frontText: "front THR7EE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples"], accuracy: 53},
  {id: 6, cardColor: "Red", frontText: "front On9e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples"], accuracy: 66},
  {id: 7, cardColor: "Red", frontText: "front TW8o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples"], accuracy: 14},
  {id: 8, cardColor: "Red", frontText: "front TH0REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples"], accuracy: 122},
  {id: 9, cardColor: "Red", frontText: "front On-e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples"], accuracy: 100},
  {id: 10, cardColor: "Red", frontText: "front T=Wo!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples"], accuracy: 5},
  {id: 11, cardColor: "Red", frontText: "front ThHREE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples"], accuracy: 1},
  {id: 12, cardColor: "Red", frontText: "front Oane!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples"], accuracy: 45},
  {id: 13, cardColor: "Red", frontText: "front TbWo!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples"], accuracy: 10},
  {id: 14, cardColor: "Red", frontText: "front THeREE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples"], accuracy: 30}
]


//Here we want to take filter the cardArray based on the currentFilterOptions and return it
function filterCardArray() {
  if (this.currentFilterOptions[0] === "All") {
    return cardArray;
  }
  else if (this.currentFilterOptions[1] === "DeckName") {
    return filterByDeck(this.currentFilterOptions[1]);
  }
}


//Takes in a deck name and then deletes every instance of 
function deleteDeck(deckName) {
  console.log("Trying to delete deck from App.js: ", deckName);
  let removeCardByIdList = [];
  for (let i = 0; i < cardArray.length; i++) {
    if (cardArray[i].cardDecks.includes(deckName)) {
      cardArray[i].cardDecks = cardArray[i].cardDecks.filter(deck => deck !== deckName);
      if (cardArray[i].cardDecks.length === 0) {
        removeCardByIdList.push(cardArray[i].id);
      }
    }
  }
  console.log("Removing ", removeCardByIdList.length, " cards");
  //Now we gotta go through again and remove cards with no deck
  cardArray = cardArray.filter(card => !removeCardByIdList.includes(card.id))
  updateDecksList();

}

//Takes in a string that is the name of the deck we are searching for
//and returns an array of cards matching that description.
function filterByDeck(deckName) {
  let returnDeck = [];
  for (let i = 0; i < cardArray.length; i++) {
    if (cardArray[i].cardDecks.includes(deckName)) {
      returnDeck.push(...cardArray[i])
    }
  }
  return returnDeck;
}


function updateDecksList() {
  //So here we want to go through each and every card in the ENTIRE collection, get a list of the Decks and make tempDecksList into that new list
  //A little inefficient, so best to only use this when deleting cards
  console.log("Updating Deck List!");
  let newDecksList = [];
  for (let i = 0; i < cardArray.length; i++) {
    for (let j = 0; j < cardArray[i].cardDecks.length; j++) {
      if (!newDecksList.includes(cardArray[i].cardDecks[j])) {
        newDecksList.push(cardArray[i].cardDecks[j].slice());
      }
    }
  }
  tempDecksList = newDecksList;

}

let tempDecksList = getDeckList();

function getDeckList() {
  let tempList = [];
  for (let i = 0; i < cardArray.length; i++) {
    for (let j = 0; j < cardArray[i].cardDecks.length; j++) {
      // console.log("Checking: ", cardArray[i].cardDecks[j]);
        if (!tempList.includes(cardArray[i].cardDecks[j])) {
            // console.log("Pushing!");
            tempList.push(cardArray[i].cardDecks[j].slice())
        }
    }
  }
  console.log("CurrentDeckList: ", tempList);
  return tempList;
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
  //Probably should update the deckList!
  console.log("Here is the current decks list: ", tempDecksList);
  for (let i = 0; i < newCard.cardDecks.length; i++) {
    console.log("Checking deck: ", newCard.cardDecks[i]);
    if (!tempDecksList.includes(newCard.cardDecks[i])) {
      tempDecksList.push(newCard.cardDecks[i]);
    }   
  }
}


//This was done before we added ids, probably best to update this!
function deleteCard(cFrontText, cBackText, cCardHint, cCardDecks) {
  console.log("Deleting card from the array in App.js: ", cFrontText);
  cardArray = cardArray.filter((card) => !(card.frontText === cFrontText && card.backText === cBackText && card.cardHint === cCardHint))
  //Now we should delete the deck if the number of cards is zero
  updateDecksList();
}



function studyByDeckHandler(deckName) {
  //Here we need to take in the name and send us over to the quiz page with a different working deck

  this.setCurrentPage("QuizPage");
}


function updateCard(card) {
  console.log("Finding and updating card from App.js ID: ", card.id);
  let index = 0;
  for (let i = 0; i < cardArray.length; i++) {
    if (cardArray[i].id === card.id) {
      index = i;
      console.log("Found Card to update!");
      break;
    }
  }
  cardArray[index].frontText = card.frontText;
  cardArray[index].backText = card.backText;
  cardArray[index].cardHint = card.cardHint;
  cardArray[index].cardDecks = card.cardDecks;
  console.log("New card:", cardArray[index]);
  updateDecksList();

}

function updateCollection(childCollection) {
  // console.log("This child collection from app.tsx length: " + childCollection.length)
  // console.log("Updating the collection to match a child component's state");
  cardArray = childCollection;
  updateDecksList();
}

export function updateAccuracy(card) {
  let index = 0;
  for (let i = 0; i < cardArray.length; i++) {
    if (cardArray[i].id === card.id) {
      index = i;
      console.log("Found Card to update!");
      break;
    }
  }
  cardArray[index].accuracy = cardArray[index].accuracy + 1;
}


function App() {
  const [page, setCurrentPage] = useState("HomePage");
  const [currentFilterOptions, setCurrentFilterOptions] = useState(["All", ""]);
  
  return (
    <div className="App">
      <div className="container" id="Home">
      <div className="navbar">
            <nav>
                <ul>
                    <a href="#" className="logobtn" onClick={() => setCurrentPage("HomePage")} id="goHomeButton" data-testid="goHomeButton">momento</a>
                    <li><a href = "#" onClick={() => setCurrentPage("DecksPage")} id="goDecksButton" data-testid="goDecksButton">Decks</a></li>
                    <li><a href = "#" onClick={() => {setCurrentFilterOptions(["All", ""]); setCurrentPage("QuizPage")}} id="goQuizButton" data-testid="goQuizButton">Quiz</a></li>
                    <li><a href = "#" id="goCollectionButton" onClick={() => {setCurrentFilterOptions(["All", ""]); setCurrentPage("CollectionPage")}} id="goCollectionButton" data-testid="goCollectionButton">Collection</a></li>
                    <li><a href="#" onClick={() => setCurrentPage("ImportPage")}>Import</a></li>
                    <a href="" className="signupbtn">Sign Up</a>
                </ul>
            </nav>
        </div>
        {page === "HomePage" && <HomePage cardType="FlashCard" addCard = {addCard}></HomePage>}
        {page === "DecksPage" && <DecksPage cardArray={cardArray} decksList={tempDecksList} downloadDeck={downloadDeck} setFilterOptions={setCurrentFilterOptions} setPage={setCurrentPage} deleteDeck={deleteDeck}></DecksPage>}
        {page === "CollectionPage" && <CollectPage cardArray ={cardArray} deleteCard = {deleteCard} updateCard = {updateCard} 
                                                parseInputs = {parseInputs} updateCollection={updateCollection}
                                                parseCardsToString={parseCardsToString}  filters={currentFilterOptions}}></CollectPage>}
        {page === "QuizPage" && <QuizPage cardArray={cardArray} filters={currentFilterOptions} updateAccuracy={updateAccuracy}></QuizPage>}

        {page === "ImportPage" && <ImportPage></ImportPage>}
      </div>
      </div>
  );
}

export default App;
