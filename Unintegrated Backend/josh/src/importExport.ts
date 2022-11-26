import { urlToHttpOptions } from "url";
import { Card } from "./interfaces/card";
import * as fs from "fs";
import * as path from "path";
import { equal } from "assert";
import { cardEquality, arrayEquality, exportPath, deckEquality } from "./utils";



// File management from tutorial: https://iq.opengenus.org/create-delete-files-directory-js/
/***
Goes over all cards in the users collection and exports them to a formatted txt file. 
The user must provide a file name for the exported file.
If deckID is non-empty, then only cards included in the specified deck will be exported.
Returns true on success and false on a failure
 */
export function exportCards(
    cards: Card[],
    fileName: string,
    deckID = ""
): boolean {
    if (!fs.existsSync(exportPath)){
        fs.mkdirSync(exportPath);
    }
    fs.writeFileSync((exportPath + "mytext.txt"), "hello world 3000!");
    fs.writeFileSync((exportPath + "mytext2.txt"), "hello world 3000!");
    fs.unlinkSync((exportPath + "mytext.txt"));

    return true;
}

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

