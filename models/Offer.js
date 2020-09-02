const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  category: {
    type: String,
    required: true,
    default: 'general'
  },
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    minlength: 25
  },
  timeCommitment: {
    type: Number,
  },
  deadline: {
    type: Date,
  },
  timeOfDay: {
    type: String,
  },
  posterId: {
    type: String,
    required: true
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  volunteers: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

module.exports = Offer = mongoose.model('Offer', OfferSchema);