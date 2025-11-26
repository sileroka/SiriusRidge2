import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { ColorPicker } from 'primeng/colorpicker';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-new-calendar-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Dialog,
    Button,
    InputText,
    InputTextarea,
    ColorPicker
  ],
  templateUrl: './new-calendar-dialog.component.html',
  styleUrls: ['./new-calendar-dialog.component.scss']
})
export class NewCalendarDialogComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<void>();

  calendarForm: FormGroup;
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private calendarService: CalendarService
  ) {
    this.calendarForm = this.fb.group({
      name: ['', Validators.required],
      color: ['#3B82F6'],
      description: ['']
    });
  }

  onSave(): void {
    if (this.calendarForm.invalid) {
      return;
    }

    this.loading.set(true);
    const formValue = {
      ...this.calendarForm.value,
      is_visible: true
    };

    this.calendarService.createCalendar(formValue).subscribe({
      next: () => {
        this.loading.set(false);
        this.saved.emit();
        this.close();
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  resetForm(): void {
    this.calendarForm.reset({
      color: '#3B82F6'
    });
  }
}
