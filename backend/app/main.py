from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import calendar, todolist, inventory, recipe

app = FastAPI(
    title="SiriusRidge2 API",
    description="API for Calendar, Todolist, Inventory, and Recipe Management",
    version="1.0.0"
)

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://frontend:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(calendar.router, prefix="/api/calendar", tags=["Calendar"])
app.include_router(todolist.router, prefix="/api/todolist", tags=["Todolist"])
app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(recipe.router, prefix="/api/recipe", tags=["Recipe"])


@app.get("/")
async def root():
    return {"message": "Welcome to SiriusRidge2 API"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
