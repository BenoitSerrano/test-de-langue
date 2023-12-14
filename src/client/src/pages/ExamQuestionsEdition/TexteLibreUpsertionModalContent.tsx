import { TextField, styled } from '@mui/material';

function TexteLibreUpsertionModalContent(props: {
    title: string;
    setTitle: (title: string) => void;
    points: string;
    setPoints: (points: string) => void;
}) {
    return (
        <>
            <RowContainer>
                <TextField
                    fullWidth
                    label="Intitulé de la question"
                    value={props.title}
                    onChange={(event) => props.setTitle(event.target.value)}
                    placeholder="Serions-nous plus libres sans l'État ?"
                />
            </RowContainer>
            <RowContainer>
                <TextField
                    value={props.points}
                    onChange={(event) => props.setPoints(event.target.value)}
                    label="Point(s) pour la question"
                />
            </RowContainer>
        </>
    );
}

const RowContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    flex: 1,
    width: '100%',
}));

export { TexteLibreUpsertionModalContent };
