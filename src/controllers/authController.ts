import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await userModel.getAllUsers();

  if (existingUser.length >= 1) {
    return res.status(403).json({ message: 'Registration is disabled. Only one user allowed.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userModel.getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
};

export const getProfile = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await userModel.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user: { id: user.id, name: user.name, email: user.email } });
}