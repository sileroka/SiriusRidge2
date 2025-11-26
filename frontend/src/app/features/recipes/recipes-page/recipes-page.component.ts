import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="mb-4">
            <i class="pi pi-book text-6xl text-green-500"></i>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Recipes</h1>
          <p class="text-gray-600 text-lg">This feature is coming soon!</p>
          <p class="text-gray-500 mt-4">
            Store, organize, and share your family's favorite recipes.
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
export class RecipesPageComponent {}
