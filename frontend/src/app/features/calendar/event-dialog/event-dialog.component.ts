import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dropdown } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { Checkbox } from 'primeng/checkbox';
import { InputTextarea } from 'primeng/inputtextarea';
import { ColorPicker } from 'primeng/colorpicker';
import { CalendarService, CalendarEvent } from '../services/calendar.service';

@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Dialog,
    Button,
    InputText,
    Dropdown,
    CalendarModule,
    Checkbox,
    InputTextarea,
    ColorPicker
  ],
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnChanges {
  @Input() visible = false;
  @Input() event: CalendarEvent | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  eventForm: FormGroup;
  loading = signal(false);
  showDeleteConfirm = signal(false);

  constructor(
    private fb: FormBuilder,
    public calendarService: CalendarService
  ) {
    this.eventForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event'] && this.event) {
      this.populateForm();
    } else if (changes['visible'] && !this.visible) {
      this.resetForm();
    }
  }

  get isEditMode(): boolean {
    return this.event?.id !== undefined;
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Edit Event' : 'New Event';
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      calendar_id: [null, Validators.required],
      start_time: [new Date(), Validators.required],
      end_time: [new Date(), Validators.required],
      all_day: [false],
      description: [''],
      location: [''],
      color_override: ['']
    });
  }

  populateForm(): void {
    if (!this.event) return;

    this.eventForm.patchValue({
      title: this.event.title || '',
      calendar_id: this.event.calendar_id,
      start_time: new Date(this.event.start_time),
      end_time: new Date(this.event.end_time),
      all_day: this.event.all_day || false,
      description: this.event.description || '',
      location: this.event.location || '',
      color_override: this.event.color_override || ''
    });
  }

  resetForm(): void {
    this.eventForm.reset({
      all_day: false,
      start_time: new Date(),
      end_time: new Date()
    });
  }

  onSave(): void {
    if (this.eventForm.invalid) {
      return;
    }

    this.loading.set(true);
    const formValue = this.eventForm.value;

    if (this.isEditMode && this.event?.id) {
      this.calendarService.updateEvent(this.event.id, formValue).subscribe({
        next: () => {
          this.loading.set(false);
          this.saved.emit();
          this.close();
        },
        error: () => {
          this.loading.set(false);
        }
      });
    } else {
      this.calendarService.createEvent(formValue).subscribe({
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
  }

  onDelete(): void {
    this.showDeleteConfirm.set(true);
  }

  confirmDelete(): void {
    if (!this.event?.id) return;

    this.loading.set(true);
    this.calendarService.deleteEvent(this.event.id).subscribe({
      next: () => {
        this.loading.set(false);
        this.showDeleteConfirm.set(false);
        this.deleted.emit();
        this.close();
      },
      error: () => {
        this.loading.set(false);
        this.showDeleteConfirm.set(false);
      }
    });
  }

  cancelDelete(): void {
    this.showDeleteConfirm.set(false);
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  onAllDayChange(): void {
    const allDay = this.eventForm.get('all_day')?.value;
    if (allDay) {
      // Set times to midnight
      const start = this.eventForm.get('start_time')?.value;
      const end = this.eventForm.get('end_time')?.value;
      if (start) {
        const startDate = new Date(start);
        startDate.setHours(0, 0, 0, 0);
        this.eventForm.patchValue({ start_time: startDate });
      }
      if (end) {
        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999);
        this.eventForm.patchValue({ end_time: endDate });
      }
    }
  }
}
