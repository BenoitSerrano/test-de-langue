import { IconButton, TextField, Typography, styled } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FLOATING_NUMBER_REGEX } from '../../constants';
import { QuestionChecking } from './QuestionChecking';
import { TestPageLayout } from '../../components/TestPageLayout';
import { LoadingButton } from '@mui/lab';
import { api } from '../../lib/api';
import { useAlert } from '../../lib/alert';
import { exerciseType } from './types';
import { computeAnswerStatus } from './lib/computeAnswerStatus';
import { UpdateAnswersButtons } from './UpdateAnswersButtons';
import { questionKindType } from '../../types';
import { computeAttemptIdNeighbours } from './lib/computeAttemptIdNeighbours';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { computeMarks, marksType } from './lib/computeMarks';
import { computeHasEditedMarks } from './lib/computeHasEditedMarks';

function QuestionsChecking(props: {
    refetch: () => void;
    exercises: Array<exerciseType>;
    examName: string;
    examId: string;
    studentEmail: string;
    attemptId: string;
}) {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const initialMarks = computeMarks(props.exercises);
    const [marks, setMarks] = useState<marksType>(initialMarks);
    const { displayAlert } = useAlert();

    const saveMarksMutation = useMutation({
        mutationFn: api.updateMarks,
        onSuccess: () => {
            props.refetch();
            displayAlert({ variant: 'success', text: 'Vos notes ont bien été sauvegardées' });
        },
        onError: (error) => {
            console.error(error);
            displayAlert({
                variant: 'error',
                text: "Une erreur est survenue. Vos notes n'ont pas pu être sauvegardées.",
            });
        },
    });

    const hasEditedMarks = computeHasEditedMarks(initialMarks, marks);
    const isSaveButtonDisabled = !hasEditedMarks;

    useEffect(() => {
        const marks = computeMarks(props.exercises);
        setMarks(marks);
    }, [props.exercises]);

    const { next, previous } = computeAttemptIdNeighbours(
        props.attemptId,
        searchParams.get('attemptIds'),
    );

    const editableQuestionKindsAnswers: questionKindType[] = ['phraseMelangee', 'questionTrou'];

    return (
        <TestPageLayout
            studentEmail={props.studentEmail}
            title={props.examName}
            buttons={[
                <LoadingButton
                    key="save-marks-button"
                    loading={saveMarksMutation.isPending}
                    variant="contained"
                    onClick={saveMarks}
                    disabled={isSaveButtonDisabled}
                >
                    Sauvegarder
                </LoadingButton>,
            ]}
        >
            <>
                <LeftArrowContainer>
                    <IconButton disabled={!previous} onClick={buildOnArrowClick(previous)}>
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                </LeftArrowContainer>
                {props.exercises.map((exercise) => (
                    <ExerciseContainer key={exercise.id}>
                        <ExerciseTitleContainer>
                            <Typography variant="h3">{exercise.name}</Typography>
                            <Typography variant="h4">{exercise.instruction}</Typography>
                        </ExerciseTitleContainer>
                        {exercise.questions.map((question, index: number) => {
                            const answerStatus = computeAnswerStatus(
                                question.mark,
                                question.points,
                            );
                            return (
                                <QuestionCheckingContainer key={question.id}>
                                    <QuestionIndicatorsContainer>
                                        <QuestionIndicatorContainer>
                                            {question.rightAnswers.length === 0 ? (
                                                <MarkTextField
                                                    onChange={buildOnMarkChange(question.id)}
                                                    value={marks[question.id] || ''}
                                                    variant="standard"
                                                />
                                            ) : (
                                                <Typography>{question.mark || 0}</Typography>
                                            )}
                                            <Typography> / {question.points}</Typography>
                                        </QuestionIndicatorContainer>

                                        {editableQuestionKindsAnswers.includes(question.kind) && (
                                            <UpdateAnswersButtons
                                                examId={props.examId}
                                                refetch={props.refetch}
                                                question={question}
                                            />
                                        )}
                                    </QuestionIndicatorsContainer>
                                    <QuestionChecking
                                        key={'question' + question.id}
                                        index={index + 1}
                                        question={question}
                                        answerStatus={answerStatus}
                                    />
                                </QuestionCheckingContainer>
                            );
                        })}
                    </ExerciseContainer>
                ))}
                <RightArrowContainer>
                    <IconButton disabled={!next} onClick={buildOnArrowClick(next)}>
                        <ArrowForwardIcon fontSize="large" />
                    </IconButton>
                </RightArrowContainer>
            </>
        </TestPageLayout>
    );

    function saveMarks() {
        const formattedMarks = Object.entries(marks).reduce(
            (acc, [questionId, mark]) => ({ ...acc, [questionId]: Number(mark) }),
            {} as Record<number, number>,
        );
        saveMarksMutation.mutate({ attemptId: props.attemptId, marks: formattedMarks });
    }

    function buildOnMarkChange(questionId: number) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            const mark = event.target.value;
            if (mark.match(FLOATING_NUMBER_REGEX)) {
                setMarks({ ...marks, [questionId]: mark });
            }
        };
    }

    function buildOnArrowClick(attemptIdToNavigateTo: string | undefined) {
        return () => {
            if (!attemptIdToNavigateTo) {
                return;
            }
            if (hasEditedMarks) {
                saveMarks();
            }
            navigateToNewAttempt(attemptIdToNavigateTo);
        };
    }

    function navigateToNewAttempt(newAttemptId: string) {
        navigate(
            `/teacher/exams/${props.examId}/results/${newAttemptId}?attemptIds=${searchParams.get(
                'attemptIds',
            )}`,
        );
    }
}
const ARROW_CONTAINER_SIZE = 100;

const LeftArrowContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: theme.spacing(4),
    top: `calc(100vh / 2 - ${ARROW_CONTAINER_SIZE / 2}px)`,
    width: ARROW_CONTAINER_SIZE,
    height: ARROW_CONTAINER_SIZE,
}));

const RightArrowContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    right: theme.spacing(4),
    top: `calc(100vh / 2 - ${ARROW_CONTAINER_SIZE / 2}px)`,
    width: ARROW_CONTAINER_SIZE,
    height: ARROW_CONTAINER_SIZE,
}));

const QuestionCheckingContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    display: 'flex',
}));

const QuestionIndicatorContainer = styled('div')({
    minWidth: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
});

const ExerciseContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.common.black}`,
}));

const ExerciseTitleContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const QuestionIndicatorsContainer = styled('div')({});

const MarkTextField = styled(TextField)({
    width: 30,
});

export { QuestionsChecking };
