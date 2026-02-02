import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the Interface
export interface IEvent extends Document {
  title: string;
  description: string;
  type: string;
  date: Date;
}

// 2. Define the Schema
const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, default: 'Giveaway' },
  date: { type: Date, default: Date.now }
});

// 3. Export the Model
export default mongoose.model<IEvent>('Event', EventSchema);