const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: Date,
  from: Number,
  to: Number,
  styles: Array,
  location: { type: { type: String }, coordinates: [Number] },
  address: String,
  owner: { type: Schema.Types.ObjectId, ref:'User'}
}, {
    timestamps: true
  });

eventSchema.index({ location: '2dsphere' });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;