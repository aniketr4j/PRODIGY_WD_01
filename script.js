// Retrieve tasks from localStorage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to render tasks
const renderTasks = () => {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})">
    `;
    taskList.appendChild(li);
  });
};

// Function to add a new task
const addTask = (title) => {
  tasks.push({ title, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

// Function to delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

// Function to toggle task completion
const toggleCompletion = (index) => {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

// Event listener for form submission
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskTitle = taskInput.value.trim();
  if (taskTitle !== '') {
    addTask(taskTitle);
    taskInput.value = '';
  }
});

// Initial rendering of tasks
renderTasks();
