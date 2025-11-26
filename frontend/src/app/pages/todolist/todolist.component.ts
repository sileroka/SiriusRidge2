import { Component } from '@angular/core';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [],
  template: `
    <div class="todolist-page">
      <h1>Todo List</h1>
      <p>Todo list management page - Coming soon</p>
    </div>
  `,
  styles: [`
    .todolist-page {
      padding: 2rem;
    }
  `]
})
export class TodolistComponent {
}
