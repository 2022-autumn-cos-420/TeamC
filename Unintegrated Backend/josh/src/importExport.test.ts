import { Card } from "./interfaces/card";
import { exportCards, importCards} from "./importExport";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";
import * as fs from "fs";
import * as path from "path";
import * as json from "json5";
import testCardData from "./data/cards.json";
import copyCardData from "../user.json";
// import backupQuestionData from "./data/questions.json";

const { TEST_CARDS }: Record<string, Card[]> =
    // Typecast the test data that we imported to be a record matching
    //  strings to the question list
    testCardData as Record<string, Card[]>;

const COPY_CARDS: Card[] =
    // Typecast the test data that we imported to be a record matching
    //  strings to the question list
    copyCardData as Card[];

const NEW_CARDS: Card[] = [
    {
        front: "Card One",
        back: "The first card",
        decks: ["deck1", "deck2", "deck3"],
        accuracy: 20
    },
    {
        front: "Card2",
        back: "The second card w/ highest accuracy",
        decks: ["deck1", "deck3", "deck4"],
        accuracy: 50
    },
    {
        front: "Card\n 3",
        back: "3rd Card with worst accuracy",
        decks: ["deck1", "deck2", "deck4"],
        accuracy: 10
    }];

const OTHER_CARDS: Card[] = [
    {
        front: "Card One",
        back: "The first card",
        decks: ["deck3", "deck4", "deck1"],
        accuracy: 2
    },
    {
        front: "Card2",
        back: "The second w/ highest accuracy",
        decks: ["deck1", "deck3", "deck4"],
        accuracy: 50
    },
    {
        front: "Card 3",
        back: "3rd Card with worst accuracy",
        decks: ["deck1", "deck2", "deck4"],
        accuracy: 10
    }];
    
const DECKS_ONE: string[] = [
    "deck1",
    "deck2",
    "deck4"
]
const DECKS_TWO: string[] = [
    "deck1",
    "deck2",
    "deck4"
]
const DECKS_THREE: string[] = [
    "deck1",
    "deck2",
    "deck4"
]


const testFile: string = "testFile"
const testFileJson: string = "testFile.json"
////////////////////////////////////////////
// Actual tests


describe("Testing the exportCards() functions", () => {
    //////////////////////////////////
    // exportCards

    beforeEach(() => {
        if (fs.existsSync((exportPath + testFileJson))) {
            fs.unlinkSync((exportPath + testFileJson));
            console.log("Deleted testFile.json");
        }
    });

    test("Testing that TEST_CARDS loaded from /data/cards.json properly", () => {
        expect(deckEquality(NEW_CARDS, TEST_CARDS)).toEqual(true);
        expect(deckEquality(NEW_CARDS, COPY_CARDS)).toEqual(true);
    });

    test("Testing that exportCards() creates the expected file", () => {
        expect(exportCards(NEW_CARDS, testFile)).toEqual(true);
        expect(fs.existsSync((exportPath + testFileJson))).toEqual(true);
    });
    
    test("Testing that exportCards() fails to export empty files", () => {
        expect(exportCards([], testFile, "nonExistentDeck")).toEqual(false);
        expect(fs.existsSync((exportPath + testFileJson))).toEqual(false);
    });
     
    
    // afterEach(() => {
    //     expect(NEW_CARDS).toEqual(BACKUP_BLANK_QUESTIONS);
    // });
});


describe("Testing the importCards() functions", () => {
    //////////////////////////////////
    // getPublishedQuestions



    test("Testing the importCard function", () => {
        expect(fs.existsSync((exportPath + "mytext2.txt"))).toEqual(true);
        expect(deckEquality(importCards((exportPath + "mytext2.txt")), NEW_CARDS)).toEqual(true);
    });

    // afterEach(() => {
    //     expect(BLANK_QUESTIONS).toEqual(BACKUP_BLANK_QUESTIONS);
    // });
});
