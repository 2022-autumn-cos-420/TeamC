import { Card } from "./interfaces/card";
// import { exportCards, importCards, loadCardsFromTxt} from "./importExport";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";
import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import testCardData from "./data/cards.json";
import copyCardData from "../exportedCards/testFile.json";

// const { TEST_CARDS }: Record<string, Card[]> =
//     // Typecast the test data that we imported to be a record matching
//     //  strings to the question list
//     testCardData as Record<string, Card[]>;

// const COPY_CARDS: Card[] =
//     // Typecast the test data that we imported to be a record matching
//     //  strings to the question list
//     copyCardData as Card[];

// const NEW_CARDS: Card[] = [
//     {
//         front: "Card One",
//         back: "The first card",
//         decks: ["deck1", "deck2", "deck3"],
//         accuracy: 20
//     },
//     {
//         front: "Card2",
//         back: "The second card w/ highest accuracy",
//         decks: ["deck1", "deck3", "deck4"],
//         accuracy: 50
//     },
//     {
//         front: "Card\n 3",
//         back: "3rd Card with worst accuracy",
//         decks: ["deck1", "deck2", "deck4"],
//         accuracy: 10
//     }];

//     const BACKUP_CARDS: Card[] = [
//         {
//             front: "Card One",
//             back: "The first card",
//             decks: ["deck1", "deck2", "deck3"],
//             accuracy: 20
//         },
//         {
//             front: "Card2",
//             back: "The second card w/ highest accuracy",
//             decks: ["deck1", "deck3", "deck4"],
//             accuracy: 50
//         },
//         {
//             front: "Card\n 3",
//             back: "3rd Card with worst accuracy",
//             decks: ["deck1", "deck2", "deck4"],
//             accuracy: 10
//         }];
    
// const OTHER_CARDS: Card[] = [
//     {
//         front: "Card One",
//         back: "The first card",
//         decks: ["deck3", "deck4", "deck1"],
//         accuracy: 2
//     },
//     {
//         front: "Card2",
//         back: "The second w/ highest accuracy",
//         decks: ["deck1", "deck3", "deck4"],
//         accuracy: 50
//     },
//     {
//         front: "Card 3",
//         back: "3rd Card with worst accuracy",
//         decks: ["deck1", "deck2", "deck4"],
//         accuracy: 10
//     }];
    

// const USER_COLLECTION: Card[] = [
//     {
//         front: "Card One",
//         back: "The first card",
//         decks: ["deck1", "deck2", "deck3"],
//         accuracy: 20
//     },
//     {
//         front: "Card Four",
//         back: "The fourth card",
//         decks: ["deck2", "deck3", "deck4"],
//         accuracy: 45
//     },
//     {
//         front: "Card 10",
//         back: "\n10th\n Card\n with worst accuracy",
//         decks: ["deck1", "deck2", "deck4"],
//         accuracy: 2
//     },
//     {
//         front: "Card 11",
//         back: "\n11th\n Card\n with worst accuracy",
//         decks: [],
//         accuracy: 0
//     }];


// const DECKS_ONE: string[] = [
//     "deck1",
//     "deck2",
//     "deck4"
// ]
// const testFile: string = "testFile";
// const testFileTxt: string = "testFile.txt";
// const testFileJson: string = "testFile.json";
// ////////////////////////////////////////////
// // Actual tests


// describe("Testing the exportCards() functions", () => {
//     //////////////////////////////////
//     // exportCards

//     beforeEach(() => {
//         if (fs.existsSync((exportPath + testFileTxt))) {
//             fs.unlinkSync((exportPath + testFileTxt));
//         }
//     });

//     test("Testing that TEST_CARDS loaded from /data/cards.json properly", () => {
//         expect(deckEquality(NEW_CARDS, TEST_CARDS)).toEqual(true);
//         expect(deckEquality(NEW_CARDS, COPY_CARDS)).toEqual(true);
//     });

//     test("Testing that exportCards() creates the expected file", () => {
//         expect(deckEquality(NEW_CARDS, BACKUP_CARDS)).toEqual(true);
//         expect(exportCards(NEW_CARDS, testFileTxt)).toEqual(true);
//         expect(fs.existsSync((exportPath + testFileTxt))).toEqual(true);
//     });
    
//     test("Testing that exportCards() fails to export empty files", () => {
//         expect(exportCards([], testFileTxt, "nonExistentDeck")).toEqual(false);
//         expect(fs.existsSync((exportPath + testFileTxt))).toEqual(false);
//     });
     
//     //Gives a non-empty card list, but asks it to filter out all cards not included in a non-existent deck. Should filter out all cards.
//     test("Testing that exportCards() filtering removes all cards when given a nonexistent deck", () => {
//         expect(deckEquality(NEW_CARDS, BACKUP_CARDS)).toEqual(true);
//         expect(exportCards(NEW_CARDS, testFileTxt, "nonExistentDeck")).toEqual(false);
//         expect(fs.existsSync((exportPath + testFileTxt))).toEqual(false);
//     });
// });


// describe("Testing the importCards() functions", () => {
//     //////////////////////////////////
//     // getPublishedQuestions
//     beforeEach(() => {
//         if (fs.existsSync((exportPath + testFileTxt))) {
//             fs.unlinkSync((exportPath + testFileTxt));
//         }
//     });
//     // copyFile2.txt is a file generated from exportCards(), this test ensures import() can properly parse this format of text
//     test("Testing the importCard() function on previously exported version of NEW_CARDS", () => {
//         expect(fs.existsSync((exportPath + "exportedNewCards.txt"))).toEqual(true);
//         expect(deckEquality(importCards((exportPath + "exportedNewCards.txt"), []), NEW_CARDS)).toEqual(true);
//     });

//     // copyFile2.txt is a file generated from exportCards(), this test ensures import() can properly parse this format of text
//     test("Testing that importCard() function on previously exported version of NEW_CARDS", () => {
//         expect(fs.existsSync((exportPath + "exportedNewCards.txt"))).toEqual(true);
//         //Should be false, since it adds the imported copy of NEW_CARDS to the current USER_COLLETION
//         // would be true if it erroneously only returns the newly imported cards while ignoring the current collection
//         expect(deckEquality(importCards((exportPath + "exportedNewCards.txt"), USER_COLLECTION), NEW_CARDS)).toEqual(false);
//         // Imports 3 cards, 1 of which should be ignored as it's a duplicate of USER_COLLECTION[0], so only 2 cards should be added to the collection
//         expect(importCards((exportPath + "exportedNewCards.txt"), USER_COLLECTION).length === 6).toEqual(true);
//         // Imports 3 cards, all of which should be ignored as they're identical to NEW_CARDS
//         expect(importCards((exportPath + "exportedNewCards.txt"), NEW_CARDS).length === 3).toEqual(true);
//     });

//         // copyFile2.txt is a file generated from exportCards(), this test ensures import() can properly parse this format of text
//         test("Testing that importing duplicate cards not found in the collection only adds one copy of that card", () => {
//             expect(fs.existsSync((exportPath + "exportedDuplicateCards.txt"))).toEqual(true);
//             expect(importCards((exportPath + "exportedDuplicateCards.txt"), []).length === 1).toEqual(true);
//         });
// });


// describe("Integration tests of export and import running together", () => {
//     beforeEach(() => {
//         if (fs.existsSync((exportPath + testFileTxt))) {
//             fs.unlinkSync((exportPath + testFileTxt));
//         }
//     });
//     test("Testing that exportCards() properly filters when given a deck with non-zero matching cards", () => {
//         expect(deckEquality(NEW_CARDS, BACKUP_CARDS)).toEqual(true);
//         expect(exportCards(NEW_CARDS, testFileTxt, "deck2")).toEqual(true);
//         expect(fs.existsSync((exportPath + testFileTxt))).toEqual(true);
//         const COPY_CARDS: Card[] = loadCardsFromTxt((exportPath + testFileTxt));
//         expect(COPY_CARDS.length === 2).toEqual(true);
//     });
//     test("Testing that exportCards() and importCards() preserve card information before and after exporting/importing ", () => {
//         expect(deckEquality(NEW_CARDS, BACKUP_CARDS)).toEqual(true);
//         expect(exportCards(NEW_CARDS, testFileTxt)).toEqual(true);
//         expect(fs.existsSync((exportPath + testFileTxt))).toEqual(true);
//         const COPY_CARDS: Card[] = importCards((exportPath + testFileTxt), []);
//         expect(deckEquality(COPY_CARDS, NEW_CARDS)).toEqual(true);
//     });
// });
