export class Teacher {
  constructor({ id, lastName, firstName, degree }) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.degree = degree;
  }

  static toResponse(teacher) {
    const { id, lastName, firstName, degree } = teacher;
    return { id, lastName, firstName, degree };
  }
} 