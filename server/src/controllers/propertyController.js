import Property from '../models/Property.js';
import cloudinary from '../config/cloudinary.js';

const parseArrayField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return String(value)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

export const getProperties = async (req, res) => {
  const {
    page = 1,
    limit = 9,
    minPrice,
    maxPrice,
    location,
    type,
    status,
    bedrooms,
    bathrooms,
    keyword,
    sort = 'newest'
  } = req.query;

  const query = {};
  if (minPrice || maxPrice) query.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };
  if (location) query.location = new RegExp(location, 'i');
  if (type) query.type = type;
  if (status) query.status = status;
  if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };
  if (bathrooms) query.bathrooms = { $gte: Number(bathrooms) };
  if (keyword) query.$text = { $search: keyword };

  const sortMap = {
    newest: { createdAt: -1 },
    priceAsc: { price: 1 },
    priceDesc: { price: -1 }
  };

  const [items, total] = await Promise.all([
    Property.find(query)
      .sort(sortMap[sort] || sortMap.newest)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate('agentId', 'name email'),
    Property.countDocuments(query)
  ]);

  return res.json({
    items,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit))
    }
  });
};

export const getFeaturedProperties = async (_req, res) => {
  const properties = await Property.find({ featured: true }).limit(6).sort({ createdAt: -1 });
  return res.json(properties);
};

export const getProperty = async (req, res) => {
  const property = await Property.findById(req.params.id).populate('agentId', 'name email');
  if (!property) return res.status(404).json({ message: 'Property not found' });

  const similar = await Property.find({
    _id: { $ne: property._id },
    location: property.location,
    status: property.status
  })
    .limit(4)
    .sort({ createdAt: -1 });

  return res.json({ property, similar });
};

export const createProperty = async (req, res) => {
  const images = [];
  if (req.files?.length) {
    for (const file of req.files) {
      const base64 = file.buffer.toString('base64');
      const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64}`, {
        folder: 'real-estate/properties'
      });
      images.push(result.secure_url);
    }
  }

  const property = await Property.create({
    ...req.body,
    amenities: parseArrayField(req.body.amenities),
    featured: req.body.featured === 'true' || req.body.featured === true,
    images,
    agentId: req.user._id
  });

  return res.status(201).json(property);
};

export const updateProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: 'Property not found' });

  if (req.files?.length) {
    const images = [];
    for (const file of req.files) {
      const base64 = file.buffer.toString('base64');
      const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64}`, {
        folder: 'real-estate/properties'
      });
      images.push(result.secure_url);
    }
    req.body.images = images;
  }

  const updated = await Property.findByIdAndUpdate(
    req.params.id,
    { ...req.body, amenities: parseArrayField(req.body.amenities) },
    { new: true, runValidators: true }
  );

  return res.json(updated);
};

export const deleteProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: 'Property not found' });

  await property.deleteOne();
  return res.json({ message: 'Property deleted' });
};
