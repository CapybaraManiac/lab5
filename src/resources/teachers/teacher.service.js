import * as teacherRepository from './teacher.memory.repository.js';
import * as examRepository from '../exams/exam.memory.repository.js';

export const getAll = async () => {
  return teacherRepository.getAll();
};

export const getById = async (id) => {
  return teacherRepository.getById(id);
};

export const create = async (teacherData) => {
  return teacherRepository.create(teacherData);
};

export const update = async (id, teacherData) => {
  return teacherRepository.update(id, teacherData);
};

export const remove = async (id) => {
  const teacher = await teacherRepository.getById(id);
  if (!teacher) return null;

  await examRepository.updateTeacherId(id, null);
  return teacherRepository.remove(id);
};

export const getExams = async (teacherId) => {
  const teacher = await teacherRepository.getById(teacherId);
  if (!teacher) return null;

  return examRepository.getByTeacherId(teacherId);
}; 