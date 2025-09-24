import express from 'express';
import * as Item from '../controllers/itemController';
import { upload } from '../middleware/upload';

const router = express.Router();

router.post('/', upload.single('image'), Item.createItem);

router.get('/', Item.getAllItems);
router.get('/id', Item.getItemById);
router.delete('/delete', Item.deleteItem);

export default router;