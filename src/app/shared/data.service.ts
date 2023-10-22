import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Todo[] = [
    new Todo( 'this is a test'),
    new Todo( 'Coder la US 1 pour le test des Todos', true),
    new Todo( 'Coder la US 2 pour le test des Todos', false)
  ]

  constructor() { }

  getAllTodos() {
    return this.todos.slice();
  };
  
}
