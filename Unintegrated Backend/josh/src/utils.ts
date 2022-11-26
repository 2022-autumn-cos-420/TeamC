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
        cardOne.front === cardTwo.front &&
        cardOne.back === cardTwo.back &&
        arrayEquality(cardOne.decks, cardTwo.decks) &&
        cardOne.accuracy === cardTwo.accuracy;
    return isEqual;
}

export function deckEquality(deckOne: Card[], deckTwo: Card[]): boolean {
    let isEqual: boolean = true;
    deckOne.map((card: Card, index: number): void => {
        if (cardEquality(card, deckTwo[index]) !== true) {
            isEqual = false;
        }
    });
    return isEqual;
}

