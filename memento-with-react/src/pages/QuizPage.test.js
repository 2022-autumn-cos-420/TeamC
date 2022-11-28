import React from "react";
import ReactDOM from 'react-dom';
import {render, screen, cleanup, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import FlashCard from "./components/Flashcard.js";
import QuizPage from "./QuizPage.js";


function addCard(front, back, hint, deck) {
    //Not supposed to do anything but prevent this all from crashing
}


let cardArray1 =  [
    {id: 0, cardColor: "Red", frontText: "First One", backText: "First One Back", cardHint: "cardHint One!", cardDecks: ["Apples...", "Bananas"]},
    {id: 1, cardColor: "Red", frontText: "front TW4o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."]},
    {id: 2, cardColor: "Red", frontText: "front TH3REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."]},
    {id: 3, cardColor: "Red", frontText: "front On6e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."]},
    {id: 4, cardColor: "Red", frontText: "front TW5o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."]},
    {id: 5, cardColor: "Red", frontText: "front THR7EE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."]},
    {id: 6, cardColor: "Red", frontText: "front On9e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."]},
    {id: 7, cardColor: "Red", frontText: "front TW8o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."]},
    {id: 8, cardColor: "Red", frontText: "front TH0REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."]},
    {id: 9, cardColor: "Red", frontText: "front On-e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."]},
    {id: 10, cardColor: "Red", frontText: "front T=Wo!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."]},
    {id: 11, cardColor: "Red", frontText: "front ThHREE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."]},
    {id: 12, cardColor: "Red", frontText: "front Oane!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples..."]},
    {id: 13, cardColor: "Red", frontText: "front TbWo!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples..."]},
    {id: 14, cardColor: "Red", frontText: "Last One!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."]}
  ]
  



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