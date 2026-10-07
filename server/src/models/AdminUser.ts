import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'superadmin' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
  },
  { timestamps: true }
);

export default mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
