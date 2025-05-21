import * as abiturientService from './abiturient.service.js';

export const getAll = async (req, res) => {
  const abiturients = await abiturientService.getAll();
  res.json(abiturients);
};

export const getById = async (req, res) => {
  const { abiturientId } = req.params;
  const abiturient = await abiturientService.getById(abiturientId);
  
  if (!abiturient) {
    res.status(404).json({ message: 'Abiturient not found' });
    return;
  }
  
  res.json(abiturient);
};

export const create = async (req, res) => {
  const abiturient = await abiturientService.create(req.body);
  res.status(201).json(abiturient);
};

export const update = async (req, res) => {
  const { abiturientId } = req.params;
  const abiturient = await abiturientService.update(abiturientId, req.body);
  
  if (!abiturient) {
    res.status(404).json({ message: 'Abiturient not found' });
    return;
  }
  
  res.json(abiturient);
};

export const remove = async (req, res) => {
  const { abiturientId } = req.params;
  const abiturient = await abiturientService.remove(abiturientId);
  
  if (!abiturient) {
    res.status(404).json({ message: 'Abiturient not found' });
    return;
  }
  
  res.status(204).send();
};

export const getExams = async (req, res) => {
  const { abiturientId } = req.params;
  const exams = await abiturientService.getExams(abiturientId);
  
  if (exams === null) {
    res.status(404).json({ message: 'Abiturient not found' });
    return;
  }
  
  res.json(exams);
}; 