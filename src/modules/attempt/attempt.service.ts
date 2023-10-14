import { dataSource } from '../../dataSource';
import { mapEntities } from '../../lib/mapEntities';
import { Exam, buildExamService } from '../exam';
import { Student } from '../student';
import { Attempt } from './Attempt.entity';
import { attemptAdaptator } from './attempt.adaptator';
import { attemptUtils } from './attempt.utils';
import { attemptAnswersType } from './types';

export { buildAttemptService };

function buildAttemptService() {
    const attemptRepository = dataSource.getRepository(Attempt);

    const studentService = {
        searchAttempts,
        createAttempt,
        createEmptyAttempt,
        updateAttempt,
        fetchAttemptWithAnswers,
        fetchAttemptWithoutAnswers,
        deleteAttempt,
        assertIsTimeLimitNotExceeded,
        updateAttemptDuration,
        updateAttemptTreatmentStatus,
        updateAttemptCheatingSummary,
        getAllAttempts,
        bulkInsertAttempts,
    };

    return studentService;

    async function searchAttempts(examId: string, studentId: string) {
        const attempt = await attemptRepository.find({
            where: { exam: { id: examId }, student: { id: studentId } },
        });
        return attempt;
    }

    async function createAttempt(examId: string, studentId: string) {
        const studentRepository = dataSource.getRepository(Student);
        const examRepository = dataSource.getRepository(Exam);

        const student = await studentRepository.findOneByOrFail({ id: studentId });
        const exam = await examRepository.findOneByOrFail({ id: examId });

        const attempt = await attemptRepository.save({ exam, student });

        return attempt;
    }

    async function createEmptyAttempt(examId: string, studentId: string) {
        const studentRepository = dataSource.getRepository(Student);
        const examRepository = dataSource.getRepository(Exam);

        const student = await studentRepository.findOneByOrFail({ id: studentId });
        const exam = await examRepository.findOneByOrFail({ id: examId });

        const attempt = await attemptRepository.save({
            exam,
            student,
            updatedAt: 'NOW()',
        });

        return attempt;
    }

    async function updateAttempt(attemptId: string, attemptAnswers: attemptAnswersType) {
        const attempt = await attemptRepository.findOneOrFail({
            where: { id: attemptId },
            relations: ['exam'],
        });
        await assertIsTimeLimitNotExceeded(attempt);
        await updateAttemptDuration(attempt.id);
        // TODO : vérifier que les questions pour lesquelles on envoie des réponses sont bien dans cet exam

        const answers = attemptUtils.stringifyAnswers(attemptAnswers);
        // HERE
        await attemptRepository.update({ id: attempt.id }, { answerss: answers });
        return true;
    }

    async function fetchAttemptWithAnswers(attemptId: string) {
        const examService = buildExamService();

        let attempt = await attemptRepository.findOneOrFail({
            where: { id: attemptId },
            select: {
                id: true,
                exam: { id: true },
                startedAt: true,
                //HERE
                answerss: true,
            },

            relations: ['exam'],
        });
        //HERE
        attempt = { ...attempt, answers: attempt.answerss };
        const exam = await examService.getExam(attempt.exam.id);
        const attemptAnswers = attemptUtils.parseAnswers(attempt.answers);

        const result = attemptAdaptator.convertAttemptToAttemptWithAnswers(
            attempt,
            exam,
            attemptAnswers,
        );

        return result;
    }

    async function fetchAttemptWithoutAnswers(attemptId: string) {
        const examService = buildExamService();

        let attempt = await attemptRepository.findOneOrFail({
            where: { id: attemptId },
            select: {
                id: true,
                exam: { id: true },
                startedAt: true,
                //HERE
                answerss: true,
            },

            relations: ['exam'],
        });
        //HERE
        attempt = { ...attempt, answers: attempt.answerss };
        const exam = await examService.getExam(attempt.exam.id);
        const attemptAnswers = attemptUtils.parseAnswers(attempt.answers);

        const result = attemptAdaptator.convertAttemptToAttemptWithoutAnswers(
            attempt,
            exam,
            attemptAnswers,
        );

        return result;
    }

    async function assertIsTimeLimitNotExceeded(attempt: Attempt) {
        if (attemptUtils.isTimeLimitExceeded(attempt, new Date())) {
            throw new Error(`The time limit is exceeded!`);
        }
    }

    async function updateAttemptDuration(attemptId: string) {
        const result = await attemptRepository.update(
            { id: attemptId },
            { updatedAt: () => 'CURRENT_TIMESTAMP' },
        );
        return result.affected == 1;
    }

    async function deleteAttempt(attemptId: string) {
        const result = await attemptRepository.delete({ id: attemptId });
        return result.affected == 1;
    }

    async function updateAttemptTreatmentStatus(attemptId: string, hasBeenTreated: boolean) {
        const result = await attemptRepository.update({ id: attemptId }, { hasBeenTreated });
        return result.affected == 1;
    }

    async function updateAttemptCheatingSummary(
        attemptId: string,
        body: { roundTrips: number; timeSpentOutside: number },
    ) {
        const result = await attemptRepository.update(
            { id: attemptId },
            { roundTrips: body.roundTrips, timeSpentOutside: body.timeSpentOutside },
        );
        return result.affected == 1;
    }

    async function getAllAttempts() {
        const attempts = await attemptRepository.find({
            relations: ['student', 'exam'],
            select: { student: { id: true }, exam: { id: true } },
        });

        return mapEntities(attempts);
    }

    async function bulkInsertAttempts(attempts: Array<Attempt>) {
        return attemptRepository.insert(attempts);
    }
}
