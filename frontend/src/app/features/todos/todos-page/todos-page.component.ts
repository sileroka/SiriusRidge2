import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="mb-4">
            <i class="pi pi-check-square text-6xl text-blue-500"></i>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Tasks & To-Dos</h1>
          <p class="text-gray-600 text-lg">This feature is coming soon!</p>
          <p class="text-gray-500 mt-4">
            Manage your family's tasks, chores, and to-do lists all in one place.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100%;
      background-color: #f9fafb;
    }
  `]
})
export class TodosPageComponent {}
