import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TodosComponent } from './todos.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';


describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [DataService]
    });

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);

    // Créer un exemple de tâche
    const todo = new Todo('Test Todo', false);
    component.todos = [todo];

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the completion of a todo', fakeAsync(() => {
    // Espionner la méthode changeTodoState de DataService
    const changeTodoStateSpy = spyOn(dataService, 'changeTodoState');

    // Appeler la fonction toggleCompleted avec l'index 0 (première tâche)
    component.toggleCompleted(0);

    // Vérifier que la méthode changeTodoState a été appelée avec l'index 0
    expect(changeTodoStateSpy).toHaveBeenCalledWith(0);
  }));
});