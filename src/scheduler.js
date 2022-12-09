// import { urlToHttpOptions } from "url";
// import { Card } from "./interfaces/card";
// import * as fs from "fs";
// import * as path from "path";
// import { equal } from "assert";
import { cardEquality, deckEquality } from "./utils";
export const exportPath = "./exportedCards/";



//Sort function produced by ChatGPT
export function sortCardArray(cardArray, criteria="Accuracy", direction="Ascending") {
    let sortedCards = [...cardArray];
    if (criteria === "Accuracy") {
        sortedCards.sort((a, b) => {
            if (a.accuracy < b.accuracy) {
              return -1;
            } else if (a.accuracy > b.accuracy) {
              return 1;
            } else {
              return 0;
            }
          });    
    }
    if (direction === "Descending")
        return sortedCards.reverse();
    else if (direction === "Ascending"){
        return sortedCards
    }
    else {
        console.log("Sorting direction not implemented yet!")
    }
}

export function avoidRecentCards(sortedCardArray, cardArray, recentCards=[], wait=3) {
    let avoidedIndices = [];
    // If the array is long enough to space out the repetition of cards according to wait
    if (sortedCardArray.length > wait) {
        // Based on the wait value for spacing of repetition, determine which cards to avoid repeating for the current iteration 
        avoidedIndices = recentCards.slice(Math.max(0, recentCards.length - wait), recentCards.length);
    }
    // If the array is too short for the requested spacing of repetition
    else {
        if (recentCards.length > 1) {
            // Since there aren't enough cards for spaced repetition, just take the least recent.
            //    Note: this only works because QuizPage will drop the first element of the index after it's repeated. Otherwise a cleaner solution needs to be found
            avoidedIndices = recentCards.slice(1, recentCards.length);
        }
        else {
            // If the recentCards are empty, just return an empty array
            avoidedIndices = [];
        }
    }
    console.log("avoidIndices: ", avoidedIndices);
    

    // Look through the sortedCardArray, finding the highest-priority card that is ready to be shown again 
    //    returning its index within the sorted array
    for (let i = 0; i < sortedCardArray.length; i++) {
        let nextCard = sortedCardArray[i];
        let unsortedIndex = cardArray.findIndex(card => cardEquality(card, nextCard));

        console.log("Index of card in cardArray: " , unsortedIndex);
        if (avoidedIndices.includes(unsortedIndex)) {
        }
        else {
            return unsortedIndex;
        }
      }
    return -1;
}


export function getNextCard(cardArray, recentCards, criteria="Accuracy", direction="Ascending") {
    let sortedCardArray = sortCardArray(cardArray, criteria, direction);
    let index = avoidRecentCards(sortedCardArray, cardArray, recentCards);
    if (index === -1) {
        return null;
    }
    else {
        const nextCard = sortedCardArray[index];
        const nextIndex = cardArray.findIndex(card => cardEquality(card, nextCard));
        return nextIndex;
    }
}
