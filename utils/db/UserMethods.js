// api/user.js
import User from '../models/User.js';

export const createUser = async ({ name, email, picture, uid }) => {
  const existing = await User.findOne({ email });
  if (!existing) {
    const user = await User.create({ name, email, picture, uid });
    // console.log('User created:', user._id);
    return user;
  }
  return existing;
};

export const getUser = async (email) => {
    const user = await User.findOne({ email });
    return user;
  };
  