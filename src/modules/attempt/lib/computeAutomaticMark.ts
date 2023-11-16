import { sanitizer } from '../../../lib/sanitizer';
import { questionKindType } from '../../question/types';

export { computeAutomaticMark };

function computeAutomaticMark({
    questionKind,
    points,
    answer,
    rightAnswers,
    acceptableAnswers,
}: {
    questionKind: questionKindType;
    points: number;
    answer: string | undefined;
    rightAnswers: string[];
    acceptableAnswers: string[];
}): number {
    if (!answer) {
        return 0;
    }
    if (questionKind === 'texteATrous') {
        const words = answer.split('|');
        if (words.length !== rightAnswers.length) {
            throw new Error(
                `The answer "${answer}" does not have the same number of words as rightAnswers "${rightAnswers.join(
                    '|',
                )}"`,
            );
        }
        const pointPerAnswer = points / words.length;
        return words.reduce((mark, word, index) => {
            if (sanitizer.sanitizeString(word) === sanitizer.sanitizeString(rightAnswers[index])) {
                return mark + pointPerAnswer;
            } else {
                return mark;
            }
        }, 0);
    }
    if (rightAnswers.length === 0) {
        throw new Error(`Cannot compute automatic mark for rightAnswers=[]`);
    }
    if (answer === undefined) {
        return 0;
    }
    if (
        rightAnswers.some(
            (rightAnswer) =>
                sanitizer.sanitizeString(rightAnswer) === sanitizer.sanitizeString(answer),
        )
    ) {
        return points;
    } else if (
        acceptableAnswers.some(
            (acceptableAnswer) =>
                sanitizer.sanitizeString(acceptableAnswer) === sanitizer.sanitizeString(answer),
        )
    ) {
        return points / 2;
    } else {
        return 0;
    }
}
