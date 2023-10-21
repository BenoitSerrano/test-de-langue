import { colorLib } from '../../lib/colors';
import { Typography, styled } from '@mui/material';

function QuestionChecking(props: {
    question: {
        id: number;
        title: string;
        kind: 'qcm' | 'questionTrou' | 'phraseMelangee';
        possibleAnswers: string[] | null;
        answer: string | undefined;
        status: 'right' | 'wrong' | 'acceptable';
    };
    index: number;
}) {
    const color = colorLib.computeTextColor(props.question.status);
    const StyledContainer = styled('div')({ color });
    let answer = '';
    if (props.question.answer !== undefined && props.question.answer !== '') {
        if (props.question.kind === 'qcm' && props.question.possibleAnswers !== null) {
            answer = props.question.possibleAnswers[Number(props.question.answer)];
        } else {
            answer = props.question.answer;
        }
    }

    return (
        <StyledContainer>
            <Title>
                {props.index}. {props.question.title}
            </Title>
            {props.question.possibleAnswers?.length && (
                <Typography>
                    Réponses proposées :
                    <ul>
                        {props.question.possibleAnswers.map((possibleAnswer) => (
                            <li key={possibleAnswer}>{possibleAnswer}</li>
                        ))}
                    </ul>
                </Typography>
            )}
            <Typography>Réponse : {answer}</Typography>
        </StyledContainer>
    );
}

const Title = styled(Typography)(({ theme }) => ({ fontWeight: 'bold' }));

export { QuestionChecking };
