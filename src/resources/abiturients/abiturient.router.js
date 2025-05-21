import { Router } from 'express';
import * as abiturientController from './abiturient.controller.js';

const router = Router();

router.get('/', abiturientController.getAll);
router.get('/:abiturientId', abiturientController.getById);
router.get('/:abiturientId/exams', abiturientController.getExams);
router.post('/', abiturientController.create);
router.put('/:abiturientId', abiturientController.update);
router.delete('/:abiturientId', abiturientController.remove);

export { router as abiturientRouter }; 