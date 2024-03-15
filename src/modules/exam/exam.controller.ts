import { User } from '../user';
import { Exam } from './Exam.entity';
import { buildExamService } from './exam.service';
import { EXAM_FILTERS, examFilterType } from './types';

export { buildExamController };

function buildExamController() {
    const examService = buildExamService();
    const examController = {
        createExam,
        updateExamDuration,
        updateExamName,
        getExams,
        getExam,
        getExamWithoutAnswers,
        getAllExams,
        getExamResults,
        deleteExam,
        duplicateExam,
        getExamWithQuestions,
        updateExamArchivedAt,
    };

    return examController;

    async function createExam(
        params: {
            body: { name: string; duration: number | null; extraTime: number };
        },
        user: User,
    ) {
        return examService.createExam(params.body.name, params.body.duration, user);
    }

    async function updateExamName(params: {
        urlParams: { examId: Exam['id'] };
        body: { name: string };
    }) {
        return examService.updateExamName(params.urlParams.examId, params.body.name);
    }

    async function updateExamDuration(params: {
        urlParams: { examId: Exam['id'] };
        body: { duration: number | null };
    }) {
        return examService.updateExamDuration(params.urlParams.examId, params.body.duration);
    }

    async function getExams(params: { query: { filter: examFilterType } }, user: User) {
        if (!EXAM_FILTERS.includes(params.query.filter)) {
            throw new Error(
                `Query filter "${params.query.filter}" is neither "archived" nor "current"`,
            );
        }
        return examService.getExams({ filter: params.query.filter }, user);
    }

    async function getExam(params: { urlParams: { examId: string } }) {
        return examService.getExam(params.urlParams.examId);
    }

    async function getExamWithoutAnswers(params: { urlParams: { examId: string } }) {
        return examService.getExamWithoutAnswers(params.urlParams.examId);
    }

    async function getExamResults(params: { urlParams: { examId: string } }) {
        return examService.getExamResults(params.urlParams.examId);
    }

    async function getAllExams() {
        return examService.getAllExams();
    }

    async function getExamWithQuestions(params: { urlParams: { examId: string } }) {
        return examService.getExamWithQuestions(params.urlParams.examId);
    }

    async function deleteExam(params: { urlParams: { examId: string } }) {
        return examService.deleteExam(params.urlParams.examId);
    }

    async function duplicateExam(params: { urlParams: { examId: string } }, user: User) {
        return examService.duplicateExam({ examId: params.urlParams.examId, user });
    }

    async function updateExamArchivedAt(params: { urlParams: { examId: string } }) {
        return examService.updateExamArchivedAt(params.urlParams.examId);
    }
}
