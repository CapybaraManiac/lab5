export class Exam {
  constructor({ id, abiturientId, teacherId, subject, date, score }) {
    this.id = id;
    this.abiturientId = abiturientId;
    this.teacherId = teacherId;
    this.subject = subject;
    this.date = date;
    this.score = score;
  }

  static toResponse(exam) {
    const { id, abiturientId, teacherId, subject, date, score } = exam;
    return { id, abiturientId, teacherId, subject, date, score };
  }
} 