import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    type: {
      type: String,
      enum: ['work', 'home'],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);
