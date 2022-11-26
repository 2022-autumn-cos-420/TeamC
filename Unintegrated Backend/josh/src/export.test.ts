import { Card } from "./interfaces/card";
import { exportCards, cardEquality, arrayEquality } from "./export";
var fs = require('fs');

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

////////////////////////////////////////////
// Actual tests

describe("Testing the exportCards functions", () => {
    //////////////////////////////////
    // exportCards

    //Confirm cardEquality() function by comparing two known identical arrays of Card objects.
    test("Testing that helper cardEquality function properly works", () => {
        NEW_CARDS.map((card: Card, index: number): void =>
            console.log(cardEquality(card, TEST_CARDS[index]))
        );
    });

    test("Testing the getPublishedQuestions function", () => {
        console.log(TEST_CARDS);
        console.log(NEW_CARDS);
        console.log(NEW_CARDS[0].front);
        expect(NEW_CARDS === TEST_CARDS).toEqual(true);
        expect(exportCards(NEW_CARDS, "filename", "deck1")).toEqual(true);
        expect(fs.existsSync("./exportedCards/mytext2.txt")).toEqual(true);
    });
    // test("Testing the sameType function", () => {
    //     expect(sameType(NEW_CARDS)).toEqual(false);
    // });

    // afterEach(() => {
    //     expect(NEW_CARDS).toEqual(BACKUP_BLANK_QUESTIONS);
    // });
});
