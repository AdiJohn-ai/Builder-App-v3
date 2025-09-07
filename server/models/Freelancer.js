import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const freelancerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    default: 'freelancer'
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  skills: [String],
  hourRate: {
    type: Number,
    default: 0
  },
  certification: [{
    name: String,
    issuer: String,
    issueDate: Date,
    expiryDate: Date
  }]
}, {
  timestamps: true
});



export default mongoose.model('Freelancer', freelancerSchema);
