import { examDtoType } from '../exam/types';
import { computeAttemptStatus } from '../lib/computeExamStatus';
import { Student } from '../student';
import { Attempt } from './Attempt.entity';
import { attemptUtils } from './attempt.utils';
import { attemptAnswersType } from './types';

const attemptAdaptator = {
    convertAttemptToAttemptWithAnswers,
    convertAttemptToAttemptWithoutAnswers,
};

function convertAttemptToAttemptWithoutAnswers(
    attempt: Attempt,
    exam: examDtoType,
    attemptAnswers: attemptAnswersType,
    studentEmail: Student['email'],
) {
    return {
        id: attempt.id,
        startedAt: attempt.startedAt,
        endedAt: attempt.endedAt,
        studentEmail,
        exam: {
            id: exam.id,
            name: exam.name,
            duration: exam.duration,
            extraTime: exam.extraTime,
            exercises: exam.exercises.map((exercise) => ({
                ...exercise,
                questions: exercise.questions.map((question) => ({
                    id: question.id,
                    kind: question.kind,
                    title: question.title,
                    possibleAnswers: question.possibleAnswers,
                    points: question.points,
                    currentAnswer: attemptAnswers[question.id],
                })),
            })),
        },
    };
}

function convertAttemptToAttemptWithAnswers(
    attempt: Attempt,
    exam: examDtoType,
    attemptAnswers: attemptAnswersType,
    studentEmail: Student['email'],
) {
    const now = new Date();

    const attemptStatus = computeAttemptStatus(
        attempt,
        {
            duration: exam.duration,
            extraTime: exam.extraTime,
        },
        now,
    );

    return {
        id: attempt.id,
        startedAt: attempt.startedAt,
        updatedAt: attempt.updatedAt,
        attemptStatus,
        studentEmail,
        exam: {
            id: exam.id,
            name: exam.name,
            duration: exam.duration,
            extraTime: exam.extraTime,
            exercises: exam.exercises.map((exercise) => ({
                ...exercise,
                questions: exercise.questions.map((question) => ({
                    ...question,
                    ...attemptUtils.computeNotationInfo({
                        answers: attemptAnswers,
                        marksArray: attempt.marks,
                        question,
                    }),
                    answer: attemptAnswers[question.id],
                })),
            })),
        },
    };
}

// QCM: grade
// texteATrous: mark
// questionReponse: grade
// texteLibre : grade
// phraseMelange: grade

export { attemptAdaptator };
