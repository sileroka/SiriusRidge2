from fastapi import APIRouter
from typing import List

router = APIRouter()


@router.get("/")
async def get_todos():
    """Get all todo items"""
    return {"todos": []}


@router.get("/{todo_id}")
async def get_todo(todo_id: int):
    """Get a specific todo item"""
    return {"todo_id": todo_id, "message": "Todo details"}


@router.post("/")
async def create_todo():
    """Create a new todo item"""
    return {"message": "Todo item created"}


@router.put("/{todo_id}")
async def update_todo(todo_id: int):
    """Update a todo item"""
    return {"message": f"Todo item {todo_id} updated"}


@router.delete("/{todo_id}")
async def delete_todo(todo_id: int):
    """Delete a todo item"""
    return {"message": f"Todo item {todo_id} deleted"}
