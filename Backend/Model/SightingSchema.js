// models/Sighting.js
const mongoose = require('mongoose');

const sightingSchema = new mongoose.Schema({
  locationVisibility: {
    type: String,
    enum: ['visible', 'obscured', 'not_visible'],
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timeOfDay: {
    type: String, // should be stored as "HH:MM"
    required: true,
  },
  creatureGuess: {
    type: String,
    required: true,
  },
  photoURLs: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    // connects us to the user who uploads
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
});

module.exports = mongoose.model('Sighting', sightingSchema);
