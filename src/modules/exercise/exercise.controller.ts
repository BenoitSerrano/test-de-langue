import { Question } from '../question';
import { questionKindType } from '../question/types';
import { Exercise } from './Exercise.entity';
import { buildExerciseService } from './exercise.service';

export { buildExerciseController };

function buildExerciseController() {
    const exerciseService = buildExerciseService();
    const exerciseController = {
        updateExercisesOrder,
        updateExercise,
        createExercise,
        duplicateExercise,
        deleteExercise,
    };

    return exerciseController;

    function createExercise(params: {
        urlParams: { examId: string };
        body: {
            name: string;
            instruction: string;
            defaultPoints: number | null;
            defaultQuestionKind: Question['kind'];
        };
    }) {
        return exerciseService.createExercise(params.urlParams.examId, params.body);
    }

    function duplicateExercise(params: { urlParams: { exerciseId: string; newExamId: string } }) {
        return exerciseService.duplicateExercise(
            params.urlParams.newExamId,
            Number(params.urlParams.exerciseId),
        );
    }

    function updateExercise(params: {
        urlParams: { examId: string; exerciseId: string };
        body: {
            name: string;
            instruction: string;
            defaultPoints: number | null;
            defaultQuestionKind: questionKindType;
        };
    }) {
        return exerciseService.updateExercise(
            {
                examId: params.urlParams.examId,
                exerciseId: Number(params.urlParams.exerciseId),
            },
            params.body,
        );
    }

    async function deleteExercise(params: { urlParams: { exerciseId: string } }) {
        return exerciseService.deleteExercise(Number(params.urlParams.exerciseId));
    }

    async function updateExercisesOrder(params: { body: { orderedIds: Exercise['id'][] } }) {
        return exerciseService.updateExercisesOrder(params.body.orderedIds);
    }
}
