import React from "react";
import ReactDOM from 'react-dom';
import {render, screen, cleanup, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import FlashCard from "./components/Flashcard.js";
import QuizPage from "./QuizPage.js";


function addCard(front, back, hint, deck) {
    //Not supposed to do anything but prevent this all from crashing
}


it("Flashcard Quiz cannot be edited by the user", () => {
    const {queryByTestId} = render(<QuizPage
                                    frontText={"defaultFront"}
                                    backText={"defaultBack"}
                                    cardHint={"defaultHint"}
                                    cardDecks={"defaultDeck"}
                                    addCard={addCard()}>
                                </QuizPage>);
    //Now we want to try to change the values in these boxes.
    const frontTextInput = screen.queryByTestId("FlashCardFrontText");
    const backTextInput = screen.queryByTestId("FlashCardBackText");
    userEvent.type(frontTextInput, "This is a changed front");
    expect(frontTextInput.value).toBe("DefaultFront");

    userEvent.type(backTextInput, "This is a changed back");
    expect(backTextInput.value).toBe("DefaultBack");
})

