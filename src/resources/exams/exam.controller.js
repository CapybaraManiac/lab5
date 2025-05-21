import * as examService from './exam.service.js';

export const getAll = async (req, res) => {
  const exams = await examService.getAll();
  res.json(exams);
};

export const getById = async (req, res) => {
  const { examId } = req.params;
  const exam = await examService.getById(examId);
  
  if (!exam) {
    res.status(404).json({ message: 'Exam not found' });
    return;
  }
  
  res.json(exam);
};

export const create = async (req, res) => {
  const exam = await examService.create(req.body);
  
  if (!exam) {
    res.status(400).json({ message: 'Invalid abiturient or teacher ID' });
    return;
  }
  
  res.status(201).json(exam);
};

export const update = async (req, res) => {
  const { examId } = req.params;
  const exam = await examService.update(examId, req.body);
  
  if (!exam) {
    res.status(404).json({ message: 'Exam not found' });
    return;
  }
  
  res.json(exam);
};

export const remove = async (req, res) => {
  const { examId } = req.params;
  const exam = await examService.remove(examId);
  
  if (!exam) {
    res.status(404).json({ message: 'Exam not found' });
    return;
  }
  
  res.status(204).send();
};

export const getTeachers = async (req, res) => {
  const { examId } = req.params;
  const teachers = await examService.getTeachers(examId);
  
  if (teachers === null) {
    res.status(404).json({ message: 'Exam not found' });
    return;
  }
  
  res.json(teachers);
}; 