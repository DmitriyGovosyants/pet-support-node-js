const mongoose = require('mongoose');
const { Schema } = mongoose;
// const mongoosePaginate = require("mongoose-paginate-v2");

const informationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for information!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required!'],
  },
  birthday: {
    type: String,
  },
  city: {
    type: String,
  },
});

// contactSchema.plugin(mongoosePaginate);
const Information = mongoose.model('contact', informationSchema);

module.exports = Information;
