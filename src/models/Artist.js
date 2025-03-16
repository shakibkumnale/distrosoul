// src/models/Artist.js
import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the artist name'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  bio: {
    type: String,
    required: [true, 'Please provide artist bio'],
  },
  image: {
    type: String,
    required: [true, 'Please provide artist image'],
  },
  spotifyUrl: String,
  youtubeUrl: String,
  instagramUrl: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Artist || mongoose.model('Artist', ArtistSchema);

