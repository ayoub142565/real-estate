import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const propertySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  type: Joi.string().valid('apartment', 'house', 'villa', 'land').required(),
  status: Joi.string().valid('sale', 'rent').required(),
  bedrooms: Joi.number().min(0).default(0),
  bathrooms: Joi.number().min(0).default(0),
  area: Joi.number().min(1).required(),
  amenities: Joi.array().items(Joi.string()).default([]),
  featured: Joi.boolean().default(false)
});

export const inquirySchema = Joi.object({
  propertyId: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(8).max(2000).required()
});
