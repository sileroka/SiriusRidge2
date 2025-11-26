import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { CalendarService } from '../services/calendar.service';
import { NewCalendarDialogComponent } from '../new-calendar-dialog/new-calendar-dialog.component';

@Component({
  selector: 'app-calendar-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    Button,
    Checkbox,
    NewCalendarDialogComponent
  ],
  templateUrl: './calendar-sidebar.component.html',
  styleUrls: ['./calendar-sidebar.component.scss']
})
export class CalendarSidebarComponent {
  @Output() dateSelected = new EventEmitter<Date>();

  selectedDate: Date = new Date();
  showNewCalendarDialog = signal(false);

  constructor(public calendarService: CalendarService) {}

  onDateSelect(date: Date): void {
    this.dateSelected.emit(date);
  }

  toggleCalendarVisibility(calendarId: number): void {
    this.calendarService.toggleCalendarVisibility(calendarId);
  }

  openNewCalendarDialog(): void {
    this.showNewCalendarDialog.set(true);
  }

  onCalendarCreated(): void {
    this.showNewCalendarDialog.set(false);
  }
}
