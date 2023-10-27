import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { styled } from '@mui/material';
import { Page } from '../../components/Page';
import { time } from '../../lib/time';
import { Loader } from '../../components/Loader';
import { api } from '../../lib/api';
import { QuestionsAnswering } from './QuestionsAnswering';
import { attemptWithoutAnswersType } from './types';

function ExamTaking() {
    const params = useParams();
    const attemptId = params.attemptId as string;
    const studentId = params.studentId as string;
    const navigate = useNavigate();
    const query = useQuery<attemptWithoutAnswersType>(['attempts-without-answers', attemptId], () =>
        api.fetchAttemptWithoutAnswers(attemptId),
    );

    if (!query.data) {
        return (
            <Page>
                <Loader />
            </Page>
        );
    }

    const examDonePath = `/student/students/${studentId}/exam-done`;

    let remainingSeconds =
        query.data.exam.duration * 60 - time.computeElapsedTime(query.data.startedAt, new Date());
    const isTimeElapsed = remainingSeconds + query.data.exam.extraTime * 60 < 0;
    const hasFinishedExam = !!query.data.endedAt;
    if (isTimeElapsed || hasFinishedExam) {
        return <Navigate to={examDonePath} />;
    }

    return (
        <Page>
            <ExamPageContainer>
                <QuestionsAnswering
                    title={query.data.exam.name}
                    exercises={query.data.exam.exercises}
                    attemptId={attemptId}
                    onExamDone={onExamDone}
                />
            </ExamPageContainer>
        </Page>
    );

    function onExamDone() {
        navigate(examDonePath);
    }
}

export { ExamTaking };

const CountdownContainer = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
});

const ExamPageContainer = styled('div')({
    marginTop: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
