import { Exam } from './Exam.entity';
import { dataSource } from '../../dataSource';
import { examAdaptator } from './exam.adaptator';
import { User } from '../user';

export { buildExamService };

function buildExamService() {
    const examRepository = dataSource.getRepository(Exam);
    const examService = {
        createExam,
        getExams,
        getExam,
        getExamResults,
    };

    return examService;

    async function createExam(name: string, duration: number, user?: User) {
        const exam = new Exam();
        exam.name = name;
        exam.duration = duration;
        exam.user = user;
        return examRepository.save(exam);
    }

    async function getExams() {
        return examRepository.find();
    }

    async function getExam(examId: string) {
        return examRepository.findOneOrFail({
            where: { id: examId },
            order: {
                questionsChoixMultiple: { order: 'ASC' },
                questionsTrou: { order: 'ASC' },
                phrasesMelangees: { order: 'ASC' },
            },
            relations: ['questionsChoixMultiple', 'questionsTrou', 'phrasesMelangees'],
        });
    }

    async function getExamResults(examId: string) {
        const examWithAttempts = await examRepository.findOneOrFail({
            where: { id: examId },
            select: {
                attempts: {
                    startedAt: true,
                    updatedAt: true,
                    id: true,
                    student: { id: true, email: true, comment: true },
                    qcmAnswers: { id: true, choice: true, questionChoixMultiple: { id: true } },
                    hasBeenTreated: true,
                    phraseMelangeAnswers: { id: true, answer: true, phraseMelangee: { id: true } },
                    questionTrouAnswers: { id: true, answer: true, questionTrou: { id: true } },
                },
                phrasesMelangees: { id: true, points: true, correctPhrases: true },
                questionsTrou: {
                    id: true,
                    points: true,
                    acceptableAnswers: true,
                    rightAnswers: true,
                },
                questionsChoixMultiple: {
                    id: true,
                    points: true,
                    rightAnswerIndex: true,
                },
            },
            relations: [
                'attempts',
                'attempts.student',
                'questionsChoixMultiple',
                'questionsTrou',
                'phrasesMelangees',
                'attempts.qcmAnswers',
                'attempts.qcmAnswers.questionChoixMultiple',
                'attempts.questionTrouAnswers',
                'attempts.questionTrouAnswers.questionTrou',
                'attempts.phraseMelangeAnswers',
                'attempts.phraseMelangeAnswers.phraseMelangee',
            ],
        });

        const examWithResults = examAdaptator.convertExamWithAttemptsToResults(examWithAttempts);

        return examWithResults;
    }
}
