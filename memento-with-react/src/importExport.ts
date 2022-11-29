import { urlToHttpOptions } from "url";
import { Card } from "./interfaces/card";
import * as path from "path";
import { equal } from "assert";
import { cardEquality, arrayEquality, exportPath, deckEquality, stringToCard } from "./utils";
const fs = require('fs');



// File management from tutorial: https://iq.opengenus.org/create-delete-files-directory-js/
/***
Goes over all cards in the users collection and exports them to a formatted txt file. 
The user must provide a file name for the exported file.
If deckID is non-empty, then only cards included in the specified deck will be exported.
Returns true on success and false on a failure
 */
export function exportCards(
    cards: Card[],
    fileName: string,
    deckID: string = ""
): boolean {
    if (!fs.existsSync(exportPath)){
        fs.mkdirSync(exportPath);
    }
    if (cards.length === 0) {
        return false;
    }
    else if (deckID !== ""){
        cards = cards.filter((card: Card): boolean => card.cardDecks.includes(deckID))
        if (cards.length === 0) {
            return false;
        }    
    }
    let cardString: string = "";
    let cardArray: string[] = [];
    cards.map((card: Card): string[] => 
        // Results in growing string[] array where each string represents an array containing the data for one card object
        // There are separate delimiters from join() between the properties of a given card (<|>) and between each card (<|||>)
        // This way an array-of-arrays can be retrieved by a 2-step split() call and subsequently mapped over to recreate the cards.
        cardArray = [...cardArray, [card.cardColor , card.frontText , card.backText , card.cardHint, card.cardDecks.join(","), String(card.accuracy)].join("<|>")],
        );

    cardString = cardArray.join("<|||>")
    // console.log("cardString is: " + cardString + "\n");

    fs.writeFileSync((exportPath + fileName), cardString);
 
    // fs.writeFileSync((exportPath + "copyFile2.txt"), cardString);
    // fs.unlinkSync((exportPath + "mytext.txt"));
    return true;
}

/***
 * import cards from a given txt file path, returns the array of imported cards.
 * If deckName is specified, cards will only be added to the specified deck
 */
 export function loadCardsFromTxt(
    filePath: string,
    deckName: string = ""
): Card[] {
    const textFileString: string = fs.readFileSync(filePath).toString();
    const importedIntermediateData: string[] = textFileString.split("<|||>")
    const importedCards: Card[] = importedIntermediateData.map((cardString: string): Card =>
        stringToCard(cardString)
    )
    return importedCards;
}

/***
 * import cards from a given txt file path, returns the array of imported cards.
 * Missing Functionality: Once integrated with React UI:
 *       If deckName is specified, cards will be added to the specified deck
 */
 export function importCards(
    filePath: string,
    collection: Card[],
    deckName: string = ""
): Card[] {
    let maxId = -1;
    collection.map((card: Card): void => {
        if (card.id > maxId){maxId = card.id}
    })
    const importedCards: Card[] = loadCardsFromTxt(filePath, deckName)
    importedCards.map((card: Card): void => {
        let duplicate: boolean = false;
        if ( collection.length !== 0 ){
            collection.map((collectionCard: Card): void => {
                if (cardEquality(collectionCard, card)) {
                    duplicate = true;
                }
            })
            if (duplicate === false){
                maxId = maxId + 1
                collection = [...collection, { 
                    id: maxId, 
                    cardColor: card.cardColor, 
                    frontText: card.frontText, 
                    backText: card.backText, 
                    cardHint: card.cardHint, 
                    cardDecks: card.cardDecks, 
                    accuracy: card.accuracy }]
            }
        }
        else {
            maxId = maxId + 1
            collection = [{ 
                id: maxId, 
                cardColor: card.cardColor, 
                frontText: card.frontText, 
                backText: card.backText, 
                cardHint: card.cardHint, 
                cardDecks: card.cardDecks, 
                accuracy: card.accuracy }]
        }
    })
    return collection;
}

