import React, { useState } from 'react';
import { Button, Typography, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Page } from '../components/Page';
import { Modal } from '../components/Modal';

function StudentHome() {
    const params = useParams();
    const studentId = params.studentId as string;
    const examId = params.examId as string;
    const navigate = useNavigate();
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const query = useQuery(['exams', examId, 'students', studentId, 'attempts'], () =>
        api.searchAttempt({ examId, studentId }),
    );

    const examQuery = useQuery(['exams', examId], () => api.fetchExam(examId));

    const createAttemptMutation = useMutation({
        mutationFn: api.createAttempt,
        onSuccess: (attempt: any) => {
            navigate(`/student/students/${studentId}/attempts/${attempt.id}`);
        },
    });

    const createEmptyAttemptMutation = useMutation({
        mutationFn: api.createEmptyAttempt,
        onSuccess: () => {
            navigate(`/student/empty-attempt-created`);
        },
    });

    if (!query.data) {
        return <div />;
    }

    if (query.data.length > 0) {
        navigate(`/student/students/${studentId}/attempts/${query.data[0].id}`);
        return <div />;
    }

    return (
        <Page>
            <img width={100} src="/ENS_Logo.png" alt="Logo de l'ENS" />
            {examQuery.data && <Typography variant="h4">{examQuery.data.name}</Typography>}
            <ContentContainer>
                <p>
                    <Typography>
                        L'objectif de ce test est de trouver le cours le plus adapté à votre niveau.
                        Vous vous engagez à n'utiliser aucun document et à ne faire aucune recherche
                        en ligne. Attention : vous n'aurez pas plus de 15 minutes pour faire ce test
                        (il y a un chronomètre). Si vous ne savez pas, pas de stress : laissez juste
                        la question en blanc.
                    </Typography>
                </p>
                <p>
                    <Typography>
                        <em>
                            If you have studied French, even at a basic level or a long time ago,
                            you have to take the test. But if you have never studied French, click
                            on "I have never studied French" below!
                        </em>
                    </Typography>
                </p>
                <Button variant="contained" onClick={launchExam}>
                    Passer le test
                </Button>
                <Button onClick={openModaleConfirmation}>I have never studied French</Button>
            </ContentContainer>
            <Modal
                close={closeConfirmationModal}
                isOpen={isConfirmationModalOpen}
                onConfirm={launchAndEndExam}
                confirmButtonLabel="Yes, I confirm"
            >
                <Typography>Do you confirm that you've never studied French?</Typography>
            </Modal>
        </Page>
    );

    function closeConfirmationModal() {
        setIsConfirmationModalOpen(false);
    }

    function openModaleConfirmation() {
        setIsConfirmationModalOpen(true);
    }

    function launchExam() {
        createAttemptMutation.mutate({ examId, studentId });
    }

    function launchAndEndExam() {
        createEmptyAttemptMutation.mutate({ examId, studentId });
    }
}

export { StudentHome };

const ContentContainer = styled('div')({
    width: '50%',
});
