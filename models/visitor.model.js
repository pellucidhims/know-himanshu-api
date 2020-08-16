const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema(
  {
    email: { type: String, unique: true },
    name: { type: String},
    messages: [
        {
            subject: String,
            message: String,
            read: {
                type: Boolean,
                default: false,
            },
            postedAt: {
                type: Date,
                default: Date.now()            
            }
        }
    ]
  },
  { timestamps: true },
);

module.exports = mongoose.model('Visitor', mongoSchema);
