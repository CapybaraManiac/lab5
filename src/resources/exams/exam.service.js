import * as examRepository from './exam.memory.repository.js';
import * as abiturientRepository from '../abiturients/abiturient.memory.repository.js';
import * as teacherRepository from '../teachers/teacher.memory.repository.js';

export const getAll = async () => {
  return examRepository.getAll();
};

export const getById = async (id) => {
  return examRepository.getById(id);
};

export const create = async (examData) => {
  const { abiturientId, teacherId } = examData;
  
  if (abiturientId) {
    const abiturient = await abiturientRepository.getById(abiturientId);
    if (!abiturient) return null;
  }

  if (teacherId) {
    const teacher = await teacherRepository.getById(teacherId);
    if (!teacher) return null;
  }

  return examRepository.create(examData);
};

export const update = async (id, examData) => {
  const { abiturientId, teacherId } = examData;
  
  if (abiturientId) {
    const abiturient = await abiturientRepository.getById(abiturientId);
    if (!abiturient) return null;
  }

  if (teacherId) {
    const teacher = await teacherRepository.getById(teacherId);
    if (!teacher) return null;
  }

  return examRepository.update(id, examData);
};

export const remove = async (id) => {
  return examRepository.remove(id);
};

export const getTeachers = async (examId) => {
  const exam = await examRepository.getById(examId);
  if (!exam || !exam.teacherId) return [];

  const teacher = await teacherRepository.getById(exam.teacherId);
  return teacher ? [teacher] : [];
}; 