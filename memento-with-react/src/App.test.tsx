import { act, render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import * as fs from "fs";
import { Card } from "./interfaces/card";
import { exportCards, importCards, loadCardsFromTxt} from "./importExport";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";
//Have to make a mockup of the prompt function since it's not implemented
// window.prompt = jest.fn()


let cardArray: Card[] =  [
  {id: 0, cardColor: "Red", frontText: "front On2e!", backText: "back Onsdae!", cardHint: "cardHint One!", cardDecks: ["Apples...", "Bananas"], accuracy: 0},
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
  {id: 14, cardColor: "Red", frontText: "front THeREE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples..."], accuracy: 30}
]


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



test('can export collection', () => {
  render(<App />);
  const collectionElement = screen.getByText(/Collection/i);
  expect(collectionElement).toBeInTheDocument();
  act(()=>{collectionElement.click()});
  // console.log(screen);
  const exportElement = screen.getByText(/Export/i);
  expect(exportElement).toBeInTheDocument();
  expect(fs.existsSync(("./exportedCards/jestTestFile.txt"))).toEqual(false);
  //Ideally this should be changed to reflect that prompt() was triggered, but for now I skip prompt() and hardcode a path
  act(()=>{exportElement.click()});
  expect(fs.existsSync(("./exportedCards/jestTestFile.txt"))).toEqual(true);
  expect(deckEquality(importCards(("./exportedCards/jestTestFile.txt"), []), cardArray)).toEqual(true);
  fs.unlinkSync((("./exportedCards/jestTestFile.txt")))
});



// test('can import collection', () => {
//   render(<App />);
//   const collectionElement = screen.getByText(/Collection/i);
//   expect(collectionElement).toBeInTheDocument();
//   act(()=>{collectionElement.click()});
//   // console.log(screen);
//   const importElement = screen.getByText(/Import Collection/i);
//   expect(importElement).toBeInTheDocument();
//   expect(fs.existsSync(("./exportedCards/jestTestFile.txt"))).toEqual(false);
//   //Ideally this should be changed to reflect that prompt() was triggered, but for now I skip prompt() and hardcode a path
//   act(()=>{exportElement.click()});
//   expect(fs.existsSync(("./exportedCards/jestTestFile.txt"))).toEqual(true);
//   expect(deckEquality(importCards(("./exportedCards/jestTestFile.txt"), []), cardArray)).toEqual(true);
//   fs.unlinkSync((("./exportedCards/jestTestFile.txt")))
// });
