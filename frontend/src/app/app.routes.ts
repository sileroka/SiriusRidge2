import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { familyGuard } from './core/guards/family.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'setup-family',
    loadComponent: () => import('./pages/setup-family/setup-family.component').then(m => m.SetupFamilyComponent),
    canActivate: [authGuard]
  },
  {
    path: 'calendar',
    loadComponent: () => import('./features/calendar/calendar-page/calendar-page.component').then(m => m.CalendarPageComponent),
    canActivate: [authGuard, familyGuard]
  },
  {
    path: 'todos',
    loadComponent: () => import('./features/todos/todos-page/todos-page.component').then(m => m.TodosPageComponent),
    canActivate: [authGuard, familyGuard]
  },
  {
    path: 'recipes',
    loadComponent: () => import('./features/recipes/recipes-page/recipes-page.component').then(m => m.RecipesPageComponent),
    canActivate: [authGuard, familyGuard]
  },
  {
    path: 'inventory',
    loadComponent: () => import('./features/inventory/inventory-page/inventory-page.component').then(m => m.InventoryPageComponent),
    canActivate: [authGuard, familyGuard]
  },
  { path: '**', redirectTo: '/calendar' }
];
