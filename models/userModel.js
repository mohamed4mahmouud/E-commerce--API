const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'User must have a name'],
    },
    email: {
      type: String,
      required: [true, 'User must have a email'],
      unique: true,
      lowercase: true,
    },
    photo: {
      type: String,
    },
    phone: String,
    password: {
      type: String,
      required: [true, 'User must have a password'],
      minLength: [8, 'Too short password'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm password'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  //hash password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
