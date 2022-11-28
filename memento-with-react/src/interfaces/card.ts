/** A representation of a Card in a quizzing application */
export interface Card {
    /** An arbitrary number ID, unique within the collection of cards */
    id: number;
    /** The test displayed on the front of the card */
    cardColor: string;
    /** The test displayed on the front of the card */
    frontText: string;
    /** The test displayed on the back of the card */
    backText: string;
    /** The test displayed on the front of the card */
    cardHint: string;
    /** The names of decks which the card is included in */
    cardDecks: string[];
    /** The accuracy statistic based on user study of the card across all decks that it's included in*/
    accuracy: number;
}
