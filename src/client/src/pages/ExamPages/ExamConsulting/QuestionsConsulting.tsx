import { Typography, styled } from '@mui/material';
import { TestPageLayout } from '../components/TestPageLayout';
import { exerciseWithAnswersType } from '../types';
import { computeAnswerStatus } from '../lib/computeAnswerStatus';
import { computeResult } from '../lib/computeResult';
import { QuestionChecking } from '../ExamChecking/QuestionChecking';
import { ExerciseContainer } from '../components/ExerciseContainer';
import { useState } from 'react';
import { QuestionContainer } from '../components/QuestionContainer';
import { computeDisplayedMark } from '../ExamChecking/lib/computeDisplayedMark';

function QuestionsConsulting(props: {
    exercises: Array<exerciseWithAnswersType>;
    examName: string;
    studentEmail: string;
    attemptId: string;
}) {
    const [currentExerciseExpanded, setCurrentExerciseExpanded] = useState<number | undefined>(
        undefined,
    );
    const result = computeResult(props.exercises);

    return (
        <TestPageLayout
            studentEmail={props.studentEmail}
            title={props.examName}
            buttons={[]}
            result={result}
        >
            <>
                {props.exercises.map((exercise, exerciseIndex) => (
                    <ExerciseContainer
                        isExpanded={currentExerciseExpanded === exercise.id}
                        onChangeExpanded={buildOnExerciseExpandedChange(exercise.id)}
                        key={`exercise-${exercise.id}`}
                        exercise={exercise}
                        isLastItem={exerciseIndex === props.exercises.length - 1}
                    >
                        {exercise.questions.map((question, index: number) => {
                            const grade =
                                question.kind === 'texteATrous' ? undefined : question.grade;
                            const answerStatus = computeAnswerStatus(grade);
                            const mark =
                                question.kind === 'texteATrous' ? question.mark : undefined;
                            const displayedMark = computeDisplayedMark({
                                answer: question.answer,
                                mark,
                                grade,
                                totalPoints: question.points,
                            });
                            return (
                                <QuestionContainer
                                    key={question.id}
                                    isLastItem={index === exercise.questions.length - 1}
                                >
                                    <QuestionIndicatorsContainer>
                                        <QuestionIndicatorContainer>
                                            <Typography>{displayedMark}</Typography>
                                        </QuestionIndicatorContainer>
                                    </QuestionIndicatorsContainer>
                                    <QuestionChecking
                                        key={'question' + question.id}
                                        index={index + 1}
                                        question={question}
                                        answerStatus={answerStatus}
                                    />
                                </QuestionContainer>
                            );
                        })}
                    </ExerciseContainer>
                ))}
            </>
        </TestPageLayout>
    );

    function buildOnExerciseExpandedChange(exerciseId: number) {
        return (_: any, isExpanded: boolean) => {
            setCurrentExerciseExpanded(isExpanded ? exerciseId : undefined);
        };
    }
}

const QuestionIndicatorContainer = styled('div')({
    minWidth: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
});

const QuestionIndicatorsContainer = styled('div')({});

export { QuestionsConsulting };
