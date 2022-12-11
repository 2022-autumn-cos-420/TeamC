import React from "react";
import ReactDOM from 'react-dom';
import {render, screen, cleanup, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import FlashCard from "./Flashcard.js";
import ParseCard from "./Parsecard.js";


const ParseCardStartDelimiterHandler = jest.fn();
const ParseCardSeparatorHandler = jest.fn();
const ParseCardEndDelimiterHandler = jest.fn();
const ParseCardDecksHandler = jest.fn();
const ParseCardTextAreaHandler = jest.fn();

describe('ParseCard', () => {
    test('renders input fields with correct placeholder text', () => {
      const { getByPlaceholderText } = render(<ParseCard />);

      expect(screen.getByPlaceholderText('Deck')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Please Type Here:')).toBeInTheDocument();
    });
  
    test('input fields have correct initial values', () => {
      const props = {
        ParseCardDeck: 'deck1',
        ParseCardStartDelimiter: '{',
        ParseCardEndDelimiter: '}',
        ParseCardSeparator: ':',
        ParseCardTextArea: '{term:definition}\n{term2:definition2}',
      };
      const { getByTestId } = render(<ParseCard {...props} />);
      expect(screen.getByTestId('ParseCardStartDelimiter').value).toBe('{');
      expect(screen.getByTestId('ParseCardSeparator').value).toBe(':');
      expect(screen.getByTestId('ParseCardEndDelimiter').value).toBe('}');
      expect(screen.getByTestId('ParseCardDeck').value).toBe('deck1');
      expect(screen.getByTestId('ParseCardTextArea').value).toBe('{term:definition}\n{term2:definition2}');
    });
    test('input fields update their values on change', () => {
      const { getByTestId } = render(<ParseCard />);
      fireEvent.change(screen.getByTestId('ParseCardStartDelimiter'), { target: { value: '{' } });
      fireEvent.change(screen.getByTestId('ParseCardSeparator'), { target: { value: ':' } });
      fireEvent.change(screen.getByTestId('ParseCardEndDelimiter'), { target: { value: '}' } });
      fireEvent.change(screen.getByTestId('ParseCardDeck'), { target: { value: 'deck1' } });
      fireEvent.change(screen.getByTestId('ParseCardTextArea'), { target: { value: '{term:definition}\n{term2:definition2}' } });
      expect(screen.getByTestId('ParseCardStartDelimiter').value).toBe('{');
      expect(screen.getByTestId('ParseCardSeparator').value).toBe(':');
      expect(screen.getByTestId('ParseCardEndDelimiter').value).toBe('}');
      expect(screen.getByTestId('ParseCardDeck').value).toBe('deck1');
      expect(screen.getByTestId('ParseCardTextArea').value).toBe('{term:definition}\n{term2:definition2}');
    });
    
});