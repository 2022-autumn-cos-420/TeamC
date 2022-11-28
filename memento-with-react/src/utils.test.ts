import { Card } from "./interfaces/card";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";

    const NEW_CARDS: Card[] = [
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
    const BACKUP_CARDS: Card[] = [
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

    const OTHER_CARDS: Card[] = [
        {
            id: -1,
            cardColor: "Red",
            frontText: "Card One",
            backText: "The first card",
            cardHint: "Hint One",
            cardDecks: ["deck3", "deck4", "deck1"],
            accuracy: 2
        },
        {
            id: -1,
            cardColor: "Red",
            frontText: "Card2",
            backText: "The second w/ highest accuracy",
            cardHint: "Hint Two",
            cardDecks: ["deck1", "deck3", "deck4"],
            accuracy: 50
        },
        {
            id: -1,
            cardColor: "Red",
            frontText: "Card 3",
            backText: "3rd Card with worst accuracy",
            cardHint: "Hint Three",
            cardDecks: ["deck1", "deck2", "deck4"],
            accuracy: 10
        }
    ];



const testFile: string = "testFile";
const testFileTxt: string = "testFile.txt";

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
    "deck3"
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
            expect(cardEquality(card, BACKUP_CARDS[index])).toEqual(true)
        );
        // Every card in OTHER_CARDS has a single attribute that differs slightly from the TEST_CARDS
        // If the function fails to catch the differences in any of those properties then this test will fail since it's mapped for each card
        OTHER_CARDS.map((card: Card, index: number): void =>
            expect(cardEquality(card, BACKUP_CARDS[index])).toEqual(false)
        );        
    });


    //Confirm cardEquality() function by comparing two known identical arrays of Card objects.
    test("Testing that helper deckEquality function properly works", () => {
        expect(deckEquality(NEW_CARDS, NEW_CARDS)).toEqual(true);
        expect(deckEquality(NEW_CARDS, BACKUP_CARDS)).toEqual(true);
        expect(deckEquality(BACKUP_CARDS, NEW_CARDS)).toEqual(true);
        expect(deckEquality(OTHER_CARDS, NEW_CARDS)).toEqual(false);
    });

});
