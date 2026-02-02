import express, { Request, Response, Router } from 'express';
import Event from '../models/event';
// Ensure your middleware file is also .ts or has type definitions
import { protect } from '../middleware/auth.middleware';

const router: Router = express.Router();

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @desc    Create new event
 * @route   POST /api/events
 * @access  Private/Admin
 */
router.post('/', protect ,async (req: Request, res: Response): Promise<void> => {
  try {
    const event = new Event(req.body);
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @desc    Delete an event
 * @route   DELETE /api/events/:id
 * @access  Private/Admin
 */
router.delete('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json({ message: 'Event deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;