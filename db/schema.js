const mongoose = require("mongoose");
const { Schema } = mongoose;

// User
const userSchema = new Schema({
  _id: ObjectId,
  name: String, // required, 2-30 chars
  email: String, // required, unique
  password: String, // hashed, min 6 chars
  householdId: ObjectId, // nullable
  createdAt: Date,
});

// Household
const householdSchema = new Schema({
  _id: ObjectId,
  name: String, // required, 3-30 chars
  inviteCode: String, // unique, 6 chars uppercase
  members: [ObjectId], // user references
  wasteScore: Number, // 0-100, default 0
  createdAt: Date,
});

// Item
const itemSchema = new Schema({
  _id: ObjectId,
  householdId: ObjectId, // required
  addedBy: ObjectId, // user reference
  name: String, // required
  category: String, // enum: produce, dairy, meat, pantry, frozen, other
  quantity: Number, // default 1
  expiryDate: Date, // required
  status: String, // enum: fresh, expiring-soon, expired, used, wasted
  createdAt: Date,
  updatedAt: Date,
});

module.exports = { userSchema, householdSchema, itemSchema };
