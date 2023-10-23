import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @Input() index!: number;
  @Output() todoClicked: EventEmitter<void> = new EventEmitter();

  constructor( private dataService: DataService) { }

  ngOnInit(): void {
  }

  onTodoClicked() {
    this.todoClicked.emit();
  }

  ondeleteClecked() {
    this.dataService.deleteTodo(this.index);
  }

}
