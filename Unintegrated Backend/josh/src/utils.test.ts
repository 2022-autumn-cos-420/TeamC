import { Card } from "./interfaces/card";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";

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

describe("Testing the utils equality functions", () => {
    //////////////////////////////////
    // exportCards

    //Confirm arrayEquality() function by comparing two known identical arrays of strings.
    test("Testing that helper arrayEquality function properly works", () => {
        expect(arrayEquality(DECKS_ONE, DECKS_TWO)).toEqual(true)
        expect(arrayEquality(DECKS_ONE, DECKS_THREE)).toEqual(false)
    });

    //Confirm cardEquality() function by comparing two known identical arrays of Card objects.
    test("Testing that helper cardEquality function properly works", () => {
        NEW_CARDS.map((card: Card, index: number): void =>
            console.log(expect(cardEquality(card, TEST_CARDS[index])).toEqual(true))
        );
        // Every card in OTHER_CARDS has a single attribute that differs slightly from the TEST_CARDS
        // If the function fails to catch the differences in any of those properties then this test will fail since it's mapped for each card
        OTHER_CARDS.map((card: Card, index: number): void =>
            console.log(expect(cardEquality(card, TEST_CARDS[index])).toEqual(false))
        );        
    });


    //Confirm cardEquality() function by comparing two known identical arrays of Card objects.
    test("Testing that helper deckEquality function properly works", () => {
        expect(deckEquality(NEW_CARDS, NEW_CARDS)).toEqual(true);
        expect(deckEquality(NEW_CARDS, TEST_CARDS)).toEqual(true);
        expect(deckEquality(TEST_CARDS, NEW_CARDS)).toEqual(true);
        expect(deckEquality(OTHER_CARDS, NEW_CARDS)).toEqual(false);
    });

});
