import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TodoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public todo: Todo) 
              { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {

    // this condition desable the submit if the form is invalid
    if (form.invalid) return

    const upDatedTodo = { ...this.todo, ...form.value}

    this.dialogRef.close(upDatedTodo);
  }

  close() {
    this.dialogRef.close();
  }
}
