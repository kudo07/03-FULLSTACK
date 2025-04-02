let todos = [];
function addTodo() {
  const input = document.getElementById('todo-input');
  const task = input.value.trim();
  if (task) {
    todos.push(task);
    input.value = '';
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function editTodo(index) {
  const listItem = document.querySelector(
    `#todo-list li:nth-child(${index + 1}) span`
  );
  const input = document.createElement('input');
  input.type = 'text';
  input.value = todos[index];
  input.classList.add('edit-input');

  input.onblur = () => updateTask(index, input.value);
  input.onkeydown = (e) => {
    if (e.key === 'Enter') {
      updateTask(index, input.value);
    }
  };

  listItem.replaceWith(input);
  input.focus();
}

function updateTask(index, newValue) {
  if (newValue.trim() !== '') {
    todos[index] = newValue.trim();
  }
  renderTodos();
}
function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach((task, index) => {
    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task;

    // edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'EDIT';
    editButton.onclick = () => editTodo(index);
    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'DELETE';
    deleteButton.onclick = () => deleteTodo(index);

    // appendchild
    li.appendChild(taskSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
}
