import mongoose from 'mongoose';

/*
  * AppleWatch model for working with MongoDB.
  * Defines the AppleWatch data structure using Data stored in the 'AppleWatch' collection.
*/

const AppleWatchSchema = new mongoose.Schema(
{
  _id: mongoose.Schema.Types.ObjectId,
  category: String,
  brand: String,
  model: String,
  price: Number,
  color: [String],
  memory: String,
  displaySize: String,
  description: String,
  os: String,
  processor: String,
  battery: String,
  RAM: String,
  CPU: String,
  GPU: String,
  images: [String],
  incarousel: Boolean
}, { collection:  'Watch' })

const AppleWatchModel = mongoose.model('applewatchs', AppleWatchSchema);

export {AppleWatchModel};