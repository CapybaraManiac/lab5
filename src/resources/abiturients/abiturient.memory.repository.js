import { v4 as uuidv4 } from 'uuid';
import { Abiturient } from './abiturient.model.js';

const abiturients = [];

export const getAll = async () => {
  return abiturients.map(abiturient => Abiturient.toResponse(abiturient));
};

export const getById = async (id) => {
  const abiturient = abiturients.find(abiturient => abiturient.id === id);
  return abiturient ? Abiturient.toResponse(abiturient) : null;
};

export const create = async (abiturientData) => {
  const newAbiturient = new Abiturient({
    id: uuidv4(),
    ...abiturientData
  });
  abiturients.push(newAbiturient);
  return Abiturient.toResponse(newAbiturient);
};

export const update = async (id, abiturientData) => {
  const index = abiturients.findIndex(abiturient => abiturient.id === id);
  if (index === -1) return null;

  const updatedAbiturient = {
    ...abiturients[index],
    ...abiturientData,
    id
  };
  abiturients[index] = updatedAbiturient;
  return Abiturient.toResponse(updatedAbiturient);
};

export const remove = async (id) => {
  const index = abiturients.findIndex(abiturient => abiturient.id === id);
  if (index === -1) return null;

  const [removedAbiturient] = abiturients.splice(index, 1);
  return Abiturient.toResponse(removedAbiturient);
}; 