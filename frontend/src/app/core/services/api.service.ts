import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Calendar endpoints
  getCalendarEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/calendar`);
  }

  getCalendarEvent(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/calendar/${id}`);
  }

  createCalendarEvent(event: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/calendar`, event);
  }

  updateCalendarEvent(id: number, event: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/calendar/${id}`, event);
  }

  deleteCalendarEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/calendar/${id}`);
  }

  // Todolist endpoints
  getTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todolist`);
  }

  getTodo(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/todolist/${id}`);
  }

  createTodo(todo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/todolist`, todo);
  }

  updateTodo(id: number, todo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/todolist/${id}`, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todolist/${id}`);
  }

  // Inventory endpoints
  getInventoryItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventory`);
  }

  getInventoryItem(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventory/${id}`);
  }

  createInventoryItem(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inventory`, item);
  }

  updateInventoryItem(id: number, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/inventory/${id}`, item);
  }

  deleteInventoryItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inventory/${id}`);
  }

  // Recipe endpoints
  getRecipes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipe`);
  }

  getRecipe(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipe/${id}`);
  }

  createRecipe(recipe: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipe`, recipe);
  }

  updateRecipe(id: number, recipe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/recipe/${id}`, recipe);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/recipe/${id}`);
  }
}
