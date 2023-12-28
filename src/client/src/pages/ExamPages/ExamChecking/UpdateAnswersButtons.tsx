import { IconButton, Tooltip, styled } from '@mui/material';
import { amendableQuestionWithAnswersType } from '../types';
import { useMutation } from '@tanstack/react-query';
import { useAlert } from '../../../lib/alert';
import { api } from '../../../lib/api';
import { computeCanAnswerBeAttributed } from './lib/computeCanAnswerBeAttributed';

import { Loader } from '../../../components/Loader';
import { computeIsUpdateAnswerButtonLoading } from './lib/computeIsUpdateAnswerButtonLoading';
import { gradeType } from '../../../types';
import { attributeGradeToAnswerActions } from './constants';

function UpdateAnswersButtons(props: {
    canCorrectAttempt: boolean;
    question: amendableQuestionWithAnswersType;
    refetch: () => void;
    examId: string;
    attemptId: string;
    isQuestionManuallyCorrected: boolean;
}) {
    const { displayAlert } = useAlert();

    const removeOkAnswerMutation = useMutation({
        mutationFn: api.removeOkAnswer,
        onSuccess: () => {
            props.refetch();
        },
        onError: (error) => {
            console.error(error);
            displayAlert({
                variant: 'error',
                text: "Une erreur est survenue. Votre modification n'a pas pu être prise en compte",
            });
        },
    });

    const addAcceptableAnswerMutation = useMutation({
        mutationFn: api.addQuestionAcceptableAnswer,
        onSuccess: () => {
            props.refetch();
        },
        onError: (error) => {
            console.error(error);
            displayAlert({
                variant: 'error',
                text: "Une erreur est survenue. Votre modification n'a pas pu être prise en compte",
            });
        },
    });

    const saveGradeMutation = useMutation({
        mutationFn: api.updateGrade,
        onSuccess: () => {
            props.refetch();
        },
        onError: (error) => {
            console.error(error);
            displayAlert({
                variant: 'error',
                text: "Une erreur est survenue. Votre dernière note n'a pas pu être sauvegardée.",
            });
        },
    });

    return (
        <UpdateAnswersButtonContainer>
            {attributeGradeToAnswerActions.map((attributeMarkToAnswerAction) => {
                const { color, IconComponent, grade, name } = attributeMarkToAnswerAction;
                const canAnswerBeAttributedMark = computeCanAnswerBeAttributed(
                    grade,
                    props.question,
                );

                const addAcceptableAnswerLoadingInfo =
                    addAcceptableAnswerMutation.isPending &&
                    addAcceptableAnswerMutation.variables.acceptableAnswer
                        ? addAcceptableAnswerMutation.variables.acceptableAnswer.grade
                        : undefined;

                const updateGradeLoadingInfo = saveGradeMutation.isPending
                    ? saveGradeMutation.variables.grade
                    : undefined;

                const isLoading = computeIsUpdateAnswerButtonLoading(
                    grade,
                    props.isQuestionManuallyCorrected,
                    {
                        removeOkAnswer: removeOkAnswerMutation.isPending,
                        addAcceptableAnswer: addAcceptableAnswerLoadingInfo,
                        updateGrade: updateGradeLoadingInfo,
                    },
                );

                return (
                    <Tooltip key={`button-mark-as-${name}`} title={`Marquer comme ${name}`}>
                        <IconButton
                            size="small"
                            color={color}
                            disabled={!canAnswerBeAttributedMark || isLoading}
                            onClick={buildOnAttributeMarkToAnswer(grade)}
                        >
                            {isLoading ? (
                                <Loader size="small" />
                            ) : (
                                <IconComponent fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>
                );
            })}
        </UpdateAnswersButtonContainer>
    );

    function buildOnAttributeMarkToAnswer(grade: gradeType) {
        return () => {
            if (props.question.answer === undefined) {
                return;
            }

            if (props.isQuestionManuallyCorrected) {
                saveGradeMutation.mutate({
                    examId: props.examId,
                    attemptId: props.attemptId,
                    questionId: props.question.id,
                    grade,
                });
            } else {
                if (grade === 'E') {
                    removeOkAnswerMutation.mutate({
                        examId: props.examId,
                        questionId: props.question.id,
                        okAnswer: props.question.answer,
                    });
                } else {
                    addAcceptableAnswerMutation.mutate({
                        examId: props.examId,
                        questionId: props.question.id,
                        acceptableAnswer: {
                            answer: props.question.answer,
                            grade,
                        },
                    });
                }
            }
        };
    }
}

const UpdateAnswersButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
}));

export { UpdateAnswersButtons };
