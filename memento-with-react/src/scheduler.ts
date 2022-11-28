import { Card } from "./interfaces/card";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";
import * as fs from "fs";
import * as path from "path";
// import backupQuestionData from "./data/questions.json";

// /***
//  * Consumes an array of Questions and produces a new array of Questions, where all
//  * the Questions are the same EXCEPT for the one with the given `targetId`. That
//  * Question should be the same EXCEPT that its name should now be `newName`.
//  */
//  export function scheduler(
//     questions: Card[],
//     targetId: number,
//     newName: string
// ): void {
//     // return newQuestions;
// }



// /***
//  * Consumes an array of Questions and produces a new array of Questions, where all
//  * the Questions are the same EXCEPT for the one with the given `targetId`. That
//  * Question should be the same EXCEPT that its name should now be `newName`.
//  */
//  export function sortAccuracy(
//     cards: Card[],
//     ascending: boolean = true
// ): Card[] {
//     return [];
// }
