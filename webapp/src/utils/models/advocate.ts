import mongoose, { Schema, model, models } from 'mongoose';

const AdvocateSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  specialty: { type: String, required: true },
  language: { type: [String], required: true },
  pricing: { type: Number, required: true },
  videoUrl: { type: String, default: '' },
  isAvailable: { type: Boolean, default: true },
  email: { 
    type: String, 
    required: true, 
    trim: true,
    lowercase: true
  },
  phoneNumber: { 
    type: String, 
    required: true,
    trim: true
  }
}, { timestamps: true }); 


const Advocate = models.Advocate || model('Advocate', AdvocateSchema);
export default Advocate;