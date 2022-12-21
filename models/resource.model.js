const mongoose = require('mongoose')

const { Schema } = mongoose;

const mongoSchema = new Schema(
  {
    docType: { type: String, unique: true },
    content: [
        { 
            id: String,
            company: String,
            code: String,
            link: String
        }
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Resource', mongoSchema);
