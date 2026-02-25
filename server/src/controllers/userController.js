import User from '../models/User.js';

export const toggleFavorite = async (req, res) => {
  const user = await User.findById(req.user._id);
  const propertyId = req.params.propertyId;

  const exists = user.favorites.some((id) => String(id) === propertyId);
  user.favorites = exists
    ? user.favorites.filter((id) => String(id) !== propertyId)
    : [...user.favorites, propertyId];

  await user.save();
  await user.populate('favorites');
  return res.json(user.favorites);
};

export const getFavorites = async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites');
  return res.json(user.favorites);
};

export const adminGetUsers = async (_req, res) => {
  const users = await User.find().select('-password');
  return res.json(users);
};
