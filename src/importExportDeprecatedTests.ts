import { Card } from "./interfaces/card";
// import { exportCards, importCards, loadCardsFromTxt} from "./importExport";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";
import * as fs from "fs";
import * as path from "path";

    const NEW_CARDS = [
        {
            id: -1,
            cardColor: "Red",
            frontText: "Card One",
            backText: "The first card",
            cardHint: "Hint One",
            cardDecks: ["deck1", "deck2", "deck3"],
            accuracy: 20
        },
        {
            id: -1,
            cardColor: "Red",
            frontText: "Card2",
            backText: "The second card w/ highest accuracy",
            cardHint: "Hint Two",
            cardDecks: ["deck1", "deck3", "deck4"],
            accuracy: 50
        },
        {
            id: -1,
            cardColor: "Red",
            frontText: "Card\n 3",
            backText: "3rd Card with worst accuracy",
            cardHint: "Hint Three",
            cardDecks: ["deck1", "deck2", "deck4"],
            accuracy: 10
        }
    ];
//     const BACKUP_CARDS: Card[] = [
//         {
//             id: -1,
//             cardColor: "Red",
//             frontText: "Card One",
//             backText: "The first card",
//             cardHint: "Hint One",
//             cardDecks: ["deck1", "deck2", "deck3"],
//             accuracy: 20
//         },
//         {
//             id: -1,
//             cardColor: "Red",
//             frontText: "Card2",
//             backText: "The second card w/ highest accuracy",
//             cardHint: "Hint Two",
//             cardDecks: ["deck1", "deck3", "deck4"],
//             accuracy: 50
//         },
//         {
//             id: -1,
//             cardColor: "Red",
//             frontText: "Card\n 3",
//             backText: "3rd Card with worst accuracy",
//             cardHint: "Hint Three",
//             cardDecks: ["deck1", "deck2", "deck4"],
//             accuracy: 10
//         }
//     ];
//     const OTHER_CARDS: Card[] = [
//         {
//             id: -1,
//             cardColor: "Red",
//             frontText: "Card One",
//             backText: "The first card",
//             cardHint: "Hint One",
//             cardDecks: ["deck3", "deck4", "deck1"],
//             accuracy: 2
//         },
//         {
//             id: -1,
//             cardColor: "Red",
//             frontText: "Card2",
//             backText: "The second w/ highest accuracy",
//             cardHint: "Hint Two",
//             cardDecks: ["deck1", "deck3", "deck4"],
//             accuracy: 50
//         },
//         {
//             id: -1,
//             cardColor: "Red",
//             frontText: "Card 3",
//             backText: "3rd Card with worst accuracy",
//             cardHint: "Hint Three",
//             cardDecks: ["deck1", "deck2", "deck4"],
//             accuracy: 10
//         }
//     ];

    

// const USER_COLLECTION: Card[] = [
//     {
//         id: -1,
//         cardColor: "Red",
//         frontText: "Card One",
//         backText: "The first card",
//         cardHint: "Hint One",
//         cardDecks: ["deck1", "deck2", "deck3"],
//         accuracy: 20
//     },
//     {
//         id: -1,
//         cardColor: "Red",
//         frontText: "Card Four",
//         backText: "The fourth card",
//         cardHint: "Hint Four",
//         cardDecks: ["deck2", "deck3", "deck4"],
//         accuracy: 45
//     },
//     {
//         id: -1,
//         cardColor: "Red",
//         frontText: "Card 10",
//         backText: "\n10th\n Card\n with worst accuracy",
//         cardHint: "Hint Ten",
//         cardDecks: ["deck1", "deck2", "deck4"],
//         accuracy: 2
//     },
//     {
//         id: -1,
//         cardColor: "Red",
//         frontText: "Card 11",
//         backText: "\n11th\n Card\n with worst accuracy",
//         cardHint: "Hint Three",
//         cardDecks: [],
//         accuracy: 0
//     }];


// const DECKS_ONE: string[] = [
//     "deck1",
//     "deck2",
//     "deck4"
// ]
// const testFile: string = "testFile";
// const testFileTxt: string = "testFile.txt";
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
//         if (!fs.existsSync((exportPath + "exportedNewCards.txt"))){
//             exportCards(NEW_CARDS, "exportedNewCards.txt");
//         }
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
//     test("Testing that exportCards() and importCards() preserve card information before and after exporting/importing", () => {
//         expect(deckEquality(NEW_CARDS, BACKUP_CARDS)).toEqual(true);
//         expect(exportCards(NEW_CARDS, testFileTxt)).toEqual(true);
//         expect(fs.existsSync((exportPath + testFileTxt))).toEqual(true);
//         const COPY_CARDS: Card[] = importCards((exportPath + testFileTxt), []);
//         expect(deckEquality(COPY_CARDS, NEW_CARDS)).toEqual(true);
//     });
// });
