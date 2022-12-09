// import { urlToHttpOptions } from "url";
// import { Card } from "./interfaces/card";
// import * as fs from "fs";
// import * as path from "path";
// import { equal } from "assert";
import { cardEquality } from "./utils";
export const exportPath = "./exportedCards/";



//Sort function produced by ChatGPT
export function sortCardArray(cardArray, criteria="Accuracy", direction="Ascending") {
    let sortedCards = cardArray;
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

export function avoidRecentCards(sortedCardArray, recentCards, wait=3) {
    let avoidedIndices = [];
    if (recentCards.length > wait) {
        // Based on the wait value for spacing of repetition, determine which cards to avoid repeating for the current iteration 
        avoidedIndices = recentCards.slice(recentCards.length - wait, recentCards.length);
    }
    else {
        // If the array is too short for the requested spacing of wait, then just avoid all but the least recently presented card
        avoidedIndices = recentCards.slice(1, recentCards.length);
    }

    // Look through the sortedCardArray, finding the highest-priority card that is ready to be shown again 
    //    returning its index within the sorted array
    for (let i = 0; i < sortedCardArray.length; i++) {
        if (avoidedIndices.includes(i)) {
        }
        else {
            return i;
        }
      }
    return -1;
}


export function getNextCard(cardArray, recentCards, criteria="Accuracy", direction="Ascending") {
    let sortedCardArray = sortCardArray(cardArray, criteria, direction);
    let index = avoidRecentCards(sortedCardArray, recentCards);
    if (index === -1) {
        return null;
    }
    else {
        const nextCard = sortedCardArray[index];
        const nextIndex = cardArray.findIndex(card => cardEquality(card, nextCard));
        return nextIndex;
    }
}
