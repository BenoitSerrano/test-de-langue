import { buildAttemptService } from './attempt.service';
import { attemptAnswersType } from './types';

export { buildAttemptController };

function buildAttemptController() {
    const attemptService = buildAttemptService();
    const attemptController = {
        getAllAttempts,
        createAttempt,
        updateAttempt,
        searchAttempt,
        getAttemptWithAnswers,
        getAttemptWithoutAnswers,
        deleteAttempt,
        updateAttemptCheatingSummary,
        updateManualMark,
        updateAttemptEndedAt,
        deleteAttemptEndedAt,
        updateAttemptCorrectedAt,
        deleteAttemptCorrectedAt,
        getAttemptsCountByCorrectionStatus,
    };

    return attemptController;

    async function getAllAttempts() {
        return attemptService.getAllAttempts();
    }

    async function searchAttempt(params: { urlParams: { examId: string; studentId: string } }) {
        return attemptService.searchAttempt(params.urlParams.examId, params.urlParams.studentId);
    }

    async function updateAttempt(params: {
        urlParams: { attemptId: string };
        body: attemptAnswersType;
    }) {
        return attemptService.updateAttempt(params.urlParams.attemptId, params.body);
    }

    async function createAttempt(params: { urlParams: { examId: string; studentId: string } }) {
        return attemptService.createAttempt(params.urlParams.examId, params.urlParams.studentId);
    }

    async function getAttemptWithAnswers(params: { urlParams: { attemptId: string } }) {
        return attemptService.getAttemptWithAnswers(params.urlParams.attemptId);
    }

    async function getAttemptWithoutAnswers(params: { urlParams: { attemptId: string } }) {
        return attemptService.getAttemptWithoutAnswers(params.urlParams.attemptId);
    }

    async function deleteAttempt(params: { urlParams: { attemptId: string } }) {
        return attemptService.deleteAttempt(params.urlParams.attemptId);
    }

    async function updateManualMark(params: {
        urlParams: { attemptId: string; questionId: string };
        body: { manualMark: number };
    }) {
        return attemptService.updateManualMark(
            params.urlParams.attemptId,
            Number(params.urlParams.questionId),
            params.body.manualMark,
        );
    }

    async function updateAttemptCheatingSummary(params: {
        urlParams: { attemptId: string };
        body: { roundTrips: number; timeSpentOutside: number };
    }) {
        return attemptService.updateAttemptCheatingSummary(params.urlParams.attemptId, params.body);
    }

    async function updateAttemptEndedAt(params: { urlParams: { attemptId: string } }) {
        return attemptService.updateAttemptEndedAt(params.urlParams.attemptId);
    }

    async function deleteAttemptEndedAt(params: { urlParams: { attemptId: string } }) {
        return attemptService.deleteAttemptEndedAt(params.urlParams.attemptId);
    }

    async function updateAttemptCorrectedAt(params: { urlParams: { attemptId: string } }) {
        return attemptService.updateAttemptCorrectedAt(params.urlParams.attemptId);
    }

    async function deleteAttemptCorrectedAt(params: { urlParams: { attemptId: string } }) {
        return attemptService.deleteAttemptCorrectedAt(params.urlParams.attemptId);
    }

    async function getAttemptsCountByCorrectionStatus(params: { urlParams: { examId: string } }) {
        return attemptService.getAttemptsCountByCorrectionStatus(params.urlParams.examId);
    }
}
