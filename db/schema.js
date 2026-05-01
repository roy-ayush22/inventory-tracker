const mongoose = require("mongoose");
const { Schema } = mongoose;

// User
const userSchemaDefinition = new Schema({
  username: { type: String, required: true, minlength: 2, maxlength: 30 },
  email: { type: String },
  password: { type: String, required: true, minlength: 6 },
  householdId: { type: Schema.Types.ObjectId, ref: "Household", default: null },
  createdAt: { type: Date, default: Date.now },
});

// Household
const householdSchemaDefinition = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  inviteCode: { type: String, unique: true, uppercase: true, length: 6 },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  wasteScore: { type: Number, min: 0, max: 100, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Item
const itemSchemaDefinition = new Schema({
  householdId: {
    type: Schema.Types.ObjectId,
    ref: "Household",
    required: true,
  },
  addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["produce", "dairy", "meat", "pantry", "frozen", "other"],
  },
  quantity: { type: Number, default: 1 },
  expiryDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["fresh", "expiring-soon", "expired", "used", "wasted"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Models
const userSchema = mongoose.model("User", userSchemaDefinition);
const householdSchema = mongoose.model("Household", householdSchemaDefinition);
const itemSchema = mongoose.model("Item", itemSchemaDefinition);

module.exports = { userSchema, householdSchema, itemSchema };
