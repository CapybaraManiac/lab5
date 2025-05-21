import * as abiturientRepository from './abiturient.memory.repository.js';
import * as examRepository from '../exams/exam.memory.repository.js';

export const getAll = async () => {
  return abiturientRepository.getAll();
};

export const getById = async (id) => {
  return abiturientRepository.getById(id);
};

export const create = async (abiturientData) => {
  return abiturientRepository.create(abiturientData);
};

export const update = async (id, abiturientData) => {
  return abiturientRepository.update(id, abiturientData);
};

export const remove = async (id) => {
  const abiturient = await abiturientRepository.getById(id);
  if (!abiturient) return null;

  await examRepository.updateAbiturientId(id, null);
  return abiturientRepository.remove(id);
};

export const getExams = async (abiturientId) => {
  const abiturient = await abiturientRepository.getById(abiturientId);
  if (!abiturient) return null;

  return examRepository.getByAbiturientId(abiturientId);
}; 