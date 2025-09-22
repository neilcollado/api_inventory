import { Request, Response } from 'express';
import * as itemModel from '../models/itemModel';

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await itemModel.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items'});
  }
};

export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const item = await itemModel.getItemById(Number(id));
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
  
    res.status(500).json({ error: 'Error fetching item' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { link,description, sku, case_pack, min_order } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    // res.json(req.body);

    const item = await itemModel.createItem({ 
      link, 
      image: imageUrl, 
      description,
      sku,
      case_pack,
      min_order });
    res.status(201).json({ message: 'Item created successfully', item });
  } catch (error: any) {
    console.error('CREATE ITEM ERROR:', error);

    // Handle Prisma known errors
    if (error.code === 'P2002') {
      // Unique constraint violation (e.g., duplicate SKU)
      return res.status(409).json({ 
        error: 'SKU already exists', 
        field: error.meta?.target 
      });
    }
    
    res.status(500).json({ error: 'Error creating item' });
  }
};