import { v4 as uuidv4 } from 'uuid';
import { Teacher } from './teacher.model.js';

const teachers = [];

export const getAll = async () => {
  return teachers.map(teacher => Teacher.toResponse(teacher));
};

export const getById = async (id) => {
  const teacher = teachers.find(teacher => teacher.id === id);
  return teacher ? Teacher.toResponse(teacher) : null;
};

export const create = async (teacherData) => {
  const newTeacher = new Teacher({
    id: uuidv4(),
    ...teacherData
  });
  teachers.push(newTeacher);
  return Teacher.toResponse(newTeacher);
};

export const update = async (id, teacherData) => {
  const index = teachers.findIndex(teacher => teacher.id === id);
  if (index === -1) return null;

  const updatedTeacher = {
    ...teachers[index],
    ...teacherData,
    id
  };
  teachers[index] = updatedTeacher;
  return Teacher.toResponse(updatedTeacher);
};

export const remove = async (id) => {
  const index = teachers.findIndex(teacher => teacher.id === id);
  if (index === -1) return null;

  const [removedTeacher] = teachers.splice(index, 1);
  return Teacher.toResponse(removedTeacher);
}; 