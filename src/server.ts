import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import authRoutes from './routes/authRoute';
import itemRoutes from './routes/itemRoute';

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/item', itemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`Server running on port ${PORT}`);
  } else {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});