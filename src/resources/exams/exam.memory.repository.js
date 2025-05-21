import { v4 as uuidv4 } from 'uuid';
import { Exam } from './exam.model.js';

const exams = [];

export const getAll = async () => {
  return exams.map(exam => Exam.toResponse(exam));
};

export const getById = async (id) => {
  const exam = exams.find(exam => exam.id === id);
  return exam ? Exam.toResponse(exam) : null;
};

export const create = async (examData) => {
  const newExam = new Exam({
    id: uuidv4(),
    ...examData
  });
  exams.push(newExam);
  return Exam.toResponse(newExam);
};

export const update = async (id, examData) => {
  const index = exams.findIndex(exam => exam.id === id);
  if (index === -1) return null;

  const updatedExam = {
    ...exams[index],
    ...examData,
    id
  };
  exams[index] = updatedExam;
  return Exam.toResponse(updatedExam);
};

export const remove = async (id) => {
  const index = exams.findIndex(exam => exam.id === id);
  if (index === -1) return null;

  const [removedExam] = exams.splice(index, 1);
  return Exam.toResponse(removedExam);
};

export const getByAbiturientId = async (abiturientId) => {
  return exams
    .filter(exam => exam.abiturientId === abiturientId)
    .map(exam => Exam.toResponse(exam));
};

export const getByTeacherId = async (teacherId) => {
  return exams
    .filter(exam => exam.teacherId === teacherId)
    .map(exam => Exam.toResponse(exam));
};

export const updateAbiturientId = async (abiturientId, newAbiturientId) => {
  exams.forEach(exam => {
    if (exam.abiturientId === abiturientId) {
      exam.abiturientId = newAbiturientId;
      if (!exam.teacherId) {
        const index = exams.indexOf(exam);
        exams.splice(index, 1);
      }
    }
  });
};

export const updateTeacherId = async (teacherId, newTeacherId) => {
  exams.forEach(exam => {
    if (exam.teacherId === teacherId) {
      exam.teacherId = newTeacherId;
      if (!exam.abiturientId) {
        const index = exams.indexOf(exam);
        exams.splice(index, 1);
      }
    }
  });
}; 