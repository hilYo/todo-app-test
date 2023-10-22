import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todo!: Todo

  constructor( private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const todoId = params.get('id'); // Assuming you've defined 'id' as a route parameter
      if (todoId) {
        this.todo = this.dataService.getTodoById(+todoId); // Assuming a method to fetch a specific todo by ID
      }
    });
  }

}