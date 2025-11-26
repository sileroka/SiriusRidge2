from fastapi import APIRouter
from typing import List

router = APIRouter()


@router.get("/")
async def get_calendar_events():
    """Get all calendar events"""
    return {"events": []}


@router.get("/{event_id}")
async def get_calendar_event(event_id: int):
    """Get a specific calendar event"""
    return {"event_id": event_id, "message": "Event details"}


@router.post("/")
async def create_calendar_event():
    """Create a new calendar event"""
    return {"message": "Calendar event created"}


@router.put("/{event_id}")
async def update_calendar_event(event_id: int):
    """Update a calendar event"""
    return {"message": f"Calendar event {event_id} updated"}


@router.delete("/{event_id}")
async def delete_calendar_event(event_id: int):
    """Delete a calendar event"""
    return {"message": f"Calendar event {event_id} deleted"}
