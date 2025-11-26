import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  template: `
    <div class="calendar-page">
      <h1>Calendar</h1>
      <p>Calendar management page - Coming soon</p>
    </div>
  `,
  styles: [`
    .calendar-page {
      padding: 2rem;
    }
  `]
})
export class CalendarComponent {
}
