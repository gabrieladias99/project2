const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['Music Lover', 'Artist', 'Hosting Venue'],
    default: 'Music Lover',
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
