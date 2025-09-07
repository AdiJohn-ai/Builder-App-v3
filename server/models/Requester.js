import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const requesterSchema = new mongoose.Schema({
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
    default: 'service requester'
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
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  billingInfo: {
    cardNumber: String,
    cardHolder: String,
    expirationDate: String,
    cvv: String,
    billingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  }
}, {
  timestamps: true
});



export default mongoose.model('Requester', requesterSchema);
