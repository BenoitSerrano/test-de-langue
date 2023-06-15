import { dataSource } from '../../dataSource';
import { Exam } from '../exam';
import { Student } from '../student';
import { Attempt } from './Attempt.entity';

export { buildAttemptService };

function buildAttemptService() {
    const studentService = {
        createAttempt,
        fetchAttempt,
    };

    return studentService;

    async function createAttempt(examId: string, studentId: string) {
        const attemptRepository = dataSource.getRepository(Attempt);
        const studentRepository = dataSource.getRepository(Student);
        const examRepository = dataSource.getRepository(Exam);

        const student = await studentRepository.findOneByOrFail({ id: studentId });
        const exam = await examRepository.findOneByOrFail({ id: examId });

        const attempt = new Attempt();
        attempt.exam = exam;
        attempt.student = student;
        return attemptRepository.save(attempt);
    }

    async function fetchAttempt(attemptId: string) {
        const attemptRepository = dataSource.getRepository(Attempt);

        return attemptRepository.findOneOrFail({
            where: { id: attemptId },
            order: {
                exam: {
                    questionsChoixMultiple: { order: 'ASC' },
                },
            },
            relations: [
                'exam',
                'qcmAnswers',
                'exam.questionsChoixMultiple',
                'qcmAnswers.questionChoixMultiple',
            ],
        });
    }
}
