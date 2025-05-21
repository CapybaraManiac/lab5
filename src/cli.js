import readline from 'readline';
import fetch from 'node-fetch';

const API_URL = 'http://localhost:4000';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function makeRequest(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Ошибка запроса');
    }
    
    return data;
  } catch (error) {
    console.error('Ошибка:', error.message);
    return null;
  }
}

async function displayMenu() {
  console.log('\n=== Система учета вступительных экзаменов ===');
  console.log('1. Работа с абитуриентами');
  console.log('2. Работа с преподавателями');
  console.log('3. Работа с экзаменами');
  console.log('0. Выход');
  
  const choice = await question('\nВыберите действие: ');
  
  switch (choice) {
    case '1':
      await abiturientMenu();
      break;
    case '2':
      await teacherMenu();
      break;
    case '3':
      await examMenu();
      break;
    case '0':
      console.log('До свидания!');
      rl.close();
      return;
    default:
      console.log('Неверный выбор. Попробуйте снова.');
      await displayMenu();
  }
}

async function abiturientMenu() {
  console.log('\n=== Работа с абитуриентами ===');
  console.log('1. Показать всех абитуриентов');
  console.log('2. Добавить абитуриента');
  console.log('3. Найти абитуриента по ID');
  console.log('4. Обновить данные абитуриента');
  console.log('5. Удалить абитуриента');
  console.log('6. Показать экзамены абитуриента');
  console.log('0. Вернуться в главное меню');

  const choice = await question('\nВыберите действие: ');

  switch (choice) {
    case '1':
      const abiturients = await makeRequest('/abiturients');
      console.log('\nСписок абитуриентов:');
      console.log(JSON.stringify(abiturients, null, 2));
      break;
    case '2':
      const lastName = await question('Фамилия: ');
      const firstName = await question('Имя: ');
      const numCertificate = await question('Номер сертификата: ');
      
      const newAbiturient = await makeRequest('/abiturients', 'POST', {
        lastName,
        firstName,
        numCertificate: parseInt(numCertificate, 10)
      });
      
      if (newAbiturient) {
        console.log('\nАбитуриент добавлен:');
        console.log(JSON.stringify(newAbiturient, null, 2));
      }
      break;
    case '3':
      const searchId = await question('Введите ID абитуриента: ');
      const abiturient = await makeRequest(`/abiturients/${searchId}`);
      if (abiturient) {
        console.log('\nНайден абитуриент:');
        console.log(JSON.stringify(abiturient, null, 2));
      }
      break;
    case '4':
      const updateId = await question('Введите ID абитуриента для обновления: ');
      const updateLastName = await question('Новая фамилия: ');
      const updateFirstName = await question('Новое имя: ');
      const updateNumCertificate = await question('Новый номер сертификата: ');
      
      const updatedAbiturient = await makeRequest(`/abiturients/${updateId}`, 'PUT', {
        lastName: updateLastName,
        firstName: updateFirstName,
        numCertificate: parseInt(updateNumCertificate, 10)
      });
      
      if (updatedAbiturient) {
        console.log('\nДанные абитуриента обновлены:');
        console.log(JSON.stringify(updatedAbiturient, null, 2));
      }
      break;
    case '5':
      const deleteId = await question('Введите ID абитуриента для удаления: ');
      const deletedAbiturient = await makeRequest(`/abiturients/${deleteId}`, 'DELETE');
      if (deletedAbiturient) {
        console.log('Абитуриент успешно удален');
      }
      break;
    case '6':
      const examsId = await question('Введите ID абитуриента: ');
      const exams = await makeRequest(`/abiturients/${examsId}/exams`);
      if (exams) {
        console.log('\nЭкзамены абитуриента:');
        console.log(JSON.stringify(exams, null, 2));
      }
      break;
    case '0':
      await displayMenu();
      return;
    default:
      console.log('Неверный выбор. Попробуйте снова.');
  }
  
  await abiturientMenu();
}

async function teacherMenu() {
  console.log('\n=== Работа с преподавателями ===');
  console.log('1. Показать всех преподавателей');
  console.log('2. Добавить преподавателя');
  console.log('3. Найти преподавателя по ID');
  console.log('4. Обновить данные преподавателя');
  console.log('5. Удалить преподавателя');
  console.log('6. Показать экзамены преподавателя');
  console.log('0. Вернуться в главное меню');

  const choice = await question('\nВыберите действие: ');

  switch (choice) {
    case '1':
      const teachers = await makeRequest('/teachers');
      console.log('\nСписок преподавателей:');
      console.log(JSON.stringify(teachers, null, 2));
      break;
    case '2':
      const lastName = await question('Фамилия: ');
      const firstName = await question('Имя: ');
      const degree = await question('Ученая степень: ');
      
      const newTeacher = await makeRequest('/teachers', 'POST', {
        lastName,
        firstName,
        degree
      });
      
      if (newTeacher) {
        console.log('\nПреподаватель добавлен:');
        console.log(JSON.stringify(newTeacher, null, 2));
      }
      break;
    case '3':
      const searchId = await question('Введите ID преподавателя: ');
      const teacher = await makeRequest(`/teachers/${searchId}`);
      if (teacher) {
        console.log('\nНайден преподаватель:');
        console.log(JSON.stringify(teacher, null, 2));
      }
      break;
    case '4':
      const updateId = await question('Введите ID преподавателя для обновления: ');
      const updateLastName = await question('Новая фамилия: ');
      const updateFirstName = await question('Новое имя: ');
      const updateDegree = await question('Новая ученая степень: ');
      
      const updatedTeacher = await makeRequest(`/teachers/${updateId}`, 'PUT', {
        lastName: updateLastName,
        firstName: updateFirstName,
        degree: updateDegree
      });
      
      if (updatedTeacher) {
        console.log('\nДанные преподавателя обновлены:');
        console.log(JSON.stringify(updatedTeacher, null, 2));
      }
      break;
    case '5':
      const deleteId = await question('Введите ID преподавателя для удаления: ');
      const deletedTeacher = await makeRequest(`/teachers/${deleteId}`, 'DELETE');
      if (deletedTeacher) {
        console.log('Преподаватель успешно удален');
      }
      break;
    case '6':
      const examsId = await question('Введите ID преподавателя: ');
      const exams = await makeRequest(`/teachers/${examsId}/exams`);
      if (exams) {
        console.log('\nЭкзамены преподавателя:');
        console.log(JSON.stringify(exams, null, 2));
      }
      break;
    case '0':
      await displayMenu();
      return;
    default:
      console.log('Неверный выбор. Попробуйте снова.');
  }
  
  await teacherMenu();
}

async function examMenu() {
  console.log('\n=== Работа с экзаменами ===');
  console.log('1. Показать все экзамены');
  console.log('2. Добавить экзамен');
  console.log('3. Найти экзамен по ID');
  console.log('4. Обновить данные экзамена');
  console.log('5. Удалить экзамен');
  console.log('6. Показать преподавателей экзамена');
  console.log('0. Вернуться в главное меню');

  const choice = await question('\nВыберите действие: ');

  switch (choice) {
    case '1':
      const exams = await makeRequest('/exams');
      console.log('\nСписок экзаменов:');
      console.log(JSON.stringify(exams, null, 2));
      break;
    case '2':
      const abiturientId = await question('ID абитуриента: ');
      const teacherId = await question('ID преподавателя: ');
      const subject = await question('Предмет: ');
      const date = await question('Дата (YYYY-MM-DD): ');
      const score = await question('Оценка: ');
      
      const newExam = await makeRequest('/exams', 'POST', {
        abiturientId,
        teacherId,
        subject,
        date,
        score: parseInt(score, 10)
      });
      
      if (newExam) {
        console.log('\nЭкзамен добавлен:');
        console.log(JSON.stringify(newExam, null, 2));
      }
      break;
    case '3':
      const searchId = await question('Введите ID экзамена: ');
      const exam = await makeRequest(`/exams/${searchId}`);
      if (exam) {
        console.log('\nНайден экзамен:');
        console.log(JSON.stringify(exam, null, 2));
      }
      break;
    case '4':
      const updateId = await question('Введите ID экзамена для обновления: ');
      const updateAbiturientId = await question('Новый ID абитуриента: ');
      const updateTeacherId = await question('Новый ID преподавателя: ');
      const updateSubject = await question('Новый предмет: ');
      const updateDate = await question('Новая дата (YYYY-MM-DD): ');
      const updateScore = await question('Новая оценка: ');
      
      const updatedExam = await makeRequest(`/exams/${updateId}`, 'PUT', {
        abiturientId: updateAbiturientId,
        teacherId: updateTeacherId,
        subject: updateSubject,
        date: updateDate,
        score: parseInt(updateScore, 10)
      });
      
      if (updatedExam) {
        console.log('\nДанные экзамена обновлены:');
        console.log(JSON.stringify(updatedExam, null, 2));
      }
      break;
    case '5':
      const deleteId = await question('Введите ID экзамена для удаления: ');
      const deletedExam = await makeRequest(`/exams/${deleteId}`, 'DELETE');
      if (deletedExam) {
        console.log('Экзамен успешно удален');
      }
      break;
    case '6':
      const teachersId = await question('Введите ID экзамена: ');
      const teachers = await makeRequest(`/exams/${teachersId}/teachers`);
      if (teachers) {
        console.log('\nПреподаватели экзамена:');
        console.log(JSON.stringify(teachers, null, 2));
      }
      break;
    case '0':
      await displayMenu();
      return;
    default:
      console.log('Неверный выбор. Попробуйте снова.');
  }
  
  await examMenu();
}

// Запуск приложения
console.log('Запуск клиента...');
console.log('Убедитесь, что сервер запущен на порту 4000');
displayMenu(); 