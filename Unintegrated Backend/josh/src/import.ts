import { Card } from "./interfaces/card";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";

import testCardData from "./data/cards.json";
// import backupQuestionData from "./data/questions.json";

/***
 * import cards from a given txt file path, returns the array of imported cards.
 * If deckName is specified, cards will only be added to the specified deck
 */
export function importCards(
    filePath: string,
    deckName: string = ""
): Card[] {
    let importedCards: Card[] = [];
    return importedCards;
}
