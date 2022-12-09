import { Card } from "./interfaces/card";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";
import { avoidRecentCards, sortCardArray, getNextCard } from "./scheduler";



  

let cardArray =  [
    {id: 0, cardColor: "Red", frontText: "First One", backText: "First One Back", cardHint: "cardHint One!", cardDecks: ["Apples...", "Bananas"], accuracy: 1},
    {id: 1, cardColor: "Red", frontText: "front TW4o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 0},
    {id: 2, cardColor: "Red", frontText: "front TH3REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 4},
    {id: 3, cardColor: "Red", frontText: "front On6e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."], accuracy: 2},
    {id: 4, cardColor: "Red", frontText: "front TW5o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 3}
]


let sortedCardArray =  [
    {id: 1, cardColor: "Red", frontText: "front TW4o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 0},
    {id: 0, cardColor: "Red", frontText: "First One", backText: "First One Back", cardHint: "cardHint One!", cardDecks: ["Apples...", "Bananas"], accuracy: 1},
    {id: 3, cardColor: "Red", frontText: "front On6e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."], accuracy: 2},
    {id: 4, cardColor: "Red", frontText: "front TW5o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 3},
    {id: 2, cardColor: "Red", frontText: "front TH3REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 4}
]


//For testing when array is size 1 and for avoidRecentCards() testing
let trivialCardArray =  [
    {id: 0, cardColor: "Red", frontText: "First One", backText: "First One Back", cardHint: "cardHint One!", cardDecks: ["Apples...", "Bananas"], accuracy: 1}
]








describe("Tests for passing data in and out of scheduler functions", () => {
  
    test("Check that sortCards returns a list sorted by accuracy", () => {
        expect(deckEquality(sortedCardArray, sortedCardArray(cardArray, "Accuracy", "Ascending"))).toEqual(true);
    });

    test("Check that avoidRecentCards will avoid repeating for 3 cards after appearing when there are >3 cards", () => {
        const recentCards = [1,0,3];
        // The lowest-accuracy card which isn't in recent cards by index should be returned
        expect(avoidRecentCards(sortedCardArray, recentCards) === 4).toEqual(true);
        // 3 cards after studying the lowest-accuracy card at index 1, that card should be made available for study again
        const recentCardsTwo = [1,0,3,4];
        expect(avoidRecentCards(sortedCardArray, recentCards) === 1).toEqual(true);
    });

    test("Check that avoidRecentCards will still repeat earlier when there are <4 cards", () => {
        const recentCards = [0,0,0];
        // Since there aren't enough cards to allow for spaced repetition, the same card should be selected again
        expect(avoidRecentCards(trivialCardArray, recentCards) === 0).toEqual(true);
    });

    test("Check that getNextCard will return the correct next card in the array while sorting and avoiding recent cards", () => {
        const recentCards = [1,0,3];
        expect(getNextCard(cardArray, recentCards, "Accuracy", "Ascending") === 4).toEqual(true);
        const recentCardsTwo = [1,0,3,4];
        expect(getNextCard(cardArray, recentCardsTwo, "Accuracy", "Ascending") === 1).toEqual(true);
    });

});
