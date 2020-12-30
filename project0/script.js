const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

/**
 * Array for keeping track of all of the todo items and their checked/unchecked state.
 */
let todoItems = [];

/**
 * When the new todo button is clicked, this prompts the user for the text they want to use in their new todo
 * item and if text was provided, creates a new todo item in the list.
 */
function newTodo() {
  var userInput = prompt("What do you want to add to your todo list?");

  if (userInput) {
    createNewTodoItem(userInput);
  }
}

/**
 * Creates the new todo item DOM element along with all sub-elements (e.g. the completion checkbox and delete button)
 * and all event handlers and tracks the new todo item in the object array.
 * @param {*} userTodoText 
 */
function createNewTodoItem(userTodoText) {
  // Create the new todo item. This will basically be the container which holds all of the sub-elements for each todo item.
  const newTodo = document.createElement('li');
  newTodo.className = classNames.TODO_ITEM;
  newTodo.id = `todo-${todoItems.length}`; // Add a unique id to each new todo item just for clarity's sake.

  // Add the todo item's text.
  const newTodoText = document.createElement('span');
  newTodoText.className = classNames.TODO_TEXT;
  newTodoText.innerText = userTodoText; // Assign whatever the user entered as text.

  // Create the checkbox for completing each todo item.
  const newTodoCheckbox = document.createElement('input');
  newTodoCheckbox.className = classNames.TODO_CHECKBOX;
  newTodoCheckbox.type = "checkbox";
  newTodoCheckbox.onchange = function() {
    const currentTodoItem = todoItems.find(todoItem => todoItem.todoItem === this.parentElement);
    currentTodoItem.isChecked = this.checked;

    calculateUncheckedItems();
  };

  // Create the button for deleting each todo item.
  const newTodoDelete = document.createElement('button');
  newTodoDelete.className = classNames.TODO_DELETE;
  newTodoDelete.innerText = "Delete";
  newTodoDelete.onclick = function() {
    // Mark the todo item as deleted in the array, but don't remove it. This avoids issues later on when users
    // add new items which can cause incorrect behavior due to duplicate ids (ids are based on todoItems.length).
    const currentTodoItem = todoItems.find(todoItem => todoItem.todoItem === this.parentElement);
    currentTodoItem.isDeleted = true;

    // Remove the todo item from the DOM.
    this.parentElement.remove();

    // Recalculate the total and unchecked todo item counts.
    calculateTotalItems();
    calculateUncheckedItems();
  };

  // Add the sub-elements to the todo item.
  newTodo.appendChild(newTodoText);
  newTodo.appendChild(newTodoCheckbox);
  newTodo.appendChild(newTodoDelete);

  // Add the new todo item to the list.
  list.appendChild(newTodo);

  // Track the new todo item in an array that keeps track of each todo item with it's checked/unchecked state.
  todoItems.push({
    todoItem: newTodo,
    isChecked: false,
    isDeleted: false
  });

  // Calculate and set the correct counters for how many total and unchecked items there are in the list.
  calculateTotalItems();
  calculateUncheckedItems();
}

function calculateTotalItems() {
  itemCountSpan.innerText = todoItems.filter(item => !item.isDeleted).length;
}

function calculateUncheckedItems() {
  uncheckedCountSpan.innerText = todoItems.filter(item => !item.isChecked && !item.isDeleted).length;
}