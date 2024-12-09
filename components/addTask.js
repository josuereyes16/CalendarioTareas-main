import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';

// Función para agregar una nueva tarea
export const addTask = (evento) => {
  evento.preventDefault();

  const list = document.querySelector('[data-list]');
  const input = document.querySelector('[data-form-input]');
  const calendar = document.querySelector('[data-form-date]');
  const priorityInput = document.querySelector('[data-form-priority]');
  const durationInput = document.querySelector('[data-form-duration]');

  const value = input.value;
  const date = calendar.value;
  const dateFormat = moment(date).format('DD/MM/YYYY');
  const priority = priorityInput.value;
  const duration = durationInput.value;

  if (value === '' || date === '' || priority === '' || duration === '') {
    return;
  }

  input.value = '';
  calendar.value = '';
  priorityInput.value = '';
  durationInput.value = '';

  const complete = false;

  const taskObj = {
    value,
    dateFormat,
    priority,
    duration,
    complete,
    id: uuid.v4(),
  };

  list.innerHTML = '';

  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(taskList));

  displayTasks();
};

// Función para crear el HTML de una tarea
export const createTask = ({ value, dateFormat, priority, duration, complete, id }) => {
  const task = document.createElement('li');
  task.classList.add('card');

  const taskContent = document.createElement('div');

  const check = checkComplete(id);

  if (complete) {
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
  }

  const titleTask = document.createElement('span');
  titleTask.classList.add('task');
  titleTask.innerText = value;

  const taskDetails = document.createElement('p');
  taskDetails.innerHTML = `
    Fecha: ${dateFormat} <br>
    Prioridad: <strong>${priority}</strong> <br>
    Duración: <strong>${duration} horas</strong>
  `;

  taskContent.appendChild(check);
  taskContent.appendChild(titleTask);

  task.appendChild(taskContent);
  task.appendChild(taskDetails);
  task.appendChild(deleteIcon(id));

  return task;
};
