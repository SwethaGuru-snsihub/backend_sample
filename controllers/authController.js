const User = require('../models/users');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { sendMail } = require('../utils/sendMail');
const institution = require('../models/institution');
const fs = require('fs');
const csv = require('csv-parser');
const bcrypt = require('bcryptjs');
const { registerSchema, setNewPasswordSchema } = require('../validators/authValidators');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role, institutionId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.error('Email already exists', 400);
    }

    const newUser = await User.create({
      name,
      email,
      password,
      phoneNumber,
      role,
      institutionId,
    });

    return res.success(newUser, 'User registered successfully', 201);
  } catch (error) {
    logger.error(`${error.message} in register controller`);
    return res.error('Server error', 500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select('password name email phoneNumber role institutionId')
      .populate('institutionId');
    if (!user) {
      return res.error('Invalid email or password', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.error('Invalid email or password', 401);
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Remove password from output
    const userData = user.toObject();
    delete userData.password;

    return res.success({ ...userData, token }, 'Login successful', 200);
  } catch (error) {
    logger.error(`${error.message} in login controller`);
    return res.error('Server error', 500);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const emailInput = req.body.email;
    const user = await User.findOne({ email: emailInput });

    if (!user) {
      return res.error('User does not exist', 400);
    }

    // Generate a JWT token that expires in 15 minutes
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    console.log(`Token: ${token}`);

    // Send mail with token
    await sendMail(user.email, user.name, token);

    return res.successWithoutData('Email sent successfully', 200);
  } catch (error) {
    logger.error(`${error.message} in Forgot Password controller`);
    return res.error('Failed to send email', 500);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.error('User does not exist', 400);
    }

    const isMatchOldPassword = await user.comparePassword(oldPassword);
    if (!isMatchOldPassword) {
      return res.error('Your old password is incorrect', 400);
    }

    if (newPassword !== confirmPassword) {
      return res.error('Password and confirm Password do not match', 400);
    }

    user.password = newPassword;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    return res.success(userObj, 'Password reset successfully', 200);
  } catch (error) {
    logger.error(`${error.message} in Reset Password controller`);
    return res.error('Server error', 500);
  }
};

const setNewPassword = async (req, res) => {
  console.log('params:', req.params);
  try {
    const { token } = req.params; //  Get token from URL
    console.log({ token });

    const { newPassword, confirmPassword } = req.body;

    // 1. Validate input with Joi schema
    const { error } = setNewPasswordSchema.validate({ newPassword, confirmPassword });
    if (error) {
      return res.error(error.details[0].message, 400);
    }

    // 2. Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.error('Passwords do not match', 400);
    }

    // 3. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.error('Invalid or expired token', 401);
    }

    // 4. Find user
    const user = await User.findById(decoded.id).select('+password');
    if (!user) {
      return res.error('User not found', 404);
    }

    // 5. Set and save new password (assuming pre-save hook hashes it)
    user.password = newPassword;
    await user.save();

    // 6. Send confirmation email
    try {
      await sendMail(user.email, user.name, '', 'reset-confirmation');
    } catch (emailErr) {
      logger.error(`Password reset email not sent to ${user.email}: ${emailErr.message}`);
      // Do not block success response due to email failure
    }

    return res.successWithoutData('Password has been reset successfully', 200);
  } catch (error) {
    logger.error(`${error.message} in setNewPassword controller`);
    return res.error('Server error', 500);
  }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword, setNewPassword };
