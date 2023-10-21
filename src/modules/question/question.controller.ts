import { Question } from './Question.entity';
import { buildQuestionService } from './question.service';

export { buildQuestionController };

function buildQuestionController() {
    const questionService = buildQuestionService();
    const questionController = {
        createQuestion,
        updateQuestion,
        deleteQuestion,
        swapQuestions,
    };

    return questionController;

    async function createQuestion(params: {
        urlParams: { examId: string };
        body: Pick<
            Question,
            'title' | 'kind' | 'points' | 'possibleAnswers' | 'rightAnswers' | 'acceptableAnswers'
        >;
    }) {
        return questionService.createQuestion(params.urlParams.examId, params.body);
    }

    async function updateQuestion(params: {
        urlParams: { examId: string; questionId: string };
        body: Pick<
            Question,
            'title' | 'points' | 'possibleAnswers' | 'rightAnswers' | 'acceptableAnswers'
        >;
    }) {
        return questionService.updateQuestion(
            {
                examId: params.urlParams.examId,
                questionId: Number(params.urlParams.questionId),
            },
            {
                title: params.body.title,
                possibleAnswers: params.body.possibleAnswers,
                acceptableAnswers: params.body.acceptableAnswers,
                rightAnswers: params.body.rightAnswers,
                points: params.body.points,
            },
        );
    }

    async function deleteQuestion(params: { urlParams: { questionId: string } }) {
        return questionService.deleteQuestion(Number(params.urlParams.questionId));
    }

    async function swapQuestions(params: {
        body: { questionId1: Question['id']; questionId2: Question['id'] };
    }) {
        return questionService.swapQuestions(params.body.questionId1, params.body.questionId2);
    }
}
