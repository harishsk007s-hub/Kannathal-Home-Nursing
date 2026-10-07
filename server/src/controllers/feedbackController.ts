import { Request, Response } from 'express';
import Feedback from '../models/Feedback.js';

export const getApprovedFeedbacks = async (req: Request, res: Response): Promise<void> => {
  try {
    const feedbacks = await Feedback.find({ isApproved: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: feedbacks.length, data: feedbacks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllFeedbacks = async (req: Request, res: Response): Promise<void> => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: feedbacks.length, data: feedbacks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientName, serviceReceived, rating, reviewText, location } = req.body;

    if (!patientName || !serviceReceived || !rating || !reviewText) {
      res.status(400).json({
        success: false,
        message: 'Name, service received, rating, and review text are required',
      });
      return;
    }

    const feedback = await Feedback.create({
      patientName,
      serviceReceived,
      rating: Number(rating),
      reviewText,
      location: location || 'Alanganallur, Madurai',
      isApproved: false, // Default pending approval for admin review
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! It will be displayed after admin review.',
      data: feedback,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleApproveFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      res.status(404).json({ success: false, message: 'Feedback not found' });
      return;
    }

    feedback.isApproved = !feedback.isApproved;
    await feedback.save();

    res.status(200).json({
      success: true,
      message: `Feedback ${feedback.isApproved ? 'approved' : 'unapproved'} successfully`,
      data: feedback,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      res.status(404).json({ success: false, message: 'Feedback not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
