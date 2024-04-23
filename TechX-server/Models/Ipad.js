import mongoose from 'mongoose';

/*
  * Ipad model for working with MongoDB.
  * Defines the ipad data structure using Data stored in the 'Ipad' collection.
*/

const IpadSchema = new mongoose.Schema(
{
  _id: mongoose.Schema.Types.ObjectId,
  category: String,
  brand: String,
  model: String,
  price: Number,
  color: [String],
  memory: [String],
  displaySize: String,
  description: String,
  os: String,
  camera: String,
  processor: String,
  battery: String,
  RAM: String,
  CPU: String,
  GPU: String,
  images: [String],
  incarousel: Boolean
}, { collection:  'Ipad' })

const IpadModel = mongoose.model('ipad', IpadSchema);

export {IpadModel};