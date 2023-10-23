import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

  todos!: Todo[];
  showValidationError!: boolean;

  sub!: Subscription;

  constructor(private dataService: DataService,
              private dialog: MatDialog) { }

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

  editTodo(todo: Todo) {

    const index = this.todos.indexOf(todo);

    let dialogRef = this.dialog.open(TodoEditComponent, {
      height: '250px',
      width: '600px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.dataService.updateTodo(index, result);
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
