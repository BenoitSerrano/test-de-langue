import Express from 'express';
import { buildExamService } from './modules/exam';
import { buildController } from './lib/buildController';
import Joi from 'joi';

const router = Express.Router();
const examService = buildExamService();

router.get('/exams', buildController(examService.getExams));

router.post(
    '/exam',
    buildController(examService.createExam, {
        schema: Joi.object({
            name: Joi.string().required(),
        }),
    }),
);

export { router };
