import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

  todos!: Todo[];
  showValidationError!: boolean;

  sub!: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.sub = this.dataService.todosChanged.subscribe((todos: Todo[]) => {
      this.todos = todos;
    });

    this.todos = this.dataService.getAllTodos();
  }

  onFormSubmit(form: NgForm) {
    if(!form.valid) { return this.showValidationError = true; }
    console.log(form.value )
    this.dataService.addTodo(new Todo(form.value.title, form.value.description));

    form.reset();
    return this.showValidationError =false;
  }

  toggleCompleted(index: number) {
    // set todo to completed by calling a method from dataService
    this.dataService.changeTodoState(index);
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
