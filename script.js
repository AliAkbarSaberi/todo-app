const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-task');
const list = document.getElementById('task-list');

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  const tasks = getTasks();
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.done) li.classList.add('done');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Poista';
    removeBtn.addEventListener('click', () => {
      tasks.splice(i, 1);
      saveTasks(tasks);
      renderTasks();
    });

    li.addEventListener('click', (e) => {
      if (e.target === removeBtn) return;
      task.done = !task.done;
      saveTasks(tasks);
      renderTasks();
    });

    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  if (input.value.trim() === '') return;
  const tasks = getTasks();
  tasks.push({ text: input.value, done: false });
  saveTasks(tasks);
  input.value = '';
  renderTasks();
});

window.addEventListener('load', renderTasks);
