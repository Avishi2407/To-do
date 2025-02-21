//selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('#filter-todo');

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Functions

function addTodo(event){
    //PREVENTING FORM FROM SUBMITTING
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to local storage
    savelocaltodos(todoInput.value);

    // COMPLETED BUTTON 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // TRASH BUTTON 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND ALL THESE ELEMNETS TO THE LIST 
    todoList.appendChild(todoDiv);

    //clear todo input valude
    todoInput.value = "";

}

function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }

    //CHECKMARK
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        if (todo.nodeType === 1) { // ensures that only element nodes are processed
            switch (e.target.value) {
                case 'all':
                    todo.style.display = 'flex';
                    break;
                case 'completed':
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case 'uncompleted':
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        }
    });
}

function savelocaltodos(todo){
    //check if it is already there or not?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
            let todos;
            if (localStorage.getItem("todos") === null) {
                todos = [];
            } else {
                todos = JSON.parse(localStorage.getItem("todos"));
            }
            todos.forEach(function (todo) {
                const todoDiv = document.createElement("div");
                todoDiv.classList.add("todo");

                const newTodo = document.createElement("li");
                newTodo.innerText = todo;
                newTodo.classList.add('todo-item');
                todoDiv.appendChild(newTodo);

                const completedButton = document.createElement('button');
                completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
                completedButton.classList.add("complete-btn");
                todoDiv.appendChild(completedButton);

                const trashButton = document.createElement('button');
                trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
                trashButton.classList.add("trash-btn");
                todoDiv.appendChild(trashButton);

                todoList.appendChild(todoDiv);
            });
}

function removeLocalTodos(todo){
    let todos;
            if (localStorage.getItem("todos") === null) {
                todos = [];
            } else {
                todos = JSON.parse(localStorage.getItem("todos"));
            }
            const todoIndex = todo.children[0].innerText;
            todos.splice(todos.indexOf(todoIndex),1);
            localStorage.setItem("todos",JSON.stringify(todos));

}