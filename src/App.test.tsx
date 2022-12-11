/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from './App';
import * as fs from "fs";
import { Card } from "./interfaces/card";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";
import userEvent from '@testing-library/user-event';
//Have to make a mockup of the prompt function since it's not implemented
// window.prompt = jest.fn()


let cardArray: Card[] =  [
  {id: 0, cardColor: "Red", frontText: "front On2e!", backText: "back Onsdae!", cardHint: "cardHint One!", cardDecks: ["Apples", "Bananas"], accuracy: 0},
  {id: 1, cardColor: "Red", frontText: "front TW4o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Bananas"], accuracy: 100},
  {id: 2, cardColor: "Red", frontText: "front TH3REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples"], accuracy: 40},
  {id: 3, cardColor: "Red", frontText: "front On6e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples"], accuracy: 75},
  {id: 4, cardColor: "Red", frontText: "front TW5o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples"], accuracy: 11},
  {id: 5, cardColor: "Red", frontText: "front THR7EE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples"], accuracy: 53},
  {id: 6, cardColor: "Red", frontText: "front On9e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples"], accuracy: 66},
  {id: 7, cardColor: "Red", frontText: "front TW8o!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples"], accuracy: 14},
  {id: 8, cardColor: "Red", frontText: "front TH0REE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples"], accuracy: 122},
  {id: 9, cardColor: "Red", frontText: "front On-e!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples"], accuracy: 100},
  {id: 10, cardColor: "Red", frontText: "front T=Wo!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples"], accuracy: 5},
  {id: 11, cardColor: "Red", frontText: "front ThHREE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples"], accuracy: 1},
  {id: 12, cardColor: "Red", frontText: "front Oane!", backText: "back One!", cardHint: "cardHint One!", cardDecks: ["Apples"], accuracy: 45},
  {id: 13, cardColor: "Red", frontText: "front TbWo!", backText: "back TWo!", cardHint: "cardHint TWO!", cardDecks: ["Apples"], accuracy: 10},
  {id: 14, cardColor: "Red", frontText: "front THeREE!", backText: "back Three", cardHint: "cardHint Three!", cardDecks: ["Apples"], accuracy: 30}
]


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });




test('can export collection', async () => {
  render(<App />);
  const collectionElement = screen.getByText(/Collection/i);
  expect(collectionElement).toBeInTheDocument();
  act(()=>{collectionElement.click()});
  // console.log(screen);
  const exportElement = screen.getByTestId(/exportToggle/i);
  expect(exportElement).toBeInTheDocument();
  act(()=>{exportElement.click()});
  //Ideally this should be changed to reflect that prompt() was triggered, but for now I skip prompt() and hardcode a path
  const typeElement = screen.getByTestId(/exportLocation/i);
  expect(typeElement).toBeInTheDocument();
  userEvent.type(typeElement, "jestTestExport.txt");
  expect(typeElement).toHaveValue("jestTestExport.txt");
  global.URL.createObjectURL = jest.fn();

  expect(screen.queryByText(/Exported Successfully/i)).not.toBeInTheDocument();
  const downloadElement = screen.getByTestId(/downloadButton/i);
  expect(downloadElement).toBeInTheDocument();
  act(()=>{downloadElement.click()});
  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() => expect(screen.getByText(/Exported Successfully: 15 cards/i)).toBeTruthy());
  // expect(successElement).toBeInTheDocument();
});


test('can import collection', async () => {
  render(<App />);
  const collectionElement = screen.getByText(/Collection/i);
  expect(collectionElement).toBeInTheDocument();
  act(()=>{collectionElement.click()});
  // console.log(screen);

  const initialCardCountElement = screen.getByText(/Cards: 15/i);
  expect(initialCardCountElement).toBeInTheDocument();

  const importElement = screen.getByText(/Import Cards/i);
  expect(importElement).toBeInTheDocument();
  //Ideally this should be changed to reflect that prompt() was triggered, but for now I skip prompt() and hardcode a path
  act(()=>{importElement.click()});

  const fakeFile = new File(["Red<|>Card One<|>The first card<|>Hint One<|>deck1,deck2,deck3<|>20"], 'newMockCards.txt', { type: 'text/html' });
  const fakeFile2 = new File(
    ["Red<|>Card One<|>The first card<|>Hint One<|>deck1,deck2,deck3<|>20<|||>Red<|>Card2<|>The second card w/ highest accuracy<|>Hint Two<|>deck1,deck3,deck4<|>50<|||>Red<|>Card 3<|>3rd Card with worst accuracy<|>Hint Three<|>deck1,deck2,deck4<|>10"], 
    'newMockCards.txt', { type: 'txt' }
    );

  const uploadElement = screen.getByTestId(/fileUpload/i);
  expect(uploadElement).toBeInTheDocument();
      // simulate upload event and wait until finish
  // fireEvent.change(uploadElement, {
  //     target: { files: [fakeFile2] },
  // })
  // userEvent.upload(uploadElement, fakeFile2)
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.upload(uploadElement, fakeFile2);
    });
  });
  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() => expect(screen.getByText(/Cards: 18/i)).toBeTruthy());
  // const postCardCountElement = screen.getByText(/Cards: 18/i);
  // expect(postCardCountElement).toBeInTheDocument()
});




test('duplicate cards are not imported', async () => {
  render(<App />);
  const collectionElement = screen.getByText(/Collection/i);
  expect(collectionElement).toBeInTheDocument();
  act(()=>{collectionElement.click()});

  const initialCardCountElement = screen.getByText(/Cards: 18/i);
  expect(initialCardCountElement).toBeInTheDocument();

  const importElement = screen.getByText(/Import Cards/i);
  expect(importElement).toBeInTheDocument();
  act(()=>{importElement.click()});

  //produces duplicate cards of the 3 made in the import test
  const fakeFile = new File(
    ["Red<|>Card One<|>The first card<|>Hint One<|>deck1,deck2,deck3<|>20<|||>Red<|>Card2<|>The second card w/ highest accuracy<|>Hint Two<|>deck1,deck3,deck4<|>50<|||>Red<|>Card 3<|>3rd Card with worst accuracy<|>Hint Three<|>deck1,deck2,deck4<|>10"], 
    'newMockCards.txt', { type: 'txt' }
    );

  const uploadElement = screen.getByTestId(/fileUpload/i);
  expect(uploadElement).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.upload(uploadElement, fakeFile);
    });
  });
  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() => expect(screen.getByText(/Cards: 18/i)).toBeTruthy());

});

//Here we need to write some tests for the deck page:
//We need to click on the Decks Page, try to go from one page to another
//Then test going to the quiz page from the deck page,
//Test going to the collection page from the deck page,

test("The user can add a card with a deck, and see the new deck in the deckspage", () => {
  const {queryByTestId} = render(<App />);
  const decksButton = screen.getByTestId("goDecksButton");
  let newCard = {
    id: 100,
    cardColor: "Red",
    frontText: "This is some front text",
    backText: "This is some back text",
    cardHint: "This is some hint text",
    cardDecks: ["TotallydifferentDeck"],
  }
  const frontTextInput = screen.getByTestId("FlashCardFrontText");
  const backTextInput = screen.getByTestId("FlashCardBackText");
  const decksInput = screen.getByTestId("FlashCardFrontDeck");
  const addCardButton = screen.getByTestId("AddCardButton");

  userEvent.type(frontTextInput,newCard.frontText);
  userEvent.type(backTextInput, newCard.backText);
  userEvent.type(decksInput, newCard.cardDecks[0]);
  userEvent.click(addCardButton);
  userEvent.click(decksButton);
  const goNextPageButton = screen.getByTestId("NextPageButton");
  userEvent.click(goNextPageButton);
  

  const deckCard3Name = screen.getByTestId(newCard.cardDecks[0]);

  expect(deckCard3Name.textContent).toBe(newCard.cardDecks[0]);

});

test("The user can navigate to the decks page and study a deck from there", () => {
  const {queryByTestId} = render(<App />);
  const decksButton = screen.getByTestId("goDecksButton");
  userEvent.click(decksButton); //Go to the decks page
  const applesDeckName = screen.getByTestId("Apples");
  userEvent.click(applesDeckName); //Study the "Apples" deck
  //We should check to see if the correct or incorrect button are there, that would indicate if we are on the quiz page
  //Remember, the Quiz page does not have a banner
  const correctButton = screen.getByTestId("CorrectButton");
  expect(correctButton.textContent).toBe("Correct");
  

})

test("The user can navigate to the decks page, select Apples and not be shown bananas", () => {
  const {queryByTestId} = render(<App />);
  const decksButton = screen.getByTestId("goDecksButton");
  userEvent.click(decksButton); //Go to the decks page
  const applesDeckName = screen.getByTestId("Apples");
  userEvent.click(applesDeckName); //Study the "Apples" deck
  //We should check to see if the correct or incorrect button are there, that would indicate if we are on the quiz page
  //Remember, the Quiz page does not have a banner
  const correctButton = screen.getByTestId("CorrectButton");
  userEvent.click(correctButton);
  const currentCardDeck = screen.getByTestId("FlashCardFrontDeck");
  expect(currentCardDeck).toHaveValue("Apples"); //We have succesfully filtered out bananas!
})

test("The user can navigate off of the quiz page and back on to get quizzed on all of the cards", () => {
  const {queryByTestId} = render(<App />);
  const decksButton = screen.getByTestId("goDecksButton");
  userEvent.click(decksButton); //Go to the decks page
  const applesDeckName = screen.getByTestId("Apples");
  userEvent.click(applesDeckName); //Study the "Apples" deck
  //We should check to see if the correct or incorrect button are there, that would indicate if we are on the quiz page
  //Remember, the Quiz page does not have a banner
  const correctButton = screen.getByTestId("CorrectButton");
  userEvent.click(correctButton);
  const currentCardDeck = screen.getByTestId("FlashCardFrontDeck");
  expect(currentCardDeck).toHaveValue("Apples"); //We have succesfully filtered out bananas!

  const homeButton = screen.getByTestId("goHomeButton");
  userEvent.click(homeButton);
  const quizButton = screen.getByTestId("goQuizButton");
  userEvent.click(quizButton);
  userEvent.click(correctButton);

  expect(currentCardDeck).toHaveValue("Apples");
})

test("The user can delete a deck and have it be removed from the DecksPage", () => {
  const {queryByTestId} = render(<App />);
  const decksButton = screen.getByTestId("goDecksButton");
  userEvent.click(decksButton);
  const applesDeleteButton = screen.getByTestId("DeleteDeckButton:Apples");
  userEvent.click(applesDeleteButton);
  const applesDeckName = screen.queryByTestId("Apples");
  expect(applesDeckName).toBeNull();

})



test("The user can click on the edit button from the deck page and it will take them to the collection page", () => {
  const {queryByTestId} = render(<App />);
  const decksButton = screen.getByTestId("goDecksButton");
  userEvent.click(decksButton);
  const bananasEditButton = screen.getByTestId("EditDeckButton:Bananas");
  userEvent.click(bananasEditButton);

  const collectBanner = screen.getByTestId("CollectionBanner");
  expect(collectBanner.textContent).toBe("Collection");
})
