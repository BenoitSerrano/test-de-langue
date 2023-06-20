import { Exam } from './Exam.entity';
import { dataSource } from '../../dataSource';
import { examAdaptator } from './exam.adaptator';

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

    async function createExam(name: string, duration: number) {
        const exam = new Exam();
        exam.name = name;
        exam.duration = duration;
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
            },
            relations: ['questionsChoixMultiple', 'questionsTrou'],
        });
    }

    async function getExamResults(examId: string) {
        const examWithAttempts = await examRepository.findOneOrFail({
            where: { id: examId },
            relations: [
                'attempts',
                'attempts.student',
                'questionsChoixMultiple',
                'attempts.qcmAnswers',
                'attempts.qcmAnswers.questionChoixMultiple',
            ],
        });
        const examWithResults = examAdaptator.convertExamWithAttemptsToResults(examWithAttempts);
        return examWithResults;
    }
}
