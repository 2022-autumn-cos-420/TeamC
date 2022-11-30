const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexededDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;
//We eventually want to be able figure out if the user has a database in their browser
//And probably go from where we left off
const cardDBName = "flashCardDatabase1";
const defaultColor = "red";
const defaultDeck = "Deck 1";
const request = indexedDB.open(cardDBName, 1);

const defaultCard = {
    color: "red",
    frontText: "defaultFront",
    backText: "defaultBack",
    desc: "defaultDesc",
    deck: "defaultDeck"
};

//This is an array of all of the cards in the entire database, it is updated
//along with the database every time a user adds a card and is automatically
//populated when the program starts
let cardLibArray = [];
//This is an array of all of the cards that we are currently working with
//Currently used for the quiz, but any time we want to work with a cards of
//a particular type we can put them in here
//For example, all cards in Anthony'sDeck1 can go here and we can quiz with just these cards
//Alternatively we can populate it with cards that matched a certain text search or anything really
let workingDeck = [];
let workingPos = 0;

//Working with this to tell if we are on the front or the back side of a card
//Used for quizzing, so that we know where to direct the information
let quizCardSide = "front";

let flashCardSide = "front";

const goHomeButton = document.getElementById("goHomeButton");
const goLibraryButton = document.getElementById("goLibraryButton");
const goQuizButton = document.getElementById("goQuizButton");


const homePage = document.getElementById("flashcardCreatePage");
const libraryPage = document.getElementById("libraryContainerId");
const quizPage = document.getElementById("quizContainerId");

const pageList = [homePage, libraryPage];

let quizCardHintDisplay = true;
toggleHintVisibility();

toggleFlashcardMode(); //This needs to be performed on page load or else sometimes the toggle switch will be
//in the previous state, but the flashcard input type will be Basic still



//We need to start the app with every page turned off except for the home page!

//--------------__JUST FOR TESTING, NEED TO INCLUDE IN A MORE MODULAR APPROACH EVENTUALLY! --------
function displayLibrary() {
    homePage.style.display = "none";
    quizPage.style.display = "none";
    libraryPage.style.display = "block";
    dispLibraryByPage(1) //Page 1
}

function displayHome() {
    libraryPage.style.display = "none";
    quizPage.style.display = "none";
    homePage.style.display = "block";
    clearFlashCard();
}

function displayQuiz() {
    homePage.style.display = "none";
    libraryPage.style.display = "none";
    quizPage.style.display = "block";
    //WE NEED TO CHANGE THIS SOON!
    quizByDeck(workingDeck); // Currently only gets the first deck in the decks array
}

function displayEdit() {
    homePage.style.display = "none";
    libraryPage.style.display = "none";
    quizPage.style.display = "none";
    editPage.style.display = "block";
    editDeck();
}

goLibraryButton.onclick = function() {
    displayLibrary();
}
goHomeButton.onclick = function() {
    displayHome();
}
goQuizButton.onclick = function() {
    displayQuiz();
}

 




document.getElementById("libraryContainerId").style.display = "none";
document.getElementById("quizContainerId").style.display = "none";

//Boilerplate for indexDB
request.onerror = function (event) {
    console.error("an error occured with IndexedDB");
    console.error(event);
}



request.onupgradeneeded = function () {
    console.log("No user data to work with!");
    const db = request.result;
    const store = db.createObjectStore("cards", {keyPath: "id", autoIncrement: true, unique: true});
    store.createIndex("cardsFrontText", ["frontText"], {unique: false});
    store.createIndex("cardsBackText", ["backText"], {unique: false})
    store.createIndex("cardsDescription", ["cardDesc"], {unique: false});
    store.createIndex("cardsColor", ["cardColor"], {unique: false});
    store.createIndex("cardsDeck", ["cardDeck"], {unique: false});
    //We do not really need to worry about compound indexes at the moment
};

request.onsuccess = function() {
    console.log("Database opened successfully");
    const db = request.result;
    const transaction = db.transaction("cards", "readwrite");
    //2
    const store = transaction.objectStore("cards");
    const colorIndex = store.index("cardsColor");
    const frontIndex = store.index("cardsFrontText");
    const backIndex = store.index("cardsBackText");
    const descIndex = store.index("cardsDescription");
    const deckIndex = store.index("cardsDeck");
    dataBaseToArray(); // Get all of the data and turn it into an array that we can use
}


//Takes in a page number starting at 1
function dispLibraryByPage(page) {
    firstDeckToDisp = (page * 4 - 3);
    lastDeckToDisp = (page * 4);
    let deckList = getListOfDecksArray();
    console.log("dispLibraryByPage DeckList:", deckList);
    //If we cannot fill a page up, we must know where to stop
    if ((deckList.length - 1) < lastDeckToDisp) {
        lastDeckToDisp = deckList.length;
    }
    for (let i = firstDeckToDisp; i <= lastDeckToDisp; i++) {
        deckNameElement = "deckCardDispName" + i;
        deckLengthElement = "deckCardNumCards" + i;
        document.getElementById(deckNameElement).innerHTML = (deckList[i - 1]);
        document.getElementById(deckLengthElement).innerHTML = ("cards: " + getLengthOfDeck(deckList[i - 1]));
    }
}

function toggleHintVisibility() {
    //This is called when the dot on the quiz section gets pressed
    hint1 = document.getElementById("cardDetailsFront");
    hint2 = document.getElementById("cardDetailsBack");
    if (quizCardHintDisplay === true) {
        hint1.style.display = "none";
        hint2.style.display = "none";
        quizCardHintDisplay = false;
        console.log("Turning false");
        return;
    }
    else {
        hint1.style.display = "block";
        hint2.style.display = "block";
        quizCardHintDisplay = true;
        console.log("Turning true!");
    }
}


//Here we will be able to change the working deck to what we want on the library page
document.getElementById("deckCardDispName1").onclick = function() {
    workingDeck = getListOfCardsByDeck(document.getElementById("deckCardDispName1").innerHTML);
}
document.getElementById("deckCardDispName2").onclick = function() {
    workingDeck = getListOfCardsByDeck(document.getElementById("deckCardDispName2").innerHTML);
}



//Flip to back and flip to front update the class/details section and then flip the card
//If there is any other updating that needs to occur when we flip the card, here is 
//where we should do it
function flipToFront() {
    var backDetails = document.getElementById("cardDetailsBackIn").value;
    var backDeck = document.getElementById("cardDeckBackIn").value;
    document.getElementById("cardDetailsFrontIn").value = backDetails;
    document.getElementById("cardDeckFrontIn").value = backDeck;
    flashCardSide = "front";
    flipCard();
}

function flipToBack() {
    var frontDetails = document.getElementById("cardDetailsFrontIn").value;
    var frontDeck = document.getElementById("cardDeckFrontIn").value;
    document.getElementById("cardDetailsBackIn").value = frontDetails;
    document.getElementById("cardDeckBackIn").value = frontDeck;
    flashCardSide = "back";
    flipCard();
}

function flipCard() {
    var card = document.getElementById("flashcard-inner");
    card.classList.toggle("flipCard");
}



//This is for the Quiz card:
function flipQuizCard() {
    var card = document.getElementById("quizCard-inner");
    card.classList.toggle("flipQuizCard");
}
function flipQuizCardToFront() {
    quizCardSide = "front";
    flipQuizCard();
}
function flipQuizCardToBack() {
    quizCardSide = "back";
    flipQuizCard();
}



function toggleFlashcardMode() {
    var toggleSwitch = document.getElementById("flashcardParseModeSwitch");
    var flashcardBasicMode = document.getElementById("flashcard");
    var flashcardParseMode = document.getElementById("flashcardTextInput");
    console.log("STATE OF TOGGLE:", toggleSwitch.checked);
    if (toggleSwitch.checked == true) {
        flashcardParseMode.style.display = "flex";
        flashcardBasicMode.style.display = "none";
    }
    else {
        flashcardParseMode.style.display = "none";
        flashcardBasicMode.style.display = "flex";
    }
}

function parseNotes() {
    var parsetext = document.getElementById("flashcardTextInputTextBox").value;
    console.log(parsetext);
    var startIndex = parsetext.indexOf('{');
    var separator;
    var separatorIndex;
    var endIndex = parsetext.indexOf('}');

    if (startIndex != -1){
        separator = parsetext.substring(startIndex);
        console.log(separator);
        separatorIndex = separator.indexOf(':')+startIndex;
        console.log(startIndex,separatorIndex,endIndex);
        console.log(parsetext.charAt(6),parsetext.charAt(326));
    } else {separatorIndex = parsetext.indexOf(':');}
    //String that we need to add to flashcard
    var parsehit;
    var instances = 0;
    // The line will be parsed if two requirements are met:
    // 1. All of the needed delimiters are present (not equal to -1 index)
     // 2. It's in the correct format: start char, separator, end char
    while ((startIndex != -1 || endIndex != -1 || separatorIndex != -1)
            && (startIndex < separatorIndex && separatorIndex < endIndex)) { 
        parsehit = parsetext.substring(startIndex+1, endIndex);
        console.log(parsehit,"Shall be added to the flashcard deck in front:back format");
        console.log(startIndex,endIndex,separatorIndex);
        //split parsehit string between front and back
        var front = parsehit.substring(0,parsehit.indexOf(':'));
        var back = parsehit.substring(parsehit.indexOf(':')+1);
        console.log(front,back);


        addCardToCardDB(defaultColor, front, back, cardDetailsParseMode.value, cardDeckParseMode.value);
        addCardToCardArray(defaultColor, front, back, cardDetailsParseMode.value, cardDeckParseMode.value);
        //continue parsing for more occurances
        parsetext = parsetext.substring(endIndex+1);
        startIndex = parsetext.indexOf('{');
        if (startIndex != -1){
            separator = parsetext.substring(startIndex);
            separatorIndex = separator.indexOf(':')+startIndex;
        } else {separatorIndex = parsetext.indexOf(':');}
        endIndex = parsetext.indexOf('}');
        instances++;
    }
    if (instances == 0) {
        console.log("Invalid text field for parsing");
        document.getElementById("addCardButton").style.animation = "horizontal-shaking .5s";
    }
}

//Need to implement a way to see if one of the text fields is empty and not
//allow the user to add a card to the deck
//Probably should also flash the text box that isn't filled in
//Alternatively we could just grey out the addCard button until the user
//Fills out all places
function addCard() {
//Here we need to save all the values in the current card to the stack and then nuke the contents of the text boxes
    document.getElementById("addCardButton").style.animation  = "none";
    document.getElementById("addCardButton").offsetHeight;
    var frontSideText = document.getElementById("cardFrontTextIn").value;
    var backSideText = document.getElementById("cardBackTextIn").value;
    if (flashCardSide === "front") {
        var cardDetails = document.getElementById("cardDetailsFrontIn").value;
        var cardDeck = document.getElementById("cardDeckFrontIn").value;
    }
    else if (flashCardSide == "back") {
        var cardDetails = document.getElementById("cardDetailsBackIn").value;
        var cardDeck = document.getElementById("cardDeckBackIn").value;
        flipCard();
    }

    /////NEWLY ADDED CODE FOR PARSING
    var toggleSwitch = document.getElementById("flashcardParseModeSwitch");
    if (toggleSwitch.checked == true) {
         //Check if all fields are entered
        if (cardDeckParseMode.value == "" || cardDetailsParseMode.value == "") {
            document.getElementById("addCardButton").style.animation = "horizontal-shaking .5s";
            return;
        }
        else { 
            parseNotes();
            return;
        }
    }
    ///////

    //Check if all fields are entered
    if (cardDeck === "" || cardDetails === "" || backSideText === "" || frontSideText === "") {
        document.getElementById("addCardButton").style.animation = "horizontal-shaking .5s";
        return;
        //WE DO NOT WANT THE USER TO INPUT BLANK CARDS, THAT WILL MESS STUFF UP LIKE CRAZY
    }
    
//Now to clear all the values:
//Except for the deck value in case the user wants to add cards to the same deck
    document.getElementById("cardFrontTextIn").value = "";
    document.getElementById("cardBackTextIn").value = "";
    document.getElementById("cardDetailsFrontIn").value = "";
    document.getElementById("cardDetailsBackIn").value = "";
    //Here we are adding to the array and to the database
    //The array so that we can work with the data easily, and the database in case our
    //use closes their tab without saving their data, they can still have it
    addCardToCardDB(defaultColor, frontSideText, backSideText, cardDetails, cardDeck);
    addCardToCardArray(defaultColor, frontSideText, backSideText, cardDetails, cardDeck);
}


function clearFlashCard() { 
    document.getElementById("cardFrontTextIn").value = "";
    document.getElementById("cardBackTextIn").value = "";
    document.getElementById("cardDetailsFrontIn").value = "";
    document.getElementById("cardDetailsBackIn").value = "";
}

//Pushes card to the card array
function addCardToCardArray(cColor, cFrontText, cBackText, cDesc, cDeck) {
    let newCard = {
        color: cColor,
        frontText: cFrontText,
        backText: cBackText,
        desc: cDesc,
        deck: cDeck
    };
    cardLibArray.push(newCard);
}




//Now for some of the indexedDB functions:
//Adds a card to the database, expects all strings
function addCardToDB(cColor, cFrontText, cBackText, cDesc, cDeck) {
    const db = request.result;
    const transaction = db.transaction("cards", "readwrite");
    const store = transaction.objectStore("cards");
    store.add({cardColor: cColor, frontText: cFrontText, backText: cBackText, cardDesc: cDesc, cardDeck: cDeck});
    console.log("Card added!");
}

//New add function, I think this is what we are eventually going to switch to for DB entry
function addCardToCardDB(cColor, cfrontText, cbackText, cDesc, cDeck) {
    //Make the db eventually global so we dont have to keep declaring it
    const db = request.result;
    const transaction = db.transaction("cards", "readwrite");
    transaction.oncomplete = (ev) => {
        console.log(ev);
        //This is where we would do something that relies on the transaction finishing first.
        //The transaction automatically completes itself once all requests are done with it, so there is no reason
        //To call the commit function
        //Probably where we would clear out the data on the flashcard
    }
    const store = transaction.objectStore("cards");
    let addRequest = store.add({cardColor: cColor, frontText: cfrontText, backText: cbackText, cardDesc: cDesc, cardDeck: cDeck});
    addRequest.onsuccess = (ev) => {
        console.log("Succesfully added a card!");
    }
    addRequest.onerror = (ev) => {
        console.log("There was a problem adding a card!");
    }
}




//The purpose of this will eventually be to add cards to decks
function addCardToDecks(card, deckNames) {

}

//The purpose of this will eventually be to remove a card from a deck of cards
function removeCardFromDeck(card, deckName) {

}

//Uses our global array to get a list of the different decks
function getListOfDecksArray() {
    let deckArray = [];
    for (let i = 0; i < cardLibArray.length; i++) {
        if (deckArray.includes(cardLibArray[i].deck)) {
            //Do nothing
        }
        else {
            deckArray.push(cardLibArray[i].deck);
        }
    }
    console.log("Different decks in the array include: ", deckArray);
    return deckArray;
}

//Takes in a string and returns an array of the cards in that particular deck
function getListOfCardsByDeck(deckName) {
    let cardArray = [];
    for (let i = 0; i < cardLibArray.length; i++) {
        if (cardLibArray[i].deck === deckName) {
            cardArray.push(cardLibArray[i]);
        }
    }
    return cardArray;
}

//Takes in a string and returns the number of cards in that deck
function getLengthOfDeck(deckName) {
    let deckLength = 0;
    for (let i = 0; i < cardLibArray.length; i++) {
        if (cardLibArray[i].deck == deckName) {
            deckLength++;
        }
    }
    return deckLength;
}




//Quiz loop:
//Start with an array either of the current working deck that we are quizzing from
//Or all of the cards in total
//For now we are just doing all of the cards at once


function quizByDeck(quizDeck) {
    //Here we want to search for the deck, populate workingDeck and then initialize any
    //relevant stats
    console.log("Quizzing on Deck!");
    console.log("Contents of workingDeck = ", workingDeck);
    displayQuizCard(workingPos);
}

//Takes in the position for the workingDeck array
function displayQuizCard(position) {
    if (quizCardSide === "back") {
        //Instead of flipping and waiting, it ends up looking less janky just to flip the
        //data on the sides
        document.getElementById("cardBackText").value = workingDeck[workingPos].frontText;
        document.getElementById("cardFrontText").value = workingDeck[workingPos].backText;

    }
    else {
        document.getElementById("cardFrontText").value = workingDeck[workingPos].frontText;
        document.getElementById("cardBackText").value = workingDeck[workingPos].backText;
    }
    document.getElementById("cardDetailsFront").value = workingDeck[workingPos].desc;
    document.getElementById("cardDetailsBack").value = workingDeck[workingPos].desc;
    document.getElementById("cardDeckFront").value = workingDeck[workingPos].deck;
    document.getElementById("cardDeckBack").value = workingDeck[workingPos].deck;

}

//Takes in a boolean true = the user was correct, false = the user was wrong
function nextQuizCard(wasCorrect) {
    //Do relevant right/wrong stuff
    if (wasCorrect == true) {
        console.log("User was correct!");
    }
    else {
        console.log("User was wrong!");
    }
    workingPos += 1;
    if (workingPos >= workingDeck.length) {
        //We are done with the quiz, or we want to reshuffle, add in the ones we got wrong
        //For now though, we are just going to loop through them
        workingPos = 0;
    }
    //First flip the card to the front

    //Update the card to reflect where we are
    displayQuizCard(workingPos);
}




//So here we want to get all of our cards from the database into the array that we have set up.
//Requires some testing
function dataBaseToArray() {
    const db = request.result;
    const transaction = db.transaction("cards", "readwrite");
    const store = transaction.objectStore("cards");
    const deckIndex = store.index("cardsDeck");
    let reqArray = [];
    let getReq = deckIndex.getAll();
    transaction.complete;
    getReq.onsuccess = function() {
        reqArray = getReq.result;
        for (let i = 0; i < reqArray.length; i++) {
            let newItem = {
                color: reqArray[i].cardColor,
                frontText: reqArray[i].frontText,
                backText: reqArray[i].backText,
                desc: reqArray[i].cardDesc,
                deck: reqArray[i].cardDeck
            }
            cardLibArray.push(newItem);
        }
    }
    console.log("cardLibArray:", cardLibArray);
}


//Returns an array of strings of all the different decks that we have
function getListOfDecksDB() {
    const db = request.result;
    const transaction = db.transaction("cards", "readwrite");
    const store = transaction.objectStore("cards");
    const deckIndex = store.index("cardsDeck");
    let reqArray = [];
    let getReq = deckIndex.getAll();
    transaction.complete;
    let deckArray = [];
    getReq.onsuccess = function() {
        reqArray = getReq.result;
        //This is the length of all of the cards we have
        console.log("Length of reqArray = ", reqArray.length); 
        for (let i = 0; i < reqArray.length; i++) {
            if (deckArray.indexOf(reqArray[i].cardDeck) == -1) {
                console.log("Deck array: ", reqArray[i].cardDeck);
                deckArray.push(reqArray[i].cardDeck);
            }
        }
        console.log("Different decks include: ", deckArray);
        return deckArray;
    }
    getReq.onerror = function() {
        console.log("Error getting decks!");
    }
}

function clearData() {
    const db = request.result;
    const transaction = db.transaction("cards", "readwrite");
    transaction.oncomplete = (event) => {
        console.log("Transaction Completed");
    }
    transaction.onerror = (event) => {
        console.log("Transaction not opened due to error");
    }
    const objectStore = transaction.objectStore("cards");
    const objectStoreRequest = objectStore.clear();
    objectStoreRequest.onsuccess = (event) => {
        console.log("Request successful");
    }
}