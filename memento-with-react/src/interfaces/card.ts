/** A representation of a Card in a quizzing application */
export interface Card {
    /** The test displayed on the front of the card */
    front: string;
    /** The test displayed on the back of the card */
    back: string;
    /** The names of decks which the card is included in */
    decks: string[];
    /** The accuracy statistic based on user study of the card across all decks that it's included in*/
    accuracy: number;
}
