import React from "react";
import ReactDOM from 'react-dom';
import {render, screen} from '@testing-library/react';
import FlashCard from "./Flashcard.js";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FlashCard type={"Normal"}></FlashCard>, div)
})

it("renders flashcard correctly", () => {
    
})