import Express from 'express';
import Joi from 'joi';
import { buildController } from './lib/buildController';
import { buildExamController } from './modules/exam';
import { buildQuestionChoixMultipleController } from './modules/questionChoixMultiple';
import { buildStudentController } from './modules/student';
import { buildAttemptController } from './modules/attempt';

const router = Express.Router();
const examController = buildExamController();
const studentController = buildStudentController();
const questionChoixMultipleController = buildQuestionChoixMultipleController();
const attemptController = buildAttemptController();

router.get('/students', buildController(studentController.getStudents));
router.post(
    '/students',
    buildController(studentController.createStudent, {
        schema: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
        }),
    }),
);
router.get('/exams', buildController(examController.getExams));

router.get('/exams/:examId', buildController(examController.getExam));

router.post(
    '/exams',
    buildController(examController.createExam, {
        schema: Joi.object({
            name: Joi.string().required(),
        }),
    }),
);

router.post(
    '/exams/:examId/questions-choix-multiple',
    buildController(questionChoixMultipleController.createQuestionChoixMultiple),
);

router.put(
    '/exams/:examId/questions-choix-multiple/:qcmId',
    buildController(questionChoixMultipleController.updateQuestionChoixMultiple, {
        schema: Joi.object({
            title: Joi.string(),
            rightAnswerIndex: Joi.number().required(),
            possibleAnswers: Joi.array().items(Joi.string().allow('')),
        }),
    }),
);

router.post(
    '/exams/:examId/students/:studentId/attempts',
    buildController(attemptController.createAttempt),
);

export { router };
