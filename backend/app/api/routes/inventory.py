from fastapi import APIRouter
from typing import List

router = APIRouter()


@router.get("/")
async def get_inventory_items():
    """Get all inventory items"""
    return {"items": []}


@router.get("/{item_id}")
async def get_inventory_item(item_id: int):
    """Get a specific inventory item"""
    return {"item_id": item_id, "message": "Inventory item details"}


@router.post("/")
async def create_inventory_item():
    """Create a new inventory item"""
    return {"message": "Inventory item created"}


@router.put("/{item_id}")
async def update_inventory_item(item_id: int):
    """Update an inventory item"""
    return {"message": f"Inventory item {item_id} updated"}


@router.delete("/{item_id}")
async def delete_inventory_item(item_id: int):
    """Delete an inventory item"""
    return {"message": f"Inventory item {item_id} deleted"}
