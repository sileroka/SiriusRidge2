import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventDropArg, DateSelectArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarService, CalendarEvent } from '../services/calendar.service';
import { CalendarSidebarComponent } from '../calendar-sidebar/calendar-sidebar.component';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    CalendarSidebarComponent,
    EventDialogComponent
  ],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {
  selectedEvent = signal<CalendarEvent | null>(null);
  showEventDialog = signal(false);

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    select: this.onDateSelect.bind(this),
    eventClick: this.onEventClick.bind(this),
    eventDrop: this.onEventDrop.bind(this),
    eventResize: this.onEventResize.bind(this),
    datesSet: this.onDatesSet.bind(this)
  };

  constructor(public calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.loadCalendars().subscribe();
    this.calendarService.loadEvents().subscribe();
  }

  get calendarEvents() {
    return this.calendarService.events()
      .filter(event => {
        const calendar = this.calendarService.getCalendarById(event.calendar_id);
        return calendar?.is_visible !== false;
      })
      .map(event => ({
        id: event.id?.toString(),
        title: event.title,
        start: event.start_time,
        end: event.end_time,
        allDay: event.all_day,
        backgroundColor: this.calendarService.getEventColor(event),
        borderColor: this.calendarService.getEventColor(event),
        extendedProps: {
          ...event
        }
      }));
  }

  onDateSelect(selectInfo: DateSelectArg): void {
    const newEvent: CalendarEvent = {
      title: '',
      calendar_id: this.calendarService.calendars()[0]?.id || 0,
      start_time: selectInfo.start,
      end_time: selectInfo.end,
      all_day: selectInfo.allDay
    };
    this.selectedEvent.set(newEvent);
    this.showEventDialog.set(true);
    selectInfo.view.calendar.unselect();
  }

  onEventClick(clickInfo: EventClickArg): void {
    const event = clickInfo.event.extendedProps as CalendarEvent;
    this.selectedEvent.set(event);
    this.showEventDialog.set(true);
  }

  onEventDrop(dropInfo: EventDropArg): void {
    const eventId = parseInt(dropInfo.event.id);
    const updatedData = {
      start_time: dropInfo.event.start!,
      end_time: dropInfo.event.end || dropInfo.event.start!,
      all_day: dropInfo.event.allDay
    };

    this.calendarService.updateEvent(eventId, updatedData).subscribe({
      error: () => {
        dropInfo.revert();
      }
    });
  }

  onEventResize(resizeInfo: EventDropArg): void {
    const eventId = parseInt(resizeInfo.event.id);
    const updatedData = {
      start_time: resizeInfo.event.start!,
      end_time: resizeInfo.event.end || resizeInfo.event.start!
    };

    this.calendarService.updateEvent(eventId, updatedData).subscribe({
      error: () => {
        resizeInfo.revert();
      }
    });
  }

  onDatesSet(dateInfo: any): void {
    // Reload events when the view date range changes
    const start = dateInfo.start.toISOString();
    const end = dateInfo.end.toISOString();
    this.calendarService.loadEvents(start, end).subscribe();
  }

  onDateSelected(date: Date): void {
    // Navigate the calendar to the selected date from mini calendar
    const calendarApi = (this.calendarOptions as any).calendar;
    if (calendarApi) {
      calendarApi.gotoDate(date);
    }
  }

  onEventSaved(): void {
    this.showEventDialog.set(false);
    this.selectedEvent.set(null);
  }

  onEventDeleted(): void {
    this.showEventDialog.set(false);
    this.selectedEvent.set(null);
  }

  onDialogClose(): void {
    this.showEventDialog.set(false);
    this.selectedEvent.set(null);
  }
}
