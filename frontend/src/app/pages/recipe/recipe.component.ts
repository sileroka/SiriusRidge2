import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  template: `
    <div class="recipe-page">
      <h1>Recipes</h1>
      <p>Recipe management page - Coming soon</p>
    </div>
  `,
  styles: [`
    .recipe-page {
      padding: 2rem;
    }
  `]
})
export class RecipeComponent {
}
