import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todosChanged = new Subject<Todo[]>();

  todos: Todo[] = [
    new Todo( 'this is a test'),
    new Todo( 'Coder la US 1 pour le test des Todos', 'this is a description of todo task in mode mock data!', true),
    new Todo( 'Coder la US 2 pour le test des Todos')
  ]

  constructor() { }

  getAllTodos() {
    return this.todos.slice();
  };

  getTodoById(index: number) {
    return this.todos[index];
  }

  changeTodoState(index: number) {
    //change todo state
    const newTodo = new Todo(this.todos[index].title, this.todos[index].description, !this.todos[index].completed);

    // When a todo is done, it should be on the top of the list, else it should be placed at the bottom of the list
    if(!newTodo.completed) {
      this.todos.splice(index, 1);
      this.todos.unshift(newTodo);
    } else {
      this.todos.splice(index, 1);
      this.todos.push(newTodo);
    }
    this.todosChanged.next(this.todos.slice());
  }

  addTodo(todo: Todo) {
    this.todos.unshift(todo);
    this.todosChanged.next(this.todos.slice());
  }
}
