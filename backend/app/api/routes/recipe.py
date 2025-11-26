from fastapi import APIRouter
from typing import List

router = APIRouter()


@router.get("/")
async def get_recipes():
    """Get all recipes"""
    return {"recipes": []}


@router.get("/{recipe_id}")
async def get_recipe(recipe_id: int):
    """Get a specific recipe"""
    return {"recipe_id": recipe_id, "message": "Recipe details"}


@router.post("/")
async def create_recipe():
    """Create a new recipe"""
    return {"message": "Recipe created"}


@router.put("/{recipe_id}")
async def update_recipe(recipe_id: int):
    """Update a recipe"""
    return {"message": f"Recipe {recipe_id} updated"}


@router.delete("/{recipe_id}")
async def delete_recipe(recipe_id: int):
    """Delete a recipe"""
    return {"message": f"Recipe {recipe_id} deleted"}
