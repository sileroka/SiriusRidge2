import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  name?: string;
  family_id?: string;
  [key: string]: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CreateFamilyRequest {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  private apiUrl = environment.apiUrl;

  // Signal to hold the current user
  currentUser = signal<User | null>(this.loadUserFromStorage());

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  /**
   * Get the stored authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Store the authentication token
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Set the current user and persist to storage
   */
  setUser(user: User): void {
    this.currentUser.set(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Load user from local storage
   */
  private loadUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Remove the authentication token and redirect to login
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Login user with email and password
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUser(response.user);
      })
    );
  }

  /**
   * Register a new user
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUser(response.user);
      })
    );
  }

  /**
   * Create a new family for the current user
   */
  createFamily(familyData: CreateFamilyRequest): Observable<{ family_id: string; user: User }> {
    return this.http.post<{ family_id: string; user: User }>(`${this.apiUrl}/family/create`, familyData).pipe(
      tap(response => {
        this.setUser(response.user);
      })
    );
  }
}
