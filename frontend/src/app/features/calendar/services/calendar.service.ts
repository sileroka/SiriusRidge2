import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Calendar {
  id: number;
  name: string;
  color: string;
  description?: string;
  is_visible: boolean;
  family_id: string;
  created_at?: string;
}

export interface CalendarEvent {
  id?: number;
  title: string;
  calendar_id: number;
  start_time: Date | string;
  end_time: Date | string;
  all_day: boolean;
  description?: string;
  location?: string;
  color_override?: string;
  calendar?: Calendar;
}

export interface CalendarResponse {
  calendars: Calendar[];
}

export interface CalendarEventResponse {
  events: CalendarEvent[];
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = environment.apiUrl;

  calendars = signal<Calendar[]>([]);
  events = signal<CalendarEvent[]>([]);

  constructor(private http: HttpClient) {}

  // Calendar CRUD operations
  loadCalendars(): Observable<CalendarResponse> {
    return this.http.get<CalendarResponse>(`${this.apiUrl}/calendars`).pipe(
      tap(response => this.calendars.set(response.calendars))
    );
  }

  createCalendar(calendar: Partial<Calendar>): Observable<{ calendar: Calendar }> {
    return this.http.post<{ calendar: Calendar }>(`${this.apiUrl}/calendars`, calendar).pipe(
      tap(response => {
        this.calendars.update(calendars => [...calendars, response.calendar]);
      })
    );
  }

  updateCalendar(id: number, calendar: Partial<Calendar>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/calendars/${id}`, calendar).pipe(
      tap(() => {
        this.calendars.update(calendars =>
          calendars.map(c => c.id === id ? { ...c, ...calendar } : c)
        );
      })
    );
  }

  deleteCalendar(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/calendars/${id}`).pipe(
      tap(() => {
        this.calendars.update(calendars => calendars.filter(c => c.id !== id));
      })
    );
  }

  // Event CRUD operations
  loadEvents(startDate?: string, endDate?: string): Observable<CalendarEventResponse> {
    let url = `${this.apiUrl}/events`;
    const params = new URLSearchParams();
    if (startDate) params.append('start', startDate);
    if (endDate) params.append('end', endDate);
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;

    return this.http.get<CalendarEventResponse>(url).pipe(
      tap(response => this.events.set(response.events))
    );
  }

  createEvent(event: Partial<CalendarEvent>): Observable<{ event: CalendarEvent }> {
    return this.http.post<{ event: CalendarEvent }>(`${this.apiUrl}/events`, event).pipe(
      tap(response => {
        this.events.update(events => [...events, response.event]);
      })
    );
  }

  updateEvent(id: number, event: Partial<CalendarEvent>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/events/${id}`, event).pipe(
      tap(() => {
        this.events.update(events =>
          events.map(e => e.id === id ? { ...e, ...event } : e)
        );
      })
    );
  }

  deleteEvent(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/events/${id}`).pipe(
      tap(() => {
        this.events.update(events => events.filter(e => e.id !== id));
      })
    );
  }

  // Utility methods
  getCalendarById(id: number): Calendar | undefined {
    return this.calendars().find(c => c.id === id);
  }

  getEventColor(event: CalendarEvent): string {
    if (event.color_override) return event.color_override;
    const calendar = this.getCalendarById(event.calendar_id);
    return calendar?.color || '#3B82F6';
  }

  toggleCalendarVisibility(id: number): void {
    const calendar = this.getCalendarById(id);
    if (calendar) {
      const newVisibility = !calendar.is_visible;
      this.updateCalendar(id, { is_visible: newVisibility }).subscribe();
    }
  }
}
