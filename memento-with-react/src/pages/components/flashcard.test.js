import React from "react";
import ReactDOM from 'react-dom';
import {render, screen, cleanup, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import FlashCard from "./Flashcard.js";



it("Flashcard Renders without crashing", () => {
    const {queryByTestId} = render(<FlashCard 
        type={"Quiz"} 
        frontText = "This is the front"
        backText = "This is the back"
        cardHint = "This is a hint"
        cardDecks = "This is the deck"   
    ></FlashCard>);
});


it("Flashcard Quiz Renders Appropriate text passed to it", () => {
    const {queryByTestId} = render(<FlashCard 
                        type={"Quiz"} 
                        frontText = "This is the front"
                        backText = "This is the back"
                        cardHint = "This is a hint"
                        cardDecks = "This is the deck"   
                    ></FlashCard>);

    expect(screen.getByTestId("FlashCardFrontText")).toHaveValue("This is the front");
    expect(screen.getByTestId("FlashCardBackText")).toHaveValue("This is the back");
    expect(screen.getByTestId("FlashCardFrontDeck")).toHaveValue("This is the deck");
    expect(screen.getByTestId("FlashCardFrontHint")).toHaveValue("This is a hint");
    expect(screen.getByTestId("FlashCardBackHint")).toHaveValue("This is a hint");
});

function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}


function update(front, back, hint, decks) {

}

it("Flashcard Normal can be edited by the user", () => {
    const {queryByTestId} = render(<FlashCard 
                    type={"Normal"} 
                    frontText = ""
                    backText = ""
                    cardHint = ""
                    cardDecks = "" 
                    update = {update}  
                ></FlashCard>);
    //Now we want to try to change the values in these boxes.
    const frontTextInput = screen.queryByTestId("FlashCardFrontText");
    const backTextInput = screen.queryByTestId("FlashCardBackText");
    userEvent.type(frontTextInput, "This is a changed front");
    expect(frontTextInput.value).toBe("This is a changed front");

    userEvent.type(backTextInput, "This is a changed back");
    expect(backTextInput.value).toBe("This is a changed back");
})



it("Flashcard Quiz cannot be edited by the user", () => {
    const {queryByTestId} = render(<FlashCard 
                    type={"Quiz"} 
                    frontText = "This is the original front"
                    backText = "This is the original back"
                    cardHint = "This is the original hint"
                    cardDecks = "This is the original deck"
                    update = {update}  
                ></FlashCard>);
    //Now we want to try to change the values in these boxes.
    const frontTextInput = screen.queryByTestId("FlashCardFrontText");
    const backTextInput = screen.queryByTestId("FlashCardBackText");
    userEvent.type(frontTextInput, "This is a changed front");
    expect(frontTextInput.value).toBe("This is the original front");

    userEvent.type(backTextInput, "This is a changed back");
    expect(backTextInput.value).toBe("This is the original back");
})