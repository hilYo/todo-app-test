import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { Todo } from './todo.model';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change the state of a todo', () => {
    // creat todos
    const todos: Todo[] = [
      new Todo('Test Todo 1', true),
      new Todo('Test Todo 2', false),
      new Todo('Test Todo 3', true),
    ];

    // Initialise the service with todos
    service.todos = [...todos];

    // call methode changeTodoState for changing the first todo state
    const indexToChange = 0;
    service.changeTodoState(indexToChange);

    // Vérifier que l'état de la première tâche a été inversé
    expect(service.todos[indexToChange].completed).toBe(false);

    // Vérifier que la première tâche est déplacée en haut de la liste
    expect(service.todos[0].title).toEqual(todos[indexToChange].title);

    // Vérifier que les autres tâches sont inchangées
    for (let i = 1; i < todos.length; i++) {
      expect(service.todos[i]).toEqual(todos[i]);
    }
  });
});
