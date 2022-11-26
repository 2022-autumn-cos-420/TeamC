import { Card } from "./interfaces/card";
import { exportCards} from "./export";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";
import * as fs from "fs";
import * as path from "path";
import testCardData from "./data/cards.json";
// import backupQuestionData from "./data/questions.json";

const { TEST_CARDS }: Record<string, Card[]> =
    // Typecast the test data that we imported to be a record matching
    //  strings to the question list
    testCardData as Record<string, Card[]>;

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


////////////////////////////////////////////
// Actual tests

describe("Testing the exportCards functions", () => {
    //////////////////////////////////
    // exportCards

    test("Testing the getPublishedQuestions function", () => {
        expect(NEW_CARDS === TEST_CARDS).toEqual(true);
        expect(exportCards(NEW_CARDS, "filename", "deck1")).toEqual(true);
        expect(fs.existsSync((exportPath + "mytext2.txt"))).toEqual(true);
    });
    
    // afterEach(() => {
    //     expect(NEW_CARDS).toEqual(BACKUP_BLANK_QUESTIONS);
    // });
});