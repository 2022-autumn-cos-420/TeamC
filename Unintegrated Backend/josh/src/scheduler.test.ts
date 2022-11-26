import { Question } from "./interfaces/question";
import {
    getPublishedQuestions,
} from "./scheduler";
import testQuestionData from "./data/questions.json";
import backupQuestionData from "./data/questions.json";

const {
    BLANK_QUESTIONS,
}: Record<string, Question[]> =
    // Typecast the test data that we imported to be a record matching
    //  strings to the question list
    testQuestionData as Record<string, Question[]>;

// We have backup versions of the data to make sure all changes are immutable
const {
    BLANK_QUESTIONS: BACKUP_BLANK_QUESTIONS,
}: Record<string, Question[]> = backupQuestionData as Record<
    string,
    Question[]
>;

const NEW_BLANK_QUESTION = {
    id: 142,
    name: "A new question",
    body: "",
    type: "short_answer_question",
    options: [],
    expected: "",
    points: 1,
    published: false
};


////////////////////////////////////////////
// Actual tests

describe("Testing the Question[] functions", () => {
    //////////////////////////////////
    // getPublishedQuestions

    test("Testing the getPublishedQuestions function", () => {
        expect(getPublishedQuestions(BLANK_QUESTIONS)).toEqual([]);

    // test("Testing the removeQuestion", () => {
    //     expect(removeQuestion(BLANK_QUESTIONS, 1)).toEqual([
    //         {
    //             id: 47,
    //             name: "My New Question",
    //             body: "",
    //             type: "multiple_choice_question",
    //             options: [],
    //             expected: "",
    //             points: 1,
    //             published: false
    //         }
    //     ]);
    test("Testing the sameType function", () => {
        expect(sameType(BLANK_QUESTIONS)).toEqual(false);
    });

    afterEach(() => {
        expect(BLANK_QUESTIONS).toEqual(BACKUP_BLANK_QUESTIONS);
    });
});
