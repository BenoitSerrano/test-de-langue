import { FormControlLabel, Switch, Typography, styled } from '@mui/material';
import { attemptActionEncoder } from '../lib/attemptActionEncoder';
import { pathHandler } from '../lib/pathHandler';
import { useAlert } from '../lib/alert';
import { config } from '../config';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

type shouldDisplayRightAnswersApiType = { shouldDisplayRightAnswers: boolean };

function ExamConsult() {
    const params = useParams();
    const examId = params.examId as string;
    const url = computeUrl(examId);
    const { displayAlert } = useAlert();
    const queryClient = useQueryClient();
    const query = useQuery<shouldDisplayRightAnswersApiType>({
        queryKey: ['exams', examId, 'shouldDisplayRightAnswers'],
        queryFn: () => api.fetchShouldDisplayRightAnswersForExamId({ examId }),
    });
    const updateShouldDisplayRightAnswersMutation = useMutation({
        mutationFn: api.updateShouldDisplayRightAnswersForExamId,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['exams', examId, 'shouldDisplayRightAnswers'],
            });
        },
        onError: (error) => {
            console.error(error);
            displayAlert({
                variant: 'error',
                text: "Une erreur est survenue. Les modifications n'ont pas pu être enregistrées.",
            });
        },
    });

    return (
        <div>
            <Typography variant="h3">
                Comment voulez-vous que les copies soient consultées ?
            </Typography>
            <Typography variant="h4">Adresse web de votre examen</Typography>
            <Typography variant="h6">
                Copiez ce lien et envoyez-le à vos étudiant.es pour qu'iels puisse consulter leur
                copie
            </Typography>
            <LinkContainer>
                <Link variant="body2">{url}</Link>
                <Button variant="contained" onClick={copyUrlToClipboard}>
                    Copier
                </Button>
            </LinkContainer>
            {!!query.data && (
                <>
                    <Typography variant="h4">Affichage des réponses correctes</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                disabled={query.isPending}
                                checked={query.data.shouldDisplayRightAnswers}
                                onChange={onToggleSwitch}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        label="Afficher les réponses correctes pour chaque question directement sur la copie"
                    />
                </>
            )}
        </div>
    );

    function onToggleSwitch(_: React.ChangeEvent, checked: boolean) {
        updateShouldDisplayRightAnswersMutation.mutate({
            examId,
            shouldDisplayRightAnswers: checked,
        });
    }

    async function copyUrlToClipboard() {
        try {
            await navigator.clipboard.writeText(url);
            displayAlert({
                text: 'Le lien a bien été copié dans le presse-papiers',
                variant: 'success',
            });
        } catch (error) {
            console.error(error);
            displayAlert({
                autoHideDuration: null,
                variant: 'error',
                text: `Le lien n'a pas pu être copié dans le presse-papiers.`,
            });
        }
    }

    function computeUrl(examId: string) {
        const encodedAction = attemptActionEncoder.encode('consult');
        const path = pathHandler.getRoutePath('STUDENT_AUTHENTICATION', {
            examId,
            encodedAction,
        });
        const url = `${config.HOST_URL}${path}`;
        return url;
    }
}

const LinkContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.primary.light,
    padding: theme.spacing(2),
    borderRadius: 5,
    flexWrap: 'nowrap',
}));

const Link = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

export { ExamConsult };
