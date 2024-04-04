import mongoose from 'mongoose';

/*
  * AirPods model for working with MongoDB.
  * Defines the AirPods data structure using Data stored in the 'AirPods' collection.
*/

const AirPodsSchema = new mongoose.Schema(
{
  _id: mongoose.Schema.Types.ObjectId,
  category: String,
  brand: String,
  model: String,
  price: Number,
  color: String,
  description: String,
  processor: String,
  battery: String,
  images: [String]
}, { collection:  'AirPods' })

const AirPodsModel = mongoose.model('airpods', AirPodsSchema);

export {AirPodsModel};