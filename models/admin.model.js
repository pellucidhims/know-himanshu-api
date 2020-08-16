const mongoose = require('mongoose')

const { Schema } = mongoose;

const mongoSchema = new Schema(
  {
    userName: { type: String, unique: true },
    password: { type: String},
  },
  { timestamps: true },
);

module.exports = mongoose.model('Admin', mongoSchema);
