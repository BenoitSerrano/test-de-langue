import { questionKindType } from '../../types';

type attemptWithAnswersApiType = {
    studentEmail: string;
    exam: examType;
};

type examType = {
    id: string;
    name: string;
    exercises: Array<{ id: number; questions: Array<questionType> }>;
};

type attemptIdsApiType = Array<string>;

type questionType = {
    id: number;
    title: string;
    kind: questionKindType;
    rightAnswers: string[];
    acceptableAnswers: string[];
    possibleAnswers: string[];
    answer: string | undefined;
    mark: number;
    points: number;
};

type answerStatusType = 'wrong' | 'acceptable' | 'right';

export type { attemptWithAnswersApiType, questionType, attemptIdsApiType, answerStatusType };
