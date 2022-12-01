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
