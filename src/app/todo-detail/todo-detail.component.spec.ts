import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoDetailComponent } from './todo-detail.component';
import { DataService } from '../shared/data.service';
import { of } from 'rxjs';
import { Todo } from '../shared/todo.model';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let activatedRoute: ActivatedRoute;
  let dataService: DataService;

  beforeEach(() => {
    activatedRoute = {
      paramMap: of({ get: (key: string) => '1' }) as any, // Simulate ActivatedRoute's paramMap
    } as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [TodoDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        DataService, // You can use a testing version or a mock of the DataService
      ],
    });

    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);

    // Mock the data service's getTodoById method
    spyOn(dataService, 'getTodoById').and.returnValue(new Todo( 'Test Todo', 'This is a test description',false ));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display the correct todo details', () => {
    // Ensure that the component has fetched the todo details
    expect(component.todo).toBeDefined();
    expect(component.todo.title).toBe('Test Todo');
    expect(component.todo.description).toBe('This is a test description');
    expect(component.todo.completed).toBe(false);
  });
});