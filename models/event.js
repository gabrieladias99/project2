const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: Date,
  time: { from: Number, to: Number},
  styles: String,
  location: { type: { type: String }, coordinates: [Number] }
}, {
    timestamps: true
  });

eventSchema.index({ location: '2dsphere' });

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
