import e, { Request, Response } from 'express';
import * as itemModel from '../models/itemModel';
import fs from "fs/promises";
import path from "path";

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await itemModel.getAllItems();
    res.json(items);
  } catch (error: any) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: error.message || 'Error fetching items' });
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
    const { link, description, sku, case_pack, min_order } = req.body;

    let imageUrl: string | undefined;

    const item = await itemModel.createItem({ 
      link, 
      description,
      sku,
      case_pack,
      min_order 
    });

    if (req.file) {
      const filename = Date.now() + path.extname(req.file.originalname);
      const filepath = path.join("public/uploads", filename);

      await fs.writeFile(filepath, req.file.buffer); // save from memory
      imageUrl = `/uploads/${filename}`;

      await itemModel.updateItem(item.id, { image: imageUrl });
    }

    res.status(201).json({ message: 'Item created successfully', item });
  } catch (error: any) {
    console.error('CREATE ITEM ERROR:', error);

    // Handle Prisma known errors
    if (error.code === 'P2002') {
      return res.status(409).json({ 
        error: 'SKU already exists', 
        field: error.meta?.target 
      });
    }
    
    res.status(500).json({ error: 'Error creating item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    if( !id ) {
      return res.status(400).json({ message: 'Item ID is required' });
    } 

    try {
      await itemModel.deleteItem(Number(id));
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting item' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Error processing request' });
  }
}