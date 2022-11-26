import { urlToHttpOptions } from "url";
import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";


/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    // const newQuestions: Question[] = [...questions];
    const newQuestions = questions.map(
        (question: Question): Question => ({ ...question })
    );

    const index = newQuestions.find(
        (question: Question): boolean => question.id === targetId
    );
    if (index !== undefined) {
        // newQuestions[index].name = newName;
        index.name = newName;
    }
    // console.log(targetId);
    // console.log(questions);
    // console.log(newQuestions);
    return newQuestions;
}
