const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-task');
const list = document.getElementById('task-list');

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    list.innerHTML = saved;
  }
}

function saveTasks() {
  localStorage.setItem('tasks', list.innerHTML);
}

addBtn.addEventListener('click', () => {
  if (input.value.trim() === '') return;

  const li = document.createElement('li');
  li.textContent = input.value;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Poista';
  removeBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.addEventListener('click', () => {
    li.classList.toggle('done');
    saveTasks();
  });

  li.appendChild(removeBtn);
  list.appendChild(li);
  input.value = '';
  saveTasks();
});

window.addEventListener('load', loadTasks);
