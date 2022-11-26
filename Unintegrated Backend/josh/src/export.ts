import { urlToHttpOptions } from "url";
import { Card } from "./interfaces/card";
import * as fs from "fs";
import * as path from "path";
import { equal } from "assert";

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
// File management from tutorial: https://iq.opengenus.org/create-delete-files-directory-js/
/***
Goes over all cards in the users collection and exports them to a formatted txt file. 
The user must provide a file name for the exported file.
If deckID is non-empty, then only cards included in the specified deck will be exported.
Returns true on success and false on a failure
 */
const dir = "./exportedCards";
export function exportCards(
    cards: Card[],
    fileName: string,
    deckID = ""
): boolean {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFileSync("./exportedCards/mytext.txt", "hello world 3000!");
    fs.writeFileSync("./exportedCards/mytext2.txt", "hello world 3000!");
    fs.unlinkSync("./exportedCards/mytext.txt");

    // const index = newQuestions.find(
    //     (question: Question): boolean => question.id === targetId
    // );
    // if (index !== undefined) {
    //     // newQuestions[index].name = newName;
    //     index.name = newName;
    // }
    // // console.log(targetId);
    // // console.log(questions);
    // // console.log(newQuestions);
    return true;
}
