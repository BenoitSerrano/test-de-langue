import { User } from '../user';
import { buildExamService } from './exam.service';

export { buildExamController };

function buildExamController() {
    const examService = buildExamService();
    const examController = {
        createExam,
        getExams,
        getExam,
        getExamResults,
    };

    return examController;

    async function createExam(
        params: {
            body: { name: string; duration: number; extraTime: number };
        },
        user?: User,
    ) {
        return examService.createExam(params.body.name, params.body.duration, user);
    }

    async function getExams() {
        return examService.getExams();
    }

    async function getExam(params: { urlParams: { examId: string } }) {
        return examService.getExam(params.urlParams.examId);
    }

    async function getExamResults(params: { urlParams: { examId: string } }) {
        return examService.getExamResults(params.urlParams.examId);
    }
}
