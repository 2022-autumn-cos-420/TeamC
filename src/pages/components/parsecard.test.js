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
      expect(screen.getByPlaceholderText('Start Delimiter')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Separator')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('End Delimiter')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Deck')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Please Type Here:')).toBeInTheDocument();
    });
  
    test('input fields have correct initial values', () => {
      const props = {
        ParseCardDeck: 'deck1',
        ParseCardStartDelimiter: '*',
        ParseCardEndDelimiter: '#',
        ParseCardSeparator: '\n',
        ParseCardTextArea: 'card1\ncard2\ncard3',
      };
      const { getByTestId } = render(<ParseCard {...props} />);
      expect(screen.getByTestId('ParseCardStartDelimiter').value).toBe('*');
      expect(screen.getByTestId('ParseCardSeparator').value).toBe('\n');
      expect(screen.getByTestId('ParseCardEndDelimiter').value).toBe('#');
      expect(screen.getByTestId('ParseCardDeck').value).toBe('deck1');
      expect(screen.getByTestId('ParseCardTextArea').value).toBe('card1\ncard2\ncard3');
    });

});