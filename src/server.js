import express from 'express';
import { abiturientRouter } from './resources/abiturients/abiturient.router.js';
import { examRouter } from './resources/exams/exam.router.js';
import { teacherRouter } from './resources/teachers/teacher.router.js';

const app = express();
const PORT = 4000;

app.use(express.json());

// Routes
app.use('/abiturients', abiturientRouter);
app.use('/exams', examRouter);
app.use('/teachers', teacherRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
