import { Schema, model } from 'mongoose'

import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    givenName: {
      type: String,

    },
    familyName: {
      type: String,
      required: true,
    },
    password: {
      type: String
    },
    avatar: {
      type: String,
    },
    dateOfBirth: Date,
    phone: String,

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    }

  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  try {
    if (!this.password) return next();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error)
  }

})

UserSchema.methods.isCheckPassword = async function (passWord) {
  try {
    if (!this.password) return next();
    return await bcrypt.compare(passWord, this.password)

  } catch (error) {

  }
}

const User = model('User', UserSchema)

export default User