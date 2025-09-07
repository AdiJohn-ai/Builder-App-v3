import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const enterpriseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, required: true, default: 'Building Enterprise' },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, required: true, trim: true },
  serviceType: [String],
  location: {
    address: String,
    city: { type: String, default: 'Yaounde' },
    state: { type: String, default: 'Centre' },
    zipCode: String,
    country: { type: String, default: 'Cameroon' },
    coordinates: { latitude: Number, longitude: Number }
  }
}, { timestamps: true });




export default mongoose.model('Enterprise', enterpriseSchema);
