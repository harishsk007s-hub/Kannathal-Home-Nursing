import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  nameTamil?: string;
  categoryName: string;
  description: string;
  features: string[];
  isClinical: boolean;
  isActive: boolean;
  badge?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    nameTamil: { type: String, trim: true },
    categoryName: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    features: [{ type: String }],
    isClinical: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    badge: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
