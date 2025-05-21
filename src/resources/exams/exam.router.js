import { Router } from 'express';
import * as examController from './exam.controller.js';

const router = Router();

router.get('/', examController.getAll);
router.get('/:examId', examController.getById);
router.get('/:examId/teachers', examController.getTeachers);
router.post('/', examController.create);
router.put('/:examId', examController.update);
router.delete('/:examId', examController.remove);

export { router as examRouter }; 