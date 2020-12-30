import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let todoId = 0;

class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: []
    }
  }

  render() {
    return (
      <div className="container center">
        <h1 className="center title">React TODO App</h1>
        <div className="flow-right controls">
          <span>
            Item count: {this.state.todos.length}
          </span>
          <span>
            Unchecked count: {this.state.todos.filter(todo => !todo.checked).length}
          </span>
        </div>
        <button className="button center" onClick={() => this.addTodo()}>New Todo</button>
        <ul className="todo-list">
          {this.state.todos.map(todo =>
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => this.removeTodo(todo.id)}
              onToggle={() => this.toggleTodo(todo.id)}
            />
          )}
        </ul>
      </div>
    );
  }

  addTodo() {
    const text = prompt("Todo text");
    const currentTodos = this.state.todos.slice(); // This is the convention from the React tutorial

    this.setState({
      todos: currentTodos.concat([{
        id: todoId++,
        text: text,
        checked: false
      }])

      // An alternative to the .slice/.concat would be to do the following which pulls all the values out of the old array and creates a new one with those values:
      //todos: [...this.state.todos, {id: todoId++, text: text, checked: false}]
    });
  }

  removeTodo(id) {
    const currentTodos = this.state.todos.slice();

    this.setState({
      todos: currentTodos.filter(todo => todo.id !== id)
    });
  }

  toggleTodo(id) {
    const currentTodos = this.state.todos.slice();

    this.setState({
      todos: currentTodos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        }
      })
    });
  }
}

const Todo = props => (
    <li className="todo-container">
      <input className="todo-checkbox" type="checkbox" checked={props.todo.checked} onChange={props.onToggle}></input>
      <button className="todo-delete" onClick={props.onDelete}>Delete</button>
      <span className="todo-text">{props.todo.text}</span>
    </li>
);

// ========================================

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);