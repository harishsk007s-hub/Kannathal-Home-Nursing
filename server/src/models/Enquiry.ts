import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  altPhone?: string;
  serviceRequested: string;
  address?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    altPhone: { type: String, trim: true },
    serviceRequested: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Completed', 'Cancelled'],
      default: 'New',
    },
    adminNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
