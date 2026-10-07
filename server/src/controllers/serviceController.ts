import { Request, Response } from 'express';
import ServiceCategory from '../models/ServiceCategory.js';
import Service from '../models/Service.js';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await ServiceCategory.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, activeOnly } = req.query;
    let query: any = {};

    if (category) {
      query.categoryName = category;
    }

    if (activeOnly === 'true') {
      query.isActive = true;
    }

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      query.$or = [
        { name: searchRegex },
        { nameTamil: searchRegex },
        { description: searchRegex },
        { categoryName: searchRegex },
      ];
    }

    const services = await Service.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, nameTamil, categoryName, description, features, isClinical, badge, order } = req.body;

    if (!name || !categoryName || !description) {
      res.status(400).json({ success: false, message: 'Name, categoryName, and description are required' });
      return;
    }

    const service = await Service.create({
      name,
      nameTamil,
      categoryName,
      description,
      features: features || [],
      isClinical: !!isClinical,
      badge,
      order: order || 0,
      isActive: true,
    });

    res.status(201).json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    res.status(200).json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, nameTamil, description, icon, order } = req.body;
    if (!name) {
      res.status(400).json({ success: false, message: 'Category name is required' });
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const category = await ServiceCategory.create({
      name,
      nameTamil,
      slug,
      description,
      icon: icon || 'HeartPulse',
      order: order || 0,
    });

    res.status(201).json({ success: true, data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
