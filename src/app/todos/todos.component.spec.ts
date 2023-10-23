
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { TodosComponent } from './todos.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';
import { FormsModule } from '@angular/forms';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      imports: [FormsModule], // Ajoutez FormsModule aux imports
      providers: [DataService],
    });

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);

    // Créez un exemple de tâche
    const todo = new Todo('Test Todo', '', false);
    component.todos = [todo];

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a todo on form submission', () => {
    const addTodoSpy = spyOn(dataService, 'addTodo');

    const form = fixture.debugElement.nativeElement.querySelector('form');
    const titleInput = fixture.debugElement.nativeElement.querySelector('input[name="title"]');
    const descriptionInput = fixture.debugElement.nativeElement.querySelector('textarea[name="description"]');
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');

    titleInput.value = 'New Test Todo';
    descriptionInput.value = 'Description for the new task';
    titleInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));

    expect(addTodoSpy).toHaveBeenCalledWith(jasmine.any(Todo));
    expect(component.showValidationError).toBeFalse();
  });

  // it('should toggle the completion of a todo', () => {
  //   const changeTodoStateSpy = spyOn(dataService, 'changeTodoState').and.callThrough();

  //   const toggleButton = fixture.debugElement.nativeElement.querySelector('.toggle-button');
  //   toggleButton.click();

  //   expect(changeTodoStateSpy).toHaveBeenCalledWith(0);
  // });

  it('should toggle the completion of a todo', fakeAsync(() => {
    // Espionner la méthode changeTodoState de DataService
    const changeTodoStateSpy = spyOn(dataService, 'changeTodoState');

    // Appeler la fonction toggleCompleted avec l'index 0 (première tâche)
    component.toggleCompleted(0);

    // Vérifier que la méthode changeTodoState a été appelée avec l'index 0
    expect(changeTodoStateSpy).toHaveBeenCalledWith(0);
  }));

  it('should unsubscribe from the data service on component destroy', () => {
    const unsubscribeSpy = spyOn(component.sub, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
