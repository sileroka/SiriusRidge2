// Calendar interfaces
export interface CalendarEvent {
  id?: number;
  title?: string;
  start?: Date;
  end?: Date;
  description?: string;
}

export interface CalendarEventsResponse {
  events: CalendarEvent[];
}

export interface CalendarEventResponse {
  event_id: number;
  message: string;
}

// Todolist interfaces
export interface Todo {
  id?: number;
  title?: string;
  completed?: boolean;
  description?: string;
}

export interface TodosResponse {
  todos: Todo[];
}

export interface TodoResponse {
  todo_id: number;
  message: string;
}

// Inventory interfaces
export interface InventoryItem {
  id?: number;
  name?: string;
  quantity?: number;
  description?: string;
}

export interface InventoryItemsResponse {
  items: InventoryItem[];
}

export interface InventoryItemResponse {
  item_id: number;
  message: string;
}

// Recipe interfaces
export interface Recipe {
  id?: number;
  name?: string;
  ingredients?: string[];
  instructions?: string;
}

export interface RecipesResponse {
  recipes: Recipe[];
}

export interface RecipeResponse {
  recipe_id: number;
  message: string;
}

// Generic message response
export interface MessageResponse {
  message: string;
}
