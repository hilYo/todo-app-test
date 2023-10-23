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

  it('should get all todos', () => {
    const todos = service.getAllTodos();
    expect(todos).toEqual(service.todos);
  });

  it('should get a todo by ID', () => {
    const index = 0;
    const todo = service.getTodoById(index);
    expect(todo).toEqual(service.todos[index]);
  });

  it('should change the state of a todo', () => {
    // creat todos
    const todos: Todo[] = [
      new Todo('Test Todo 1', '',true),
      new Todo('Test Todo 2', '',false),
      new Todo('Test Todo 3', '',true),
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

  it('should add a new todo', () => {
    const newTodo = new Todo('New Task', 'Description', false);
    service.addTodo(newTodo);

    // Verify that the new todo is added to the beginning of the list
    expect(service.todos[0]).toEqual(newTodo);
  });

  it('should delete a todo', () => {
    const todoDeleted = service.todos[0] // Assuming you want to delete the first todo
    service.deleteTodo(0);

    // Verify that the todo is removed from the list
    expect(service.todos).not.toContain(todoDeleted);
  });
});
