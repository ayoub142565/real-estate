import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
  const exists = await User.findOne({ email: req.body.email });
  if (exists) return res.status(409).json({ message: 'Email already in use' });

  const user = await User.create(req.body);
  const token = generateToken({ id: user._id, role: user.role });

  return res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken({ id: user._id, role: user.role });
  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites');
  return res.json(user);
};
