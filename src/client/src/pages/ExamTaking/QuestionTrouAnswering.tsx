import { TextField, Typography, styled } from '@mui/material';
import { questionType } from './types';

const questionTrouTitleRegex = /(.*)\.{4}(.*)/;

function QuestionTrouAnswering(props: {
    question: questionType;
    index: number;
    currentAnswer: string;
    setCurrentAnswer: (newAnswer: string) => void;
}) {
    const regexMatch = props.question.title.match(questionTrouTitleRegex);
    if (!regexMatch) {
        console.warn(`questionTrou.title "${props.question.title}" does not match regex`);
        return <div />;
    }
    const [_, beforeText, afterText] = regexMatch;
    return (
        <StyledContainer>
            <Typography>
                <IndexContainer>{props.index}</IndexContainer>. {beforeText}
            </Typography>
            <StyledTextField
                value={props.currentAnswer}
                onChange={onChangeAnswer}
                placeholder="..."
            />
            <Typography>{afterText}</Typography>
        </StyledContainer>
    );

    function onChangeAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        props.setCurrentAnswer(event.target.value);
    }
}

const StyledContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '10px',
    marginBottom: '10px',
});

const StyledTextField = styled(TextField)({
    marginLeft: '5px',
    marginRight: '5px',
});

const IndexContainer = styled('span')({ fontWeight: 'bold' });
export { QuestionTrouAnswering };
