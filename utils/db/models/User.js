// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  picture: String,
  uid: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
//what if I change something here what willhappen and how is ig gan dsfj and I realyy 