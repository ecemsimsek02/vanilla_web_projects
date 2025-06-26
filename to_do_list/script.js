const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Sayfa yüklendiğinde eski görevleri listele
todos.forEach(addTodoToDOM);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    const todo = { text, done: false };
    todos.push(todo);
    addTodoToDOM(todo);
    updateLocalStorage();
    input.value = '';
  }
});

function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.textContent = todo.text;
  if (todo.done) li.classList.add('done');

  li.addEventListener('click', () => {
    todo.done = !todo.done;
    li.classList.toggle('done');
    updateLocalStorage();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Sil';
  deleteBtn.addEventListener('click', () => {
    todos = todos.filter(t => t !== todo);
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
