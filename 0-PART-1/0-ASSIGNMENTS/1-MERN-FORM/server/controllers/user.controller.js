import User from '../model/User.js';

export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      country,
      password,
    } = req.body;
    // check if the user already existts
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User created successfully' });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      age: parseInt(age),
      gender,
      country,
      password,
    });
    await user.save();
  } catch (error) {
    next(error);
  }
};
