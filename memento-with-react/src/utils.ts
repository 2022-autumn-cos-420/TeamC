import { urlToHttpOptions } from "url";
import { Card } from "./interfaces/card";
import * as fs from "fs";
import * as path from "path";
import { equal } from "assert";

export const exportPath: string = "./exportedCards/";

export function arrayEquality(arrayOne: string[], arrayTwo: string[]): boolean {
    if (arrayOne.length !== arrayTwo.length) {
        return false;
    };
    let isEqual = true;
    arrayOne.map((string: string, index: number): void => {
        if (string !== arrayTwo[index]) {
            isEqual = false;
        }
    });
    return isEqual;
}

export function cardEquality(cardOne: Card, cardTwo: Card): boolean {
    const isEqual: boolean =
        cardOne.frontText === cardTwo.frontText &&
        cardOne.backText === cardTwo.backText &&
        arrayEquality(cardOne.cardDecks, cardTwo.cardDecks) &&
        cardOne.accuracy === cardTwo.accuracy;
    return isEqual;
}

export function deckEquality(deckOne: Card[], deckTwo: Card[]): boolean {
    let isEqual: boolean = true;
    if (deckOne.length === 0 || deckOne.length !== deckTwo.length){
        isEqual = false;
    }
    else {
        deckOne.map((card: Card, index: number): void => {
            if (cardEquality(card, deckTwo[index]) !== true) {
                isEqual = false;
            }
        });
    }
    return isEqual;
}


export function stringToCard(string: string): Card {
    const cardArray: string[] = string.split("<|>")
    const card: Card = {
        id: 0,
        cardColor: "Red",
        frontText: cardArray[0],
        backText: cardArray[1],
        cardHint: cardArray[2],
        cardDecks: cardArray[3].split(","),
        accuracy: Number(cardArray[4])
    }
    return card;
}  