//Elements of a card for the moment, there will be plenty of extra data to add later on
class Card {
    constructor(frontText, backText, cardDesc) {
        this.frontText = frontText;
        this.backText = backText;
        this.cardDesc = cardDesc;    
    }
}


//CardDeck Class, meant to hold an array of the cards along with its own name, color of the dot, and any other
//relevent data eventually
class CardDeck {
    constructor(color, deckName) {
        //Will be a string probably
        this.color = color;
        //Will be a string
        this.deckName = deckName;
        //Using the Card class
        cardArray = [];
    }
}

//Should contain an array of decks, potentially user information?
class Library {
    constructor(deck) {
        const decks = [];
        decks.push(deck);
    }
}


defaultDeck = new CardDeck("purple", "starterDeck");
defaultLibrary = new Library(defaultDeck);

function dispLibrary(page) {
    //There will be at max 2 rows of decks per page and 2 decks per row.
    //We need to take the page number (It should always start at 1)
    //And use that to determine how many we are displaying and how to display the correct number of rows + cols
    //Or alternatively have a blank card that lets the user add a deck - would simplify formatting.
    document.getElementById("deckCardNumCards1").innerHTML = (defaultLibrary.decks[0].length);
    
}

function dispDeck(name) {
    //Display the deck, probably will be under the library page
}



function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed";

}

//Flip to back and flip to front update the class/details section and then flip the card
//If there is any other updating that needs to occur when we flip the card, here is 
//where we should do it
function flipToFront() {
    var backDetails = document.getElementById("cardDetailsBackIn").value;
    document.getElementById("cardDetailsFrontIn").value = backDetails;
    flipCard();
}

function flipToBack() {
    var frontDetails = document.getElementById("cardDetailsFrontIn").value;
    document.getElementById("cardDetailsBackIn").value = frontDetails;
    flipCard();
}

function flipCard() {
    var card = document.getElementById("flashcard-inner");
    card.classList.toggle("flipCard");
}




function addCard() {
//Here we need to save all the values in the current card to the stack and then nuke the contents of the text boxes
    var frontSideText = document.getElementById("cardFrontTextIn");
    var backSideText = document.getElementById("cardBackTextIn");
    var cardDetailsFront = document.getElementById("cardDetailsFrontIn");
    var cardDetailsBack = document.getElementById("cardDetailsBackIn");
//Now to clear all the values:
    document.getElementById("cardFrontTextIn").value = "";
    document.getElementById("cardBackTextIn").value = "";
    document.getElementById("cardDetailsFrontIn").value = "";
    document.getElementById("cardDetailsBackIn").value = "";
    tempCard = new Card(frontSideText, backSideText, cardDetailsFront);
    defaultLibrary.decks[0].push(tempCard);
}
