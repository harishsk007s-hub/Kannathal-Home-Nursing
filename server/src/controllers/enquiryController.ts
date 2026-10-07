import { Request, Response } from 'express';
import Enquiry from '../models/Enquiry.js';

export const createEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, altPhone, serviceRequested, address, message } = req.body;

    if (!name || !phone || !serviceRequested) {
      res.status(400).json({ success: false, message: 'Name, phone number, and requested service are required' });
      return;
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      altPhone,
      serviceRequested,
      address,
      message,
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully. Our team will contact you shortly.',
      data: enquiry,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllEnquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search } = req.query;
    let query: any = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      query.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { serviceRequested: searchRegex },
        { address: searchRegex },
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const enquiry = await Enquiry.findByIdAndUpdate(id, updateData, { new: true });

    if (!enquiry) {
      res.status(404).json({ success: false, message: 'Enquiry not found' });
      return;
    }

    res.status(200).json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      res.status(404).json({ success: false, message: 'Enquiry not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
