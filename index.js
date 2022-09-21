let addAMessage = document.querySelector(".message");
let addAButton = document.querySelector('.add');
let todo = document.querySelector('.todo');
let todoList = [];
if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addAButton.addEventListener('click', () => {
    let newToDo = {
        todo: addAMessage.value, checked: false, important: false,
    }
    todoList.push(newToDo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessages() {
    let displayAMessage = '';
    todoList.forEach(function (item, index) {
        displayAMessage += `
            <li>
            <input type="checkbox" id='item_${index}' ${item.checked ? 'checked' : ''}>
            <label for="item_${index}" class="${item.important ? 'important' : ''}">${item.todo}</label>
            </li>
        `;
        todo.innerHTML = displayAMessage;
    });
}
todo.addEventListener('change', (event) => {
    let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;
    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});
todo.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    todoList.forEach(function (item, index) {
        if (item.todo === event.target.innerHTML) {
            if(event.ctrlKey||event.metaKey){
                todoList.splice(index, 1);
            } else {
                item.important = !item.important;
            }
            localStorage.setItem('todo', JSON.stringify(todoList));
            displayMessages();
        }
    });
});