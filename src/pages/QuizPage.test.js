import React from "react";
import ReactDOM from 'react-dom';
import {render, screen, cleanup, waitFor, fireEvent, findByTestId} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import FlashCard from "./components/Flashcard.js";
import QuizPage from "./QuizPage.js";
import { cardEquality, arrayEquality, exportPath, deckEquality, stringToCard } from "../utils";
import App from '../App.js';
import { shallow } from 'enzyme';
import card from "../interfaces/card"
import { avoidRecentCards, sortCardArray, getNextCard } from "../scheduler";


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
  const backupArray1 =  [
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



export function updateAccuracy(card) {
    let index = 0;
    for (let i = 0; i < cardArray1.length; i++) {
      if (cardArray1[i].id === card.id) {
        index = i;
        console.log("Found Card to update!");
        break;
      }
    }
    // cardArray1[index].frontText = card.frontText;
    // cardArray1[index].backText = card.backText;
    // cardArray1[index].cardHint = card.cardHint;
    // cardArray1[index].cardDecks = card.cardDecks;
    cardArray1[index].accuracy = cardArray1[index].accuracy + 1;
  }

it("Flashcard Quiz cannot be edited by the user", () => {
    const {queryByTestId} = render(<QuizPage
                                    addCard={addCard()}
                                    cardArray={cardArray1}
                                    updateAccuracy={updateAccuracy}
                                    filters={["All", ""]}>
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
    const {queryByTestId} = render(<QuizPage cardArray={cardArray1} 
                                    updateAccuracy={updateAccuracy} filters={["All", ""]}>
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
            cardArray={cardArray1}
            updateAccuracy={updateAccuracy}
            filters={["All", ""]}>
            </QuizPage>);    
        cardArray1 = [...backupArray1];               
    });
    test("Passing an empty deck to the quiz page works correctly.", () => {
        const quiz = new QuizPage({cardArray: [], updateAccuracy: {updateAccuracy}, filters: {["All", ""]}}); 
        expect(deckEquality(quiz.state.cardArray,[])).toEqual(true)
    });
    test("Passing a non-empty deck to the quiz page works correctly.", () => {
        const quiz = new QuizPage({cardArray: cardArray1, updateAccuracy: {updateAccuracy}, filters: {["All", ""]}}); 
        expect(deckEquality(quiz.state.cardArray,cardArray1)).toEqual(true)
    });
    // Because the initial index is determined by the scheduler based on accuracy, and card#11 has the lowest accuracy
    test("The initial index of the quizpage is 11", () => {
        const quiz = new QuizPage({cardArray: cardArray1, updateAccuracy: {updateAccuracy}, filters: {["All", ""]}}); 
        expect(quiz.state.currentIndex).toEqual(11)
    }); 
    test("The initial card text matches the expected first card of cardArray1", () => {
        const quiz = new QuizPage({cardArray: cardArray1, updateAccuracy: {updateAccuracy}, filters: {["All", ""]}}); 
        expect(quiz.state.currentFrontText).toEqual(cardArray1[0].frontText);
        expect(quiz.state.currentBackText).toEqual(cardArray1[0].backText);
        expect(quiz.state.currentCardHint).toEqual(cardArray1[0].cardHint);
        expect(quiz.state.currentCardDecks).toEqual(cardArray1[0].cardDecks);
    });  
});

describe("Accuracy Tests", () => {
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<QuizPage
            addCard={addCard()}
            cardArray={cardArray1}
            updateAccuracy={updateAccuracy}
            filters={["All", ""]}>
            </QuizPage>);     
        cardArray1 = [...backupArray1];               
    });
        test("Calling scheduler returns the index of the lowest-accuracy card", () => {
            const quiz = new QuizPage({cardArray: cardArray1, updateAccuracy: {updateAccuracy}, filters: {["All", ""]}}); 
            const nextIndex = getNextCard(quiz.state.cardArray, quiz.state.recentCards);
            expect(nextIndex).toEqual(applesByAccuracy[0])
        });
        test("Succeeding on the card increments its accuracy", () => {
            const quiz = new QuizPage({cardArray: cardArray1, updateAccuracy: {updateAccuracy}, filters: {["All", ""]}}); 
            const currentIndex = quiz.state.currentIndex;
            const initialAcc = quiz.state.cardArray[currentIndex].accuracy;
            expect(quiz.state.cardArray[currentIndex].accuracy).toEqual(initialAcc);
            const nextButton = screen.queryByTestId("CorrectButton");
            userEvent.click(nextButton);
            expect(quiz.state.cardArray[currentIndex].accuracy !== initialAcc).toEqual(true);
            expect(quiz.state.cardArray[currentIndex].accuracy).toEqual((initialAcc + 1));
        });
        test("Failing on a card doesn't increment its accuracy", () => {
            const quiz = new QuizPage({cardArray: cardArray1, updateAccuracy: {updateAccuracy}, filters: {["All", ""]}}); 
            const currentIndex = quiz.state.currentIndex;
            const initialAcc = quiz.state.cardArray[currentIndex].accuracy;
            expect(quiz.state.cardArray[currentIndex].accuracy).toEqual(initialAcc);
            const nextButton = screen.queryByTestId("IncorrectButton");
            userEvent.click(nextButton);
            expect(quiz.state.cardArray[currentIndex].accuracy).toEqual(initialAcc);
            expect(quiz.state.cardArray[currentIndex].accuracy !== (initialAcc + 1)).toEqual(true);
        });
        
        test("Succeeding on the card increments its accuracy within the parent class in App.jsx", () => {
            // console.log("Before acc ", cardArray1[0].accuracy);
            // updateAccuracy(cardArray1[0]);
            // console.log("After acc ", cardArray1[0].accuracy);
            const quiz = new QuizPage({cardArray: cardArray1, updateAccuracy: {updateAccuracy}, filters: {["All", ""]}}); 
            const currentIndex = quiz.state.currentIndex;
            const initialAcc = cardArray1[currentIndex].accuracy;
            expect(initialAcc).toEqual(initialAcc);
            const nextButton = screen.queryByTestId("CorrectButton");
            userEvent.click(nextButton);
            expect(cardArray1[currentIndex].accuracy).toEqual(initialAcc + 1);
        });
});

// describe("Scheduler Tests", () => {
//     beforeEach(() => {
//         // eslint-disable-next-line testing-library/no-render-in-setup
//         render(<QuizPage
//             addCard={addCard()}
//             cardArray={cardArray1}
//             updateAccuracy={updateAccuracy}
//             filters={["All", ""]}>
//             </QuizPage>);               
//         });
//         test("After studying a card its added to the recentCards state array", async () => {
//             const quiz = new QuizPage({cardArray: cardArray1, updateAccuracy: {updateAccuracy}}); 
//             const recentCards = quiz.state.recentCards;
//             const currentIndex = quiz.state.currentIndex;
//             console.log("The recent cards are: ", recentCards);
//             expect(recentCards).toEqual([]);

//             // Find the "CorrectButton" using its "data-testid" attribute.
//             // eslint-disable-next-line testing-library/prefer-screen-queries
//             const nextButton = await quiz.findByTestId("CorrectButton");

//             // Click on the "CorrectButton" to simulate a user clicking on it.
//             userEvent.click(nextButton);

//             // Check that the current card has been added to the recentCards array.
//             expect(quiz.state.recentCards).toEqual([currentIndex]);
//         });

//             //These tests need to be remade based on implementation restrictions
//             test("After studying a card its added to the recentCards state array and can't reappear for at least 3 more iterations if other cards are available", () => {
//                 // const quiz = new QuizPage({cardArray: cardArray1, updateAccuracy: {updateAccuracy}}); 
//                 // const recentCards = quiz.state.recentCards;
//                 // expect(recentCards).toEqual([]);
//                 // const nextButton0 = screen.queryByTestId("IncorrectButton");
//                 // userEvent.click(nextButton0);
//                 // const nextButton1 = screen.queryByTestId("IncorrectButton");
//                 // userEvent.click(nextButton1);
//                 // const nextButton2 = screen.queryByTestId("IncorrectButton");
//                 // userEvent.click(nextButton2);
//                 // const nextButton3 = screen.queryByTestId("IncorrectButton");
//                 // userEvent.click(nextButton3);
//                 // const nextButton4 = screen.queryByTestId("IncorrectButton");
//                 // userEvent.click(nextButton4);
//                 // expect(quiz.state.recentCards[0] !== quiz.state.recentCards[1]).toEqual(true);
//                 // expect(quiz.state.recentCards[0] !== quiz.state.recentCards[2]).toEqual(true);
//                 // expect(quiz.state.recentCards[0] !== quiz.state.recentCards[3]).toEqual(true);
//                 // expect(quiz.state.recentCards[0] === quiz.state.recentCards[4]).toEqual(true);
//             });
//             test("After studying a card if fewer than 5 cards are available then cards are repeated from within recentCards as needed", () => {
//                 // const quiz = new QuizPage({cardArray: [cardArray1[0]]}); 
//                 // const recentCards = quiz.state.recentCards;
//                 // expect(recentCards === []).toEqual(true);
//                 // const nextButton0 = screen.queryByTestId("CorrectButton");
//                 // userEvent.click(nextButton0);
//                 // const nextButton1 = screen.queryByTestId("CorrectButton");
//                 // userEvent.click(nextButton1);
//                 // const nextButton2 = screen.queryByTestId("CorrectButton");
//                 // userEvent.click(nextButton2);
//                 // const nextButton3 = screen.queryByTestId("CorrectButton");
//                 // userEvent.click(nextButton3);
//                 // const nextButton4 = screen.queryByTestId("CorrectButton");
//                 // userEvent.click(nextButton4);
//                 // expect(quiz.state.recentCards[0] === quiz.state.recentCards[1]).toEqual(true);
//                 // expect(quiz.state.recentCards[0] === quiz.state.recentCards[2]).toEqual(true);
//                 // expect(quiz.state.recentCards[0] === quiz.state.recentCards[3]).toEqual(true);
//                 // expect(quiz.state.recentCards[0] === quiz.state.recentCards[4]).toEqual(true);
//             });
// });