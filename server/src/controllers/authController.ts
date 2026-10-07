import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import { AuthRequest } from '../middleware/auth.js';

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Please provide email and password' });
      return;
    }

    const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'sri_kannathal_homecare_secret_key_2026_jwt_token_secure_98765';
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role, name: admin.name },
      secret,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }
    const admin = await AdminUser.findById(req.user.id).select('-passwordHash');
    if (!admin) {
      res.status(404).json({ success: false, message: 'Admin user not found' });
      return;
    }
    res.status(200).json({ success: true, user: admin });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res.status(400).json({ success: false, message: 'Current password and new password are required' });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ success: false, message: 'New password must be at least 6 characters long' });
      return;
    }

    const admin = await AdminUser.findById(req.user.id);
    if (!admin) {
      res.status(404).json({ success: false, message: 'Admin not found' });
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      res.status(400).json({ success: false, message: 'Incorrect current password' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    admin.passwordHash = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
