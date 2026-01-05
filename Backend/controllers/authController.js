const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  // Destructure the NEW fields from req.body
  const { 
    name, email, password, 
    age, gender, academicYear, // Added
    bio, interests, hobbies, lookingFor 
  } = req.body;

  try {
    // 1. Basic validation for Enums (Safety check)
    const validGenders = ['Male', 'Female', 'Non-binary', 'Other'];
    const validYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters', 'PhD'];

    if (!validGenders.includes(gender)) {
      return res.status(400).json({ msg: "Please select a valid gender" });
    }
    if (!validYears.includes(academicYear)) {
      return res.status(400).json({ msg: "Please select a valid academic year" });
    }

    // 2. Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user with campus fields
    user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      age, 
      gender, 
      academicYear, 
      bio, 
      interests, 
      hobbies, 
      lookingFor 
    });

    await user.save();

    // 5. Generate Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token and user (excluding password)
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ token, user: userResponse });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error during signup");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ token, user: userResponse });
  } catch (err) {
    res.status(500).send("Server Error during login");
  }
};