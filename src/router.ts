import Express from 'express';
import { buildExamController } from './modules/exam';
import { buildController } from './lib/buildController';
import Joi from 'joi';

const router = Express.Router();
const examController = buildExamController();

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

// router.post('/exams/:examId/question-choix-multiple', buildController(examService.getExam));

export { router };
