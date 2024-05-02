import { TextField, Typography, styled } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { questionWithoutAnswerType } from '../../types';
import { SPLITTING_CHARACTER_FOR_TAT, converter } from '../../lib/converter';
import { textSplitter } from '../../../../lib/textSplitter';
import { BLANK_TEXT_FIELD_WIDTH } from '../../constants';

function TexteATrousAnswering(props: {
    question: questionWithoutAnswerType;
    index: number;
    currentAnswer: string;
    setCurrentAnswer: (newAnswer: string) => void;
}) {
    const [localAnswer, setLocalAnswer] = useState(props.currentAnswer);
    const { title } = props.question;
    const words = textSplitter.split(title);
    const textInputs = converter.convertAnswerToTextInputs({
        currentAnswer: localAnswer,
        title,
    });

    return (
        <>
            <Typography>
                <WordsContainer>
                    <IndexContainer>{props.index}.</IndexContainer>
                    {words.map((word, wordIndex) =>
                        word === '....' ? (
                            <AnswerTextField
                                key={`tat-question-${props.question.id}-word-${wordIndex}-input`}
                                placeholder="..."
                                value={
                                    textInputs[
                                        converter.convertWordIndexToAnswerIndex({
                                            wordIndex,
                                            title,
                                        })
                                    ]
                                }
                                onBlur={onBlur}
                                onChange={buildSetWordAnswer(wordIndex)}
                                variant="outlined"
                            />
                        ) : (
                            <WordContainer
                                key={`tat-question-${props.question.id}-word-${wordIndex}-text`}
                            >
                                {word}
                            </WordContainer>
                        ),
                    )}
                </WordsContainer>
            </Typography>
        </>
    );

    function buildSetWordAnswer(wordIndex: number) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            const textInput = event.target.value;
            if (textInput.includes(SPLITTING_CHARACTER_FOR_TAT)) {
                return;
            }
            const answer = converter.convertTextInputToAnswer({
                textInput,
                currentAnswer: localAnswer,
                wordIndex,
                title,
            });
            setLocalAnswer(answer);
        };
    }
    function onBlur() {
        if (localAnswer !== props.currentAnswer) {
            props.setCurrentAnswer(localAnswer);
        }
    }
}

const WordsContainer = styled('div')({ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' });
const WordContainer = styled(Typography)(({ theme }) => ({
    paddingRight: 4,
    paddingLeft: 4,
}));
const IndexContainer = styled('span')({ fontWeight: 'bold' });
const AnswerTextField = styled(TextField)({ width: BLANK_TEXT_FIELD_WIDTH });
export { TexteATrousAnswering };
