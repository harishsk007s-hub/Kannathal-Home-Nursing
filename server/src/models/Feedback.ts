import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  patientName: string;
  serviceReceived: string;
  rating: number;
  reviewText: string;
  location?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema: Schema = new Schema(
  {
    patientName: { type: String, required: true, trim: true },
    serviceReceived: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: 'Alanganallur, Madurai' },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);
