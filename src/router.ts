import Express from 'express';
import Joi from 'joi';
import { buildController } from './lib/buildController';
import { buildExamController } from './modules/exam';
import { buildQuestionChoixMultipleController } from './modules/questionChoixMultiple';
import { buildStudentController } from './modules/student';
import { buildAttemptController } from './modules/attempt';
import { buildQcmAnswerController } from './modules/qcmAnswer';
import { buildQuestionTrouController } from './modules/questionTrou/questionTrou.controller';

const router = Express.Router();
const examController = buildExamController();
const studentController = buildStudentController();
const questionTrouController = buildQuestionTrouController();
const questionChoixMultipleController = buildQuestionChoixMultipleController();
const attemptController = buildAttemptController();
const qcmAnswerController = buildQcmAnswerController();

router.get('/students', buildController(studentController.getStudentsWithAttempts));
router.get('/students/:email', buildController(studentController.getStudentId));
router.post(
    '/students',
    buildController(studentController.createStudent, {
        schema: Joi.object({
            email: Joi.string().required(),
        }),
    }),
);
router.post(
    '/student-list',
    buildController(studentController.createStudents, {
        schema: Joi.object({
            emails: Joi.array().items(Joi.string()),
        }),
    }),
);
router.get('/exams', buildController(examController.getExams));

router.get('/exams/:examId', buildController(examController.getExam));
router.get('/exams/:examId/results', buildController(examController.getExamResults));

router.post(
    '/exams',
    buildController(examController.createExam, {
        schema: Joi.object({
            name: Joi.string().required(),
            duration: Joi.number().required(),
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
    '/exams/:examId/questions-trou',
    buildController(questionTrouController.createQuestionTrou),
);

router.patch(
    '/exams/:examId/questions-trou/:questionTrouId',
    buildController(questionTrouController.updateQuestionTrou, {
        schema: Joi.object({
            beforeText: Joi.string().allow(''),
            afterText: Joi.string().allow(''),
            rightAnswer: Joi.string().allow(''),
            acceptableAnswers: Joi.array().items(Joi.string().allow('')),
        }),
    }),
);

router.post(
    '/exams/:examId/students/:studentId/attempts',
    buildController(attemptController.findOrCreateAttempt),
);

router.get('/attempts/:attemptId', buildController(attemptController.fetchAttempt));
router.patch('/attempts/:attemptId/end', buildController(attemptController.endAttempt));

router.post(
    '/attempts/:attemptId/questionsChoixMultiple/:qcmId',
    buildController(qcmAnswerController.createOrUpdateQcmAnswer, {
        schema: Joi.object({
            choice: Joi.number().required(),
        }),
    }),
);

export { router };
