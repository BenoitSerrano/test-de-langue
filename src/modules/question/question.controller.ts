import { Question } from './Question.entity';
import { buildQuestionService } from './question.service';

export { buildQuestionController };

function buildQuestionController() {
    const questionService = buildQuestionService();
    const questionController = {
        createQuestion,
        updateQuestion,
    };

    return questionController;

    async function createQuestion(params: {
        urlParams: { examId: string };
        body: {
            title: string;
            kind: Question['kind'];
            possibleAnswers: string[] | undefined;
            rightAnswers: string[];
            acceptableAnswers: string[];
            points: number;
        };
    }) {
        return questionService.createQuestion(params.urlParams.examId, params.body);
    }

    async function updateQuestion(params: {
        urlParams: { examId: string; questionId: string };
        body: {
            title: string;
            possibleAnswers: string[] | undefined;
            rightAnswers: string[];
            acceptableAnswers: string[];
            points: number;
        };
    }) {
        return questionService.updateQuestion({
            examId: params.urlParams.examId,
            questionId: Number(params.urlParams.questionId),
            title: params.body.title,
            possibleAnswers: params.body.possibleAnswers,
            acceptableAnswers: params.body.acceptableAnswers,
            rightAnswers: params.body.rightAnswers,
            points: params.body.points,
        });
    }
}
