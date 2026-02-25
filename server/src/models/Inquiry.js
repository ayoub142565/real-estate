import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, minlength: 8, maxlength: 2000 }
  },
  { timestamps: true }
);

inquirySchema.index({ propertyId: 1, createdAt: -1 });

export default mongoose.model('Inquiry', inquirySchema);
