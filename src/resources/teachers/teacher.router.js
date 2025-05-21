import { Router } from 'express';
import * as teacherController from './teacher.controller.js';

const router = Router();

router.get('/', teacherController.getAll);
router.get('/:teacherId', teacherController.getById);
router.get('/:teacherId/exams', teacherController.getExams);
router.post('/', teacherController.create);
router.put('/:teacherId', teacherController.update);
router.delete('/:teacherId', teacherController.remove);

export { router as teacherRouter }; 