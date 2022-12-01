// import { urlToHttpOptions } from "url";
// import { Card } from "./interfaces/card";
// import * as fs from "fs";
// import * as path from "path";
// import { equal } from "assert";

export const exportPath = "./exportedCards/";

export function arrayEquality(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) {
        return false;
    };
    let isEqual = true;
    arrayOne.map((string, index) => {
        if (string !== arrayTwo[index]) {
            isEqual = false;
        }
    });
    return isEqual;
}

export function cardEquality(cardOne, cardTwo) {
    const isEqual =
        cardOne.frontText === cardTwo.frontText &&
        cardOne.backText === cardTwo.backText &&
        arrayEquality(cardOne.cardDecks, cardTwo.cardDecks) &&
        cardOne.cardHint === cardTwo.cardHint &&
        cardOne.cardColor === cardTwo.cardColor &&
        cardOne.accuracy === cardTwo.accuracy;
    return isEqual;
}

export function deckEquality(deckOne, deckTwo) {
    let isEqual = true;
    if (deckOne.length === 0 || deckOne.length !== deckTwo.length){
        isEqual = false;
    }
    else {
        deckOne.map((card, index) => {
            if (cardEquality(card, deckTwo[index]) !== true) {
                isEqual = false;
            }
        });
    }
    return isEqual;
}


export function stringToCard(string) {
    const cardArray = string.split("<|>")
    const card = {
        // The ID of imported cards needs to be assigned at the time of import based on the collection
        id: -1,
        cardColor: cardArray[0],
        frontText: cardArray[1],
        backText: cardArray[2],
        cardHint: cardArray[3],
        cardDecks: cardArray[4].split(","),
        accuracy: Number(cardArray[5])
    }
    return card;
}  