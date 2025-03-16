// src/models/Release.js
import mongoose from 'mongoose';

const ReleaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide the release title'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: [true, 'Please provide the artist'],
  },
  coverImage: {
    type: String,
    required: [true, 'Please provide cover image'],
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please provide release date'],
  },
  spotifyUrl: String,
  appleMusicUrl: String,
  youtubeUrl: String,
  featured: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['Single', 'EP', 'Album'],
    default: 'Single',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Release || mongoose.model('Release', ReleaseSchema);

