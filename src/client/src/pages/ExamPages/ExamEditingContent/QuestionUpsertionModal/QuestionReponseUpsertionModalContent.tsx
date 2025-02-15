import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { SPLITTING_CHARACTER_FOR_ANSWERS } from '../constants';
import { QuestionInputContainer } from './QuestionInputContainer';
import { acceptableAnswerType } from '../../../../types';
import { PointsTextField } from '../components/PointsTextField';

function QuestionReponseUpsertionModalContent(props: {
    title: string;
    setTitle: (title: string) => void;
    acceptableAnswers: acceptableAnswerType[][];
    setAcceptableAnswers: (acceptableAnswers: acceptableAnswerType[][]) => void;
    points: string;
    setPoints: (points: string) => void;
    canEditPoints: boolean;
}) {
    const rightAnswers = props.acceptableAnswers.length
        ? props.acceptableAnswers[0]
              .map(({ answer }) => answer)
              .join(SPLITTING_CHARACTER_FOR_ANSWERS)
        : '';

    return (
        <>
            <QuestionInputContainer title="Question à laquelle doit répondre l'élève">
                <TextField
                    autoFocus
                    fullWidth
                    label="Intitulé"
                    value={props.title}
                    onChange={onChangeTitle}
                />
            </QuestionInputContainer>
            <QuestionInputContainer
                title="Réponses correctes"
                subtitle="Indiquez les réponses correctes, séparées par des point-virgules (;)"
            >
                <TextField
                    fullWidth
                    label="Réponses correctes"
                    value={rightAnswers}
                    onChange={onChangeRightAnswers}
                />
            </QuestionInputContainer>
            <QuestionInputContainer isLastItem title="Nombre de points attribués à la question">
                <PointsTextField
                    canEdit={props.canEditPoints}
                    points={props.points}
                    setPoints={props.setPoints}
                />
            </QuestionInputContainer>
        </>
    );

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        props.setTitle(event.target.value);
    }

    function onChangeRightAnswers(event: ChangeEvent<HTMLInputElement>) {
        const newAcceptableAnswerWithPoints = event.target.value
            .split(SPLITTING_CHARACTER_FOR_ANSWERS)
            .map((answer) => ({ answer, grade: 'A' as const }));
        props.setAcceptableAnswers([newAcceptableAnswerWithPoints]);
    }
}

export { QuestionReponseUpsertionModalContent };
