import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [],
  template: `
    <div class="inventory-page">
      <h1>Inventory</h1>
      <p>Inventory management page - Coming soon</p>
    </div>
  `,
  styles: [`
    .inventory-page {
      padding: 2rem;
    }
  `]
})
export class InventoryComponent {
}
