import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos!: Todo[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
  }

}
