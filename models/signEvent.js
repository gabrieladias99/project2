const mongoose = require('mongoose');

const { Schema } = mongoose;

const signEventSchema = new Schema({
  participant: { type: Schema.Types.ObjectId, ref:'User'},
  artist: { type: Schema.Types.ObjectId, ref:'User'},
  event: { type: Schema.Types.ObjectId, ref:'Event'},
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const SignEvent = mongoose.model('signevent', signEventSchema);

module.exports = SignEvent;