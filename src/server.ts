import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoute';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
