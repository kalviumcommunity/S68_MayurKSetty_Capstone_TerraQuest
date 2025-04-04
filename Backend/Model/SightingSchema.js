const mongoose = require('mongoose');

const SightingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['FeatureCollection'],
    required: true,
    default: 'FeatureCollection',
  },
  features: [
    {
      type: {
        type: String,
        enum: ['Feature'],
        required: true,
        default: 'Feature',
      },
      properties: {
        type: Object,
        default: {},
      },
      geometry: {
        type: {
          type: String,
          enum: ['Point', 'LineString'], // Supports Point and LineString
          required: true,
        },
        coordinates: {
          type: Array, // Accepts both `[longitude, latitude]` for Points and arrays of such pairs for LineString
          required: true,
        },
      },
    },
  ],
});

SightingSchema.index({ 'features.geometry': '2dsphere' }); // Enables geospatial queries

const Sighting = mongoose.model('Sighting', SightingSchema);
module.exports = Sighting;

//examples:

// const newSighting = new Sighting({
//     type: "FeatureCollection",
//     features: [
//         {
//             type: "Feature",
//             properties: { species: "Eagle", observer: "JohnDoe" },
//             geometry: {
//                 type: "Point",
//                 coordinates: [12.625434130656402, 30.01759469365284], // [longitude, latitude]
//             },
//         },
//         {
//             type: "Feature",
//             properties: { species: "Tiger", observer: "JaneDoe" },
//             geometry: {
//                 type: "Point",
//                 coordinates: [77.52621968354322, 12.961215866685322],
//             },
//         },
//         {
//             type: "Feature",
//             properties: { trail: "Animal Path" },
//             geometry: {
//                 type: "LineString",
//                 coordinates: [
//                     [77.53120181639486, 12.965449978278698],
//                     [77.53879787695638, 12.951634414882022],
//                 ],
//             },
//         },
//     ],
// });

// newSighting
//     .save()
//     .then(() => console.log("FeatureCollection saved successfully"))
//     .catch((err) => console.error("Error saving:", err));
