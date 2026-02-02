// backend/controllers/event.controller.ts
import Event from "../models/event";

export const createEvent = async (req: any, res: any) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to create event" });
  }
};

export const getEvents = async (req: any, res: any) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};