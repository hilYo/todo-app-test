import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../shared/todo.model';
import { By } from '@angular/platform-browser';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todo: Todo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemComponent]
    });

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;

    // create a todo
    todo = new Todo('Test Todo');
    component.todo = todo;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display todo title', () => {
    const todoTitle = fixture.debugElement.query(By.css('.todo-text')).nativeElement.textContent;
    expect(todoTitle).toContain(todo.title);
  });
});
