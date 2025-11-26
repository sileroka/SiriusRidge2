import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { 
    path: 'calendar', 
    loadComponent: () => import('./pages/calendar/calendar.component').then(m => m.CalendarComponent) 
  },
  { 
    path: 'todolist', 
    loadComponent: () => import('./pages/todolist/todolist.component').then(m => m.TodolistComponent) 
  },
  { 
    path: 'inventory', 
    loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent) 
  },
  { 
    path: 'recipe', 
    loadComponent: () => import('./pages/recipe/recipe.component').then(m => m.RecipeComponent) 
  },
  { path: '**', redirectTo: '/calendar' }
];
