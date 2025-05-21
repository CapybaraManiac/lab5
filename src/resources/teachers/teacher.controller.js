import * as teacherService from './teacher.service.js';

export const getAll = async (req, res) => {
  const teachers = await teacherService.getAll();
  res.json(teachers);
};

export const getById = async (req, res) => {
  const { teacherId } = req.params;
  const teacher = await teacherService.getById(teacherId);
  
  if (!teacher) {
    res.status(404).json({ message: 'Teacher not found' });
    return;
  }
  
  res.json(teacher);
};

export const create = async (req, res) => {
  const teacher = await teacherService.create(req.body);
  res.status(201).json(teacher);
};

export const update = async (req, res) => {
  const { teacherId } = req.params;
  const teacher = await teacherService.update(teacherId, req.body);
  
  if (!teacher) {
    res.status(404).json({ message: 'Teacher not found' });
    return;
  }
  
  res.json(teacher);
};

export const remove = async (req, res) => {
  const { teacherId } = req.params;
  const teacher = await teacherService.remove(teacherId);
  
  if (!teacher) {
    res.status(404).json({ message: 'Teacher not found' });
    return;
  }
  
  res.status(204).send();
};

export const getExams = async (req, res) => {
  const { teacherId } = req.params;
  const exams = await teacherService.getExams(teacherId);
  
  if (exams === null) {
    res.status(404).json({ message: 'Teacher not found' });
    return;
  }
  
  res.json(exams);
}; 