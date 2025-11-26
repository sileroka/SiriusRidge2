import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CalendarEvent,
  CalendarEventsResponse,
  CalendarEventResponse,
  Todo,
  TodosResponse,
  TodoResponse,
  InventoryItem,
  InventoryItemsResponse,
  InventoryItemResponse,
  Recipe,
  RecipesResponse,
  RecipeResponse,
  MessageResponse
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Calendar endpoints
  getCalendarEvents(): Observable<CalendarEventsResponse> {
    return this.http.get<CalendarEventsResponse>(`${this.apiUrl}/calendar`);
  }

  getCalendarEvent(id: number): Observable<CalendarEventResponse> {
    return this.http.get<CalendarEventResponse>(`${this.apiUrl}/calendar/${id}`);
  }

  createCalendarEvent(event: CalendarEvent): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/calendar`, event);
  }

  updateCalendarEvent(id: number, event: CalendarEvent): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.apiUrl}/calendar/${id}`, event);
  }

  deleteCalendarEvent(id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}/calendar/${id}`);
  }

  // Todolist endpoints
  getTodos(): Observable<TodosResponse> {
    return this.http.get<TodosResponse>(`${this.apiUrl}/todolist`);
  }

  getTodo(id: number): Observable<TodoResponse> {
    return this.http.get<TodoResponse>(`${this.apiUrl}/todolist/${id}`);
  }

  createTodo(todo: Todo): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/todolist`, todo);
  }

  updateTodo(id: number, todo: Todo): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.apiUrl}/todolist/${id}`, todo);
  }

  deleteTodo(id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}/todolist/${id}`);
  }

  // Inventory endpoints
  getInventoryItems(): Observable<InventoryItemsResponse> {
    return this.http.get<InventoryItemsResponse>(`${this.apiUrl}/inventory`);
  }

  getInventoryItem(id: number): Observable<InventoryItemResponse> {
    return this.http.get<InventoryItemResponse>(`${this.apiUrl}/inventory/${id}`);
  }

  createInventoryItem(item: InventoryItem): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/inventory`, item);
  }

  updateInventoryItem(id: number, item: InventoryItem): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.apiUrl}/inventory/${id}`, item);
  }

  deleteInventoryItem(id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}/inventory/${id}`);
  }

  // Recipe endpoints
  getRecipes(): Observable<RecipesResponse> {
    return this.http.get<RecipesResponse>(`${this.apiUrl}/recipe`);
  }

  getRecipe(id: number): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(`${this.apiUrl}/recipe/${id}`);
  }

  createRecipe(recipe: Recipe): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/recipe`, recipe);
  }

  updateRecipe(id: number, recipe: Recipe): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.apiUrl}/recipe/${id}`, recipe);
  }

  deleteRecipe(id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}/recipe/${id}`);
  }
}
