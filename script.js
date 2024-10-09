const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
function newTodo() {
  const text = prompt("Введіть нове завдання:");
  if (text) {
    todos.push({ text, done: false });
    render();
    updateCounter();
    saveTodos(); 
  }
}
function renderTodo(todo, index) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${index}" ${todo.done ? 'checked' : ''} onchange="checkTodo(${index})"/>
      <label for="${index}">
        <span class="${todo.done ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${index})">delete</button>
    </li>
  `;
}
function render() {
  list.innerHTML = todos.map((todo, index) => renderTodo(todo, index)).join('');
}
function updateCounter() {
  const totalTodos = todos.length;
  const uncheckedTodos = todos.filter(todo => !todo.done).length;
  itemCountSpan.textContent = totalTodos;
  uncheckedCountSpan.textContent = uncheckedTodos;
}
function deleteTodo(index) {
  todos.splice(index, 1);
  render();
  updateCounter();
  saveTodos(); 
}
function checkTodo(index) {
  todos[index].done = !todos[index].done;
  render();
  updateCounter();
  saveTodos();  
}
render();
updateCounter();