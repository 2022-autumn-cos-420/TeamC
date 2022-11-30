import React from "react";
import ReactDOM from 'react-dom';
import {render, screen, cleanup, waitFor} from '@testing-library/react';
import CollTab from "./Colltab.js";


//Eventually we hope to fix the spacing between the decks, but as long as they render we are happy
it("CollTab renders the appropriate values given to it", () => {
    // let fakeCard = {
    //     id: 0,
    //     cardColor: "Red",
    //     frontText: "This is the front",
    //     backText: "This is the back",
    //     cardHint: "This is the hint",
    //     cardDecks: ["Deck 1", "Deck 2"],
    //     accuracy: 0
    // }
    const {queryByTestId} = render(<CollTab 
                                        card = {{
                                            id: 0,
                                            cardColor: "Red",
                                            frontText: "This is the front",
                                            backText: "This is the back",
                                            cardHint: "This is the hint",
                                            cardDecks: ["Deck 1", "Deck 2"],
                                            accuracy: 0
                                        }}>
                                    </CollTab>);
    expect(screen.getByTestId("CollTabFrontText")).toHaveTextContent("This is the front");
    expect(screen.getByTestId("CollTabBackText")).toHaveTextContent("This is the back");
    expect(screen.getByTestId("CollTabCardDecks")).toHaveTextContent("Deck 1Deck 2");
    expect(screen.getByTestId("CollTabCardHint")).toHaveTextContent("This is the hint");
});

