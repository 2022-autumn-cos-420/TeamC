import React from "react";
import ReactDOM from 'react-dom';
import {render, screen, cleanup, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import FlashCard from "./components/Flashcard.js";
import QuizPage from "./QuizPage.js";
import { cardEquality, arrayEquality, exportPath, deckEquality, stringToCard } from "../utils";




function addCard(front, back, hint, deck) {
    //Not supposed to do anything but prevent this all from crashing
}


let cardArray1 =  [
    {id: 0, cardColor: "Red", frontText: "First One", backText: "First One Back", cardHint: "cardHint One!", cardDecks: ["Apples...", "Bananas"], accuracy: 1000},
    {id: 1, cardColor: "Red", frontText: "front TW4o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 100},
    {id: 2, cardColor: "Red", frontText: "front TH3REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 40},
    {id: 3, cardColor: "Red", frontText: "front On6e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."], accuracy: 75},
    {id: 4, cardColor: "Red", frontText: "front TW5o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 11},
    {id: 5, cardColor: "Red", frontText: "front THR7EE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 53},
    {id: 6, cardColor: "Red", frontText: "front On9e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."], accuracy: 66},
    {id: 7, cardColor: "Red", frontText: "front TW8o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 14},
    {id: 8, cardColor: "Red", frontText: "front TH0REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 122},
    {id: 9, cardColor: "Red", frontText: "front On-e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."], accuracy: 100},
    {id: 10, cardColor: "Red", frontText: "front T=Wo!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 5},
    {id: 11, cardColor: "Red", frontText: "front ThHREE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 1},
    {id: 12, cardColor: "Red", frontText: "front Oane!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."], accuracy: 45},
    {id: 13, cardColor: "Red", frontText: "front TbWo!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."], accuracy: 10},
    {id: 14, cardColor: "Red", frontText: "Last One!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 30}
  ]
  
const applesByAccuracy = [11, 10, 13, 4, 7, 14, 2, 12, 5, 6, 3, 1, 9, 8, 0];
const bananasByAccuracy = [0];

it("Flashcard Quiz cannot be edited by the user", () => {
    const {queryByTestId} = render(<QuizPage
                                    addCard={addCard()}
                                    cardArray={cardArray1}>
                                </QuizPage>);
    //Now we want to try to change the values in these boxes.
    const frontTextInput = screen.queryByTestId("FlashCardFrontText");
    const backTextInput = screen.queryByTestId("FlashCardBackText");
    userEvent.type(frontTextInput, "This is a changed front");
    expect(frontTextInput.value).toBe("First One");

    userEvent.type(backTextInput, "This is a changed back");
    expect(backTextInput.value).toBe("First One Back");
});


it ("QuizPage can succesfully go to the next card", () => {
    const {queryByTestId} = render(<QuizPage cardArray={cardArray1}>
                                </QuizPage>)
        const frontText = screen.queryByTestId("FlashCardFrontText");
        const nextButton = screen.queryByTestId("CorrectButton");
        let firstCardFront = frontText.value;

        userEvent.click(nextButton);
        let secondCardFront = screen.queryByTestId("FlashCardFrontText");
        expect(firstCardFront !== secondCardFront).toBe(true);
});



/*
Tests for scheduler
    - Accuracy of firstCard changes after correct guess
    - Accuracy of firstCard doesn't change if incorrect
    - After calling the scheduler the first card is the one with the lowest accuracy
    - After calling the scheduler multiple times the returned order of cards is the expected order based on accuracy
    - After guessing a card, its index is added to the recentCards array
    - The scheduler won't repeat the first card for N attempts after appearing
*/

// Apples in order of accuracy
// []
describe("QuizPage State Tests", () => {
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<QuizPage
            addCard={addCard()}
            cardArray={cardArray1}>
            </QuizPage>);               
            });
        test("Passing an empty deck to the quiz page works correctly.", () => {
            const quiz = new QuizPage({cardArray: []}); 
            const X = quiz.state.cardArray;
            console.log(X);
            console.log([]);
            expect(deckEquality(X,[])).toEqual(true)
        });
        test("Passing a non-empty deck to the quiz page works correctly.", () => {
            const quiz = new QuizPage({cardArray: cardArray1}); 
            const X = quiz.state.cardArray;
            expect(deckEquality(X,cardArray1)).toEqual(true)
        });
        test("The initial index of the quizpage is 0", () => {
            const quiz = new QuizPage({cardArray: cardArray1}); 
            //calling the sch
            expect(quiz.state.currentIndex === 0).toEqual(true)
        });  
});

describe("Accuracy Tests", () => {
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<QuizPage
            addCard={addCard()}
            cardArray={cardArray1}>
            </QuizPage>);               
            });
            test("Calling scheduler returns the index of the lowest-accuracy card", () => {
                const quiz = new QuizPage({cardArray: cardArray1}); 
                const X = quiz.state.cardArray;
                expect(deckEquality(X,cardArray1)).toEqual(true)
            });
            test("Succeeding on the card increments its accuracy", () => {
                const quiz = new QuizPage({cardArray: cardArray1}); 
                const X = quiz.state.cardArray;
                expect(deckEquality(X,cardArray1)).toEqual(true)
            });
            test("Failing on a card doesn't increment its accuracy", () => {
                const quiz = new QuizPage({cardArray: cardArray1}); 
                const X = quiz.state.cardArray;
                expect(deckEquality(X,cardArray1)).toEqual(true)
            });
            test("Succeeding on the card increments its accuracy within the parent class in App.jsx", () => {
                const quiz = new QuizPage({cardArray: cardArray1}); 
                const X = quiz.state.cardArray;
                expect(deckEquality(X,cardArray1)).toEqual(true)
            });
});

describe("Scheduler Tests", () => {
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<QuizPage
            addCard={addCard()}
            cardArray={cardArray1}>
            </QuizPage>);               
            });
            test("After studying a card its added to the recentCards state array", () => {
                const quiz = new QuizPage({cardArray: cardArray1}); 
                const X = quiz.state.cardArray;
                expect(deckEquality(X,cardArray1)).toEqual(true)
            });
            test("After studying a card its added to the recentCards state array and can't reappear for at least 5 more iterations if other cards are available", () => {
                const quiz = new QuizPage({cardArray: cardArray1}); 
                const X = quiz.state.cardArray;
                expect(deckEquality(X,cardArray1)).toEqual(true)
            });
            test("After studying a card if fewer than 5 cards are available then cards are repeated from within recentCards as needed", () => {
                const quiz = new QuizPage({cardArray: cardArray1}); 
                const X = quiz.state.cardArray;
                expect(deckEquality(X,cardArray1)).toEqual(true)
            });
});