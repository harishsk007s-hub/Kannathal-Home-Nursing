import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceCategory extends Document {
  name: string;
  nameTamil?: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceCategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    nameTamil: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    icon: { type: String, default: 'HeartPulse' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IServiceCategory>('ServiceCategory', ServiceCategorySchema);
