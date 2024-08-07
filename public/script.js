document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
  
    document.getElementById('todoForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const todoInput = document.getElementById('todoInput').value;
      addTodo(todoInput);
      document.getElementById('todoInput').value = '';
    });
  });
  
  function fetchTodos() {
    fetch('/todos')
      .then(response => response.json())
      .then(data => {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';
        data.forEach((todo, index) => {
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          li.innerHTML = `${todo} <button class="btn btn-danger btn-sm" onclick="deleteTodo(${index})">Delete</button>`;
          todoList.appendChild(li);
        });
      });
  }
  
  function addTodo(todo) {
    fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ todo })
    })
    .then(response => response.json())
    .then(data => {
      fetchTodos();
    });
  }
  
  function deleteTodo(index) {
    fetch(`/todos/${index}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      fetchTodos();
    });
  }
  