import React from "react";
import ReactDOM from 'react-dom';
import {render, screen, cleanup, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import FlashCard from "./components/Flashcard.js";
import HomePage from "./HomePage.js";
import { wait } from "@testing-library/user-event/dist/utils/index.js";


function addCard(front, back, hint, deck) {
    //Not supposed to do anything but prevent this all from crashing
}


it("Flashcard Normal can be edited by the user", () => {
    const {queryByTestId} = render(<HomePage
                                    frontText={""}
                                    backText={""}
                                    cardHint={""}
                                    cardDecks={""}
                                    addCard={addCard()}>
                                </HomePage>);
    //Now we want to try to change the values in these boxes.
    const frontTextInput = screen.queryByTestId("FlashCardFrontText");
    const backTextInput = screen.queryByTestId("FlashCardBackText");
    userEvent.type(frontTextInput, "This is a changed front");
    expect(frontTextInput.value).toBe("This is a changed front");

    userEvent.type(backTextInput, "This is a changed back");
    expect(backTextInput.value).toBe("This is a changed back");
})

it("Flashcard will reset all fields if they press addCard", () => {
    const {queryByTestId} = render(<HomePage
        frontText={""}
        backText={""}
        cardHint={""}
        cardDecks={""}
        addCard={addCard}>
    </HomePage>);

    const frontTextInput = screen.getByTestId("FlashCardFrontText");
    const backTextInput = screen.getByTestId("FlashCardBackText");
    const decksInput = screen.getByTestId("FlashCardFrontDeck");
    const addCardButton = screen.getByTestId("AddCardButton");

    userEvent.type(frontTextInput, "This is the front");
    userEvent.type(backTextInput, "This is the back");
    userEvent.type(decksInput, "Deck 1");

    userEvent.click(addCardButton);

    expect(frontTextInput.value).toBe("");

})


it("Flashcard will NOT reset if not all appropriate fields are filled in (front, back and deck)", () => {
    const {queryByTestId} = render(<HomePage
        frontText={""}
        backText={""}
        cardHint={""}
        cardDecks={""}
        addCard={addCard}>
    </HomePage>);

    const frontTextInput = screen.getByTestId("FlashCardFrontText");
    const backTextInput = screen.getByTestId("FlashCardBackText");
    const decksInput = screen.getByTestId("FlashCardFrontDeck");
    const addCardButton = screen.getByTestId("AddCardButton");

    userEvent.type(frontTextInput, "This is the front");
    userEvent.type(backTextInput, "This is the back");
    userEvent.type(decksInput, "");

    userEvent.click(addCardButton);

    expect(frontTextInput.value).toBe("This is the front");

}) 