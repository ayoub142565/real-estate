import Inquiry from '../models/Inquiry.js';

export const createInquiry = async (req, res) => {
  const payload = {
    ...req.body,
    userId: req.user?._id
  };
  const inquiry = await Inquiry.create(payload);
  return res.status(201).json(inquiry);
};

export const getInquiries = async (_req, res) => {
  const inquiries = await Inquiry.find()
    .populate('propertyId', 'title price')
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });

  return res.json(inquiries);
};
