import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0, index: true },
    location: { type: String, required: true, index: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    type: { type: String, enum: ['apartment', 'house', 'villa', 'land'], required: true, index: true },
    status: { type: String, enum: ['sale', 'rent'], required: true, index: true },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    area: { type: Number, required: true },
    amenities: [{ type: String }],
    images: [{ type: String }],
    featured: { type: Boolean, default: false, index: true },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

propertySchema.index({ title: 'text', description: 'text', location: 'text', address: 'text' });
propertySchema.index({ createdAt: -1 });

export default mongoose.model('Property', propertySchema);
