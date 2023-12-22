import { Button, FormControlLabel, Radio, RadioGroup, TextField, styled } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { acceptableAnswerWithPointsType } from '../../types';
import { QuestionInputContainer } from './QuestionInputContainer';

function QCMUpsertionModalContent(props: {
    title: string;
    setTitle: (title: string) => void;
    acceptableAnswers: acceptableAnswerWithPointsType[];
    setAcceptableAnswers: (acceptableAnswers: acceptableAnswerWithPointsType[]) => void;
    possibleAnswers: string[];
    setPossibleAnswers: (possibleAnswers: string[]) => void;
    points: string;
    setPoints: (points: string) => void;
}) {
    const rightAnswer: string | undefined = props.acceptableAnswers[0]?.answer;
    const canRemovePossibleAnswer = computeCanRemovePossibleAnswer();
    const isAddPossibleAnswerDisabled = computeIsAddPossibleAnswerDisabled();
    return (
        <ModalContent>
            {/* <InputContainer> */}
            <QuestionInputContainer title="Question à laquelle doit répondre l'élève">
                <TextField
                    fullWidth
                    value={props.title}
                    label="Intitulé"
                    onChange={(event) => props.setTitle(event.target.value)}
                />
            </QuestionInputContainer>
            {/* </InputContainer> */}
            {/* <HintContainer>
                <Typography variant="h6">
                    Indiquez les réponses possibles, et sélectionnez la bonne réponse :
                </Typography>
            </HintContainer> */}
            <QuestionInputContainer
                title="Réponses possibles"
                subtitle="Indiquez les réponses possibles, et sélectionnez la bonne réponse"
            >
                <RadioGroup
                    value={rightAnswer}
                    onChange={(event) =>
                        props.setAcceptableAnswers([
                            { answer: event.target.value, points: Number(props.points) },
                        ])
                    }
                >
                    {props.possibleAnswers.map(
                        (possibleAnswer: string, possibleAnswerIndex: number) => {
                            return (
                                <InputContainer key={'possibleAnswer-' + possibleAnswerIndex}>
                                    <FormControlLabel
                                        value={`${possibleAnswerIndex}`}
                                        control={<Radio />}
                                        label={
                                            <TextField
                                                label={`Réponse n°${possibleAnswerIndex + 1}`}
                                                fullWidth
                                                value={possibleAnswer}
                                                onChange={buildOnChangePossibleAnswer(
                                                    possibleAnswerIndex,
                                                )}
                                            />
                                        }
                                    />
                                    <Button
                                        onClick={buildRemovePossibleAnswer(possibleAnswerIndex)}
                                        variant="outlined"
                                        color="error"
                                        startIcon={<RemoveCircleOutlineIcon />}
                                        disabled={!canRemovePossibleAnswer}
                                    >
                                        Retirer
                                    </Button>
                                </InputContainer>
                            );
                        },
                    )}
                </RadioGroup>
                <ButtonAddPossibleAnswerContainer>
                    <Button
                        onClick={addPossibleAnswer}
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon />}
                        disabled={isAddPossibleAnswerDisabled}
                    >
                        Ajouter
                    </Button>
                </ButtonAddPossibleAnswerContainer>
            </QuestionInputContainer>
            <QuestionInputContainer isLastItem title="Nombre de points attribués à la question">
                <TextField
                    value={props.points}
                    onChange={(event) => props.setPoints(event.target.value)}
                    label="Point(s)"
                />
            </QuestionInputContainer>
        </ModalContent>
    );

    function computeCanRemovePossibleAnswer() {
        return props.possibleAnswers.length > 2;
    }
    function computeIsAddPossibleAnswerDisabled() {
        return props.possibleAnswers.length >= 10;
    }

    function buildRemovePossibleAnswer(index: number) {
        return () => {
            const newPossibleAnswers = [...props.possibleAnswers];
            newPossibleAnswers.splice(index, 1);
            props.setPossibleAnswers(newPossibleAnswers);
            if (rightAnswer !== undefined) {
                if (index === Number(rightAnswer)) {
                    props.setAcceptableAnswers([]);
                } else if (index < Number(rightAnswer)) {
                    props.setAcceptableAnswers([
                        { answer: `${Number(rightAnswer) - 1}`, points: Number(props.points) },
                    ]);
                }
            }
        };
    }

    function addPossibleAnswer() {
        props.setPossibleAnswers([...props.possibleAnswers, '']);
    }

    function buildOnChangePossibleAnswer(possibleAnswerIndex: number) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const possibleAnswers = [...props.possibleAnswers];
            possibleAnswers[possibleAnswerIndex] = event.target.value;
            props.setPossibleAnswers(possibleAnswers);
        };
    }
}

const ButtonAddPossibleAnswerContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
}));

const ModalContent = styled('div')({ width: '100%' });
const InputContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
}));

export { QCMUpsertionModalContent };
